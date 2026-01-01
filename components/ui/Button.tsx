import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'pill';
};

export function Button({
  className = '',
  variant = 'primary',
  type = 'button',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50';
  const styles =
    variant === 'ghost'
      ? 'bg-transparent text-[var(--foreground)] hover:bg-[var(--surface-2)]'
      : variant === 'pill'
      ? 'border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)]'
      : 'bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90';

  return <button type={type} className={`${base} ${styles} ${className}`} {...props} />;
}
