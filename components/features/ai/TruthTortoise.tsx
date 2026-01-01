'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/lib/i18n/I18nProvider';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

type TruthTortoiseProps = {
  context?: string;
};

function TurtleIcon({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] shadow-lg ring-2 ring-[var(--accent)]/40 transition-transform ${
        active ? 'rotate-6 scale-110' : 'scale-100'
      }`}
      aria-hidden="true"
    >
      <img src="/truth-tortoise.png" alt="" className="h-10 w-10 rounded-full object-cover" />
    </span>
  );
}

export function TruthTortoise({ context }: TruthTortoiseProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { t } = useI18n();

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const nextMessages: Message[] = [
      ...messages,
      { id: String(Date.now()), role: 'user', content: trimmed },
    ];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    const prompt = context
      ? `Context: ${context}\nUser question: ${trimmed}`
      : trimmed;

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (!res.ok) {
        const details = typeof data.details === 'string' ? data.details : '';
        setMessages((prev) => [
          ...prev,
          {
            id: String(Date.now() + 1),
            role: 'assistant',
            content: details ? `Error: ${details}` : t('errors.failed'),
          },
        ]);
        return;
      }
      const reply =
        typeof data.text === 'string' && data.text.trim().length > 0
          ? data.text.trim()
          : t('errors.noResponse');
      setMessages((prev) => [
        ...prev,
        { id: String(Date.now() + 1), role: 'assistant', content: reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { id: String(Date.now() + 1), role: 'assistant', content: t('errors.something') },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div
        className={`flex flex-col items-end gap-3 transition-all ${
          open ? 'opacity-100' : 'opacity-95'
        }`}
      >
        {open ? (
          <div className="w-[320px] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
              <div className="flex items-center gap-2">
                <TurtleIcon active={true} />
                <div>
              <p className="text-sm font-semibold text-[var(--foreground)]">{t('widget.title')}</p>
              <p className="text-xs text-[var(--muted)]">{t('widget.subtitle')}</p>
                </div>
              </div>
              <button
                className="text-xs font-semibold text-[var(--muted)] hover:text-[var(--foreground)]"
                onClick={() => setOpen(false)}
              >
                {t('widget.close')}
              </button>
            </div>
            <div className="max-h-64 space-y-3 overflow-y-auto px-4 py-3 text-sm">
              {messages.length === 0 ? (
                <p className="text-[var(--muted)]">{t('widget.first')}</p>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`rounded-xl px-3 py-2 ${
                      message.role === 'user'
                        ? 'bg-[var(--surface-2)] text-[var(--foreground)]'
                        : 'bg-[var(--accent)]/10 text-[var(--foreground)]'
                    }`}
                  >
                    {message.content}
                  </div>
                ))
              )}
              {loading ? (
                <div className="rounded-xl bg-[var(--surface-2)] px-3 py-2 text-[var(--muted)]">
                  {t('truth.thinking')}
                </div>
              ) : null}
              <div ref={bottomRef} />
            </div>
            <div className="border-t border-[var(--border)] px-4 py-3">
              <textarea
                ref={inputRef}
                rows={2}
                placeholder={t('widget.placeholder')}
                className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-2)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <div className="mt-3 flex justify-end">
                <Button onClick={sendMessage} disabled={loading}>
                  {loading ? t('widget.asking') : t('widget.ask')}
                </Button>
              </div>
            </div>
          </div>
        ) : null}

        <button
          className="flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 shadow-lg transition-transform hover:-translate-y-1"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
        >
          <TurtleIcon active={open} />
          <span className="text-sm font-semibold text-[var(--foreground)]">{t('widget.open')}</span>
        </button>
      </div>
    </div>
  );
}
