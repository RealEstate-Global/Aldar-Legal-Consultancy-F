import { useEffect } from 'react';

const SELECTOR = '.service-grid > *, .contact-panel, .contact-row, .about-photo, .about-values > *, .approach-section .site-container > *, .footer-grid > *, .trust-band, .empty-state, .breadcrumb, .section-copy, .inquiry-form .field, .section-heading, .service-card, .trust-item, .about-grid > *, .approach-grid > *, .faq-list > *, .page-intro .site-container, .form-layout > *, .cta-band .site-container';

/** Fades sections in as they scroll into view. Re-scans after each navigation. */
export function useScrollReveal(key: string) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).filter(el => !el.classList.contains('is-revealed'));
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach((el, i) => {
      el.classList.add('will-reveal');
      el.style.setProperty('--reveal-delay', `${(i % 4) * 45}ms`);
      io.observe(el);
    });
    const header = document.querySelector('.site-header');
    const bar = document.querySelector<HTMLElement>('.scroll-progress');
    const onScroll = () => {
      const y = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
      header?.classList.toggle('is-scrolled', y > 24);
      bar?.style.setProperty('--progress', String(max > 0 ? y / max : 0));
      document.documentElement.style.setProperty('--parallax', `${Math.min(y, 800) * 0.25}px`);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, [key]);
}
