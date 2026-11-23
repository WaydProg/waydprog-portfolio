export type ProfileId = 'kwork' | 'funpay' | 'playerok' | 'telegram';

export interface ProfileLink {
  readonly id: ProfileId;
  readonly label: string;
  /** Короткая подпись для кнопок под юзернеймом. */
  readonly shortLabel: string;
  readonly url: string | null;
}

export interface PublishedProfileLink extends ProfileLink {
  readonly url: string;
}

/**
 * Ссылки на профили. Пункт с `url: null` на сайте не показывается.
 */
export const profileLinks: readonly ProfileLink[] = [
  { id: 'kwork', label: 'Kwork', shortLabel: 'Kwork', url: 'https://kwork.ru/user/waydprog' },
  {
    id: 'funpay',
    label: 'FunPay',
    shortLabel: 'FunPay',
    url: 'https://funpay.com/users/21579588/',
  },
  {
    id: 'playerok',
    label: 'Playerok',
    shortLabel: 'Playerok',
    url: 'https://playerok.com/profile/WaydProg/products',
  },
  {
    id: 'telegram',
    label: 'Telegram-канал',
    shortLabel: 'Telegram',
    url: 'https://t.me/WaydProg_chanel',
  },
];

const isPublished = (link: ProfileLink): link is PublishedProfileLink => link.url !== null;

export const publishedProfileLinks: readonly PublishedProfileLink[] =
  profileLinks.filter(isPublished);
