export const hero = {
  titleLines: ['Сайты. Боты.', 'Ничего лишнего.'],
  lead: [
    'Создаю понятные интерфейсы и автоматизирую рутину.',
    'От идеи и первого экрана — до работающего продукта.',
  ],
} as const;

export const about = {
  title: 'Обо мне',
  paragraphs: [
    'Я фрилансер: делаю Telegram-ботов и сайты, заказы принимаю на Kwork, FunPay и Playerok. Боты пишу на Python и aiogram 3, веб — на React и FastAPI, лендинги — на чистых HTML и CSS.',
    'Для себя сделал бота, который следит за новыми проектами на Kwork, присылает их в Telegram и готовит черновик отклика через языковые модели OpenRouter. Черновик правится прямо в чате, а форму на бирже бот заполняет сам.',
    'Перед сдачей проверяю работу на телефоне и десктопе и пишу тесты там, где от логики зависят деньги или данные: в Gigkod это 232 теста API и e2e-сценарии на Playwright.',
  ],
} as const;

export interface Service {
  readonly title: string;
  readonly text: string;
  readonly proof: string;
}

export const services: readonly Service[] = [
  {
    title: 'Telegram-боты',
    text: 'Боты на aiogram 3 с inline-кнопками, базой данных, доступом для администраторов и фоновыми задачами: мониторинг, уведомления, отчёты.',
    proof: 'Монитор заказов Kwork, фильтр токенов Solana, Oskol Lead Finder',
  },
  {
    title: 'Сайты и лендинги',
    text: 'Адаптивная вёрстка без горизонтальной прокрутки на телефоне, аккуратная типографика и интерфейсы под конкретную задачу посетителя.',
    proof: 'Галс, Ельник, Затвор, Обжиг, Stars Coffee',
  },
  {
    title: 'Веб-сервисы',
    text: 'Бэкенд на FastAPI и PostgreSQL, фронтенд на React: личные кабинеты, чаты, роли, админ-панель, оплата и деплой в Docker.',
    proof: 'Gigkod — биржа IT-специалистов',
  },
  {
    title: 'ИИ и автоматизация',
    text: 'Подключение языковых моделей через OpenRouter и Claude API, парсинг и действия в браузере через Selenium и Playwright.',
    proof: 'Монитор заказов Kwork, Oskol Lead Finder',
  },
  {
    title: 'Доработка готового',
    text: 'Развиваю существующий код, почти не трогая исходники: новая функция подключается отдельным модулем.',
    proof: 'Журнал лабораторных замесов — синхронизация через Firebase',
  },
];

export interface StackGroup {
  readonly title: string;
  readonly items: readonly string[];
}

export const stack: readonly StackGroup[] = [
  { title: 'Боты', items: ['Python', 'aiogram 3', 'SQLAlchemy', 'SQLite', 'Pydantic'] },
  {
    title: 'Веб',
    items: ['React', 'Vite', 'HTML/CSS', 'JavaScript', 'FastAPI', 'PostgreSQL', 'Redis'],
  },
  {
    title: 'ИИ и браузер',
    items: ['OpenRouter', 'Claude API', 'Selenium', 'Playwright', 'WebSocket'],
  },
  {
    title: 'Инфраструктура',
    items: ['Docker', 'nginx', 'Firebase', 'GitHub Actions', 'pytest'],
  },
];

export interface ProcessStep {
  readonly title: string;
  readonly text: string;
}

export const processSteps: readonly ProcessStep[] = [
  {
    title: 'Разбор задачи',
    text: 'Уточняю, что должно получиться, и фиксирую объём, срок и цену до начала работы.',
  },
  {
    title: 'Первый экран',
    text: 'Для сайта — структура и первый экран, для бота — сценарий команд и кнопок. Согласуем до основной разработки.',
  },
  {
    title: 'Разработка',
    text: 'Пишу код и показываю промежуточный результат: бота можно запустить, сайт — открыть по ссылке.',
  },
  {
    title: 'Проверка',
    text: 'Прогоняю сценарии на телефоне и десктопе, для логики с данными пишу тесты.',
  },
  {
    title: 'Сдача',
    text: 'Передаю код и инструкцию по запуску. Ключи и токены хранятся в .env и в код не попадают.',
  },
];

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

export const faq: readonly FaqItem[] = [
  {
    question: 'Где можно сделать заказ?',
    answer:
      'На Kwork, FunPay или Playerok — оплата проходит через площадку. Ссылки на профили — в блоке контактов.',
  },
  {
    question: 'Что нужно, чтобы начать?',
    answer:
      'Описание задачи своими словами и примеры, если они есть. Для бота понадобится токен от @BotFather — его вы создаёте сами и передаёте только для запуска.',
  },
  {
    question: 'Можно доработать уже готовый проект?',
    answer:
      'Да. Например, в журнал лабораторных замесов заказчика я добавил синхронизацию между устройствами, изменив в исходной странице всего четыре строки.',
  },
  {
    question: 'Можно подключить нейросеть?',
    answer:
      'Да, через OpenRouter или Claude API. В моём мониторе Kwork модель пишет черновики откликов, в Oskol Lead Finder — анализирует сайты, а итоговый балл считает код.',
  },
  {
    question: 'Где будет работать бот?',
    answer:
      'На вашем сервере или VPS. Могу подготовить запуск в Docker и описать, как обновлять бота.',
  },
];

export const contacts = {
  kicker: 'На связи',
  title: 'Обсудим ваш проект?',
  lead: 'Расскажите, что нужно создать. Начнём с идеи.',
} as const;

export const footerNote = 'Сайты и Telegram-боты на заказ.';
