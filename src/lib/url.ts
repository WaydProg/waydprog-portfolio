const MAX_DISPLAY_LENGTH = 22;

/** Короткая подпись для ссылки: домен с путём, а если так слишком длинно — только домен. */
export const formatDisplayUrl = (url: string): string => {
  const { hostname, pathname } = new URL(url);
  const host = hostname.replace(/^www\./, '');
  const full = `${host}${pathname.replace(/\/$/, '')}`;
  return full.length <= MAX_DISPLAY_LENGTH ? full : host;
};
