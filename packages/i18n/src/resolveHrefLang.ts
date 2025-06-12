export function resolveHrefLang(
  locale?: string,
  documentType?: string,
  slug?: string,
): string {
  const langPrefix = locale && locale !== 'da' ? `/${locale}` : '' // Danish is the default
  switch (documentType) {
    case 'page':
      return slug
        ? `${langPrefix}/${slug}`.replace(/\/{2,}/g, '/')
        : langPrefix || '/'
    case 'event':
      return slug
        ? `${langPrefix}/begivenheder/${slug}`.replace(/\/{2,}/g, '/')
        : langPrefix || '/'
    case 'article':
      return slug
        ? `${langPrefix}/artikler/${slug}`.replace(/\/{2,}/g, '/')
        : langPrefix || '/'
    case 'project':
      return slug
        ? `${langPrefix}/projekter/${slug}`.replace(/\/{2,}/g, '/')
        : langPrefix || '/'
    case 'fictionalCase':
      return slug
        ? `${langPrefix}/projekter/fictional/${slug}`.replace(/\/{2,}/g, '/')
        : `${langPrefix}/projekter/fictional`

    case 'commercialCase':
      return slug
        ? `${langPrefix}/projekter/commercial/${slug}`.replace(/\/{2,}/g, '/')
        : `${langPrefix}/projekter/commercial`

    case 'musicalCase':
      return slug
        ? `${langPrefix}/projekter/musical/${slug}`.replace(/\/{2,}/g, '/')
        : `${langPrefix}/projekter/musical`
    case 'case':
      return slug
        ? `${langPrefix}/projekter/${slug}`.replace(/\/{2,}/g, '/')
        : langPrefix || '/'
    default:
      console.warn('Invalid document type:', documentType)
      return langPrefix || '/'
  }
}

export function resolveHomeHrefLang(locale?: string): string {
  return locale && locale !== 'da' ? `/${locale}` : '/'
}
