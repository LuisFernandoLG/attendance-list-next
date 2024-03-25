import {
  createLocalizedPathnamesNavigation,
  Pathnames
} from 'next-intl/navigation';
 
export const locales = ['en', 'es'] as const;
export const localePrefix = 'always'; // Default
 
// The `pathnames` object holds pairs of internal
// and external paths, separated by locale.
export const pathnames: Pathnames<typeof locales> = {
  // If all locales use the same pathname, a
  // single external path can be provided.
  '/': '/',
 
  // If locales use different paths, you can
  // specify each external path per locale.
  '/auth/login': {
    en: '/auth/login',
    es: '/auth/login'
  },

  '/auth/sign-up': {
    en: '/auth/sign-up',
    es: '/auth/sign-up'
  },

  '/auth/confirm-email': {
    en: '/auth/confirm-email',
    es: '/auth/confirm-email'
  },

  '/dashboard': {
    en: '/dashboard',
    es: '/dashboard'
  },

  '/dashboard/events/[id]': {
    en: '/dashboard/events/[id]',
    es: '/dashboard/events/[id]'
  },

  '/dashboard/new-event': {
    en: '/dashboard/new-event',
    es: '/dashboard/new-event'
  },

  
  '/dashboard/profile': {
    en: '/dashboard/profile',
    es: '/dashboard/profile'
  },



  // // Dynamic params are supported via square brackets
  // '/news/[articleSlug]-[articleId]': {
  //   en: '/news/[articleSlug]-[articleId]',
  //   de: '/neuigkeiten/[articleSlug]-[articleId]'
  // },
 
  // // Also (optional) catch-all segments are supported
  // '/categories/[...slug]': {
  //   en: '/categories/[...slug]',
  //   de: '/kategorien/[...slug]'
  // }
} satisfies Pathnames<typeof locales>;
 
export const {Link, usePathname, useRouter, getPathname, permanentRedirect} =
  createLocalizedPathnamesNavigation({locales, localePrefix, pathnames});