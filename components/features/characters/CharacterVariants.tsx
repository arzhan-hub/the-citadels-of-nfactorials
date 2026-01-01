'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { CharacterCard, type CharacterSummary } from './CharacterCard';

interface CharacterVariantsProps {
  characterId: number;
  characterName: string;
}

export function CharacterVariants({ characterId, characterName }: CharacterVariantsProps) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [variants, setVariants] = useState<CharacterSummary[]>([]);
  const [eligible, setEligible] = useState(false);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchKey = useMemo(() => {
    const token = characterName.trim().split(' ')[0] ?? '';
    const clean = token.replace(/[^\p{L}\p{N}-]+/gu, '');
    return clean.length >= 3 ? clean : null;
  }, [characterName]);

  useEffect(() => {
    let active = true;

    const prefetchVariants = async () => {
      if (!searchKey) {
        if (active) setChecked(true);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/characters?name=${encodeURIComponent(searchKey)}`);
        if (!res.ok) {
          throw new Error('Failed to load variants');
        }
        const data = await res.json();
        const results = Array.isArray(data?.results) ? data.results : [];
        const filtered = results.filter((item: CharacterSummary) => item.id !== characterId);
        if (active) {
          setVariants(filtered);
          setEligible(results.length >= 3);
        }
      } catch (err) {
        if (active) {
          setEligible(false);
          setError(t('errors.something'));
        }
      } finally {
        if (active) {
          setLoading(false);
          setChecked(true);
        }
      }
    };

    prefetchVariants();

    return () => {
      active = false;
    };
  }, [characterId, searchKey, t]);

  const handleToggle = async () => {
    if (open) {
      setOpen(false);
      return;
    }

    setOpen(true);
  };

  if (!searchKey || !checked || !eligible) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted-2)]">
            {t('variants.label')}
          </p>
          <h2 className="text-2xl font-bold text-[var(--foreground)]">{t('variants.title')}</h2>
          <p className="text-sm text-[var(--muted)]">
            {t('variants.subtitle', { name: searchKey })}
          </p>
        </div>
        <Button onClick={handleToggle}>{open ? t('variants.hide') : t('variants.show')}</Button>
      </div>

      {open && (
        <div className="mt-6">
          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-72 w-full rounded-2xl" />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-dashed border-[var(--border)] py-12 text-center text-[var(--muted)]">
              {error}
            </div>
          ) : variants.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[var(--border)] py-12 text-center text-[var(--muted)]">
              {t('variants.empty')}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {variants.map((variant) => (
                <CharacterCard key={variant.id} character={variant} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
