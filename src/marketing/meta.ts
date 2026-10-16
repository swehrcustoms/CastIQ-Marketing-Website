import { useEffect } from 'react';
import { PUBLIC_ORIGIN } from './journey';

export function usePageMeta(title: string, description: string, path: string): void {
  useEffect(() => {
    document.title = `${title} · CastIQ`;
    upsertMeta('description', description);
    upsertMeta('og:title', `${title} · CastIQ`, 'property');
    upsertMeta('og:description', description, 'property');
    upsertMeta('og:type', 'website', 'property');
    upsertMeta('og:url', `${PUBLIC_ORIGIN}${path}`, 'property');
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${PUBLIC_ORIGIN}${path}`;
  }, [title, description, path]);
}

function upsertMeta(name: string, content: string, attr: 'name' | 'property' = 'name'): void {
  let tag = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.content = content;
}
