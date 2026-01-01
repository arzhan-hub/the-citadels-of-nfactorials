'use client';

import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';

type PortalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

const NAV_DELAY_MS = 0;

export function PortalLink({ href, onClick, ...props }: PortalLinkProps) {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      props.target === '_blank'
    ) {
      return;
    }

    event.preventDefault();

    if (typeof window === 'undefined') {
      router.push(href);
      return;
    }

    if (window.localStorage.getItem('portalCursor') === 'off') {
      router.push(href);
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      router.push(href);
      return;
    }

    window.setTimeout(() => {
      router.push(href);
    }, NAV_DELAY_MS);
  };

  return <a href={href} onClick={handleClick} {...props} />;
}
