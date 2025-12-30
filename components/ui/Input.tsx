import type { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Input({ label, className = '', ...props }: InputProps) {
  return (
    <label className="flex w-full flex-col gap-2 text-sm text-[var(--muted)]">
      {label ? (
        <span className="text-xs uppercase tracking-wide text-[var(--muted-2)]">{label}</span>
      ) : null}
      <input
        className={`w-full rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-base text-[var(--foreground)] placeholder:text-[var(--muted-2)] outline-none transition-all focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)] ${className}`}
        {...props}
      />
    </label>
  );
}
