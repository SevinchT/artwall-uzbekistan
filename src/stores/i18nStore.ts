import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Locale = "en" | "ru" | "uz";

interface I18nState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useI18nStore = create<I18nState>()(
  persist(
    (set) => ({
      locale: "en",
      setLocale: (locale) => set({ locale }),
    }),
    { name: "artwall-locale" }
  )
);

// Translation dictionary
const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.gallery": "Gallery",
    "nav.artists": "Artists",
    "nav.tryOnWall": "Try on Wall",
    "nav.signIn": "Sign In",
    "nav.joinArtist": "Join as Artist",

    // Hero
    "hero.overline": "AR-Powered Art Marketplace",
    "hero.title1": "Discover Uzbek Art.",
    "hero.title2": "See It On Your Wall.",
    "hero.subtitle": "The first AR-powered marketplace connecting Uzbek artists with global art lovers.",
    "hero.cta": "Explore Gallery",
    "hero.stat1.value": "200+",
    "hero.stat1.label": "Waitlisted Buyers",
    "hero.stat2.value": "50+",
    "hero.stat2.label": "Artists",
    "hero.stat3.value": "🇺🇿",
    "hero.stat3.label": "Made in Uzbekistan",

    // Sections
    "featured.overline": "Curated Selection",
    "featured.title": "Featured Artworks",
    "featured.desc": "Handpicked masterpieces from our most talented artists",
    "featured.viewAll": "View All",

    "howItWorks.overline": "Simple Process",
    "howItWorks.title": "How It Works",
    "howItWorks.desc": "From discovery to delivery, we make art buying effortless",
    "howItWorks.step1.title": "Discover Art",
    "howItWorks.step1.desc": "Browse our curated collection of authentic Uzbek artworks from verified local artists.",
    "howItWorks.step2.title": "Visualize on Your Wall",
    "howItWorks.step2.desc": "Use our AR feature to see how the artwork looks in your space before you buy.",
    "howItWorks.step3.title": "Own & Enjoy",
    "howItWorks.step3.desc": "Secure checkout with worldwide shipping. Your artwork arrives safely at your doorstep.",

    "categories.overline": "Browse By Style",
    "categories.title": "Explore Categories",
    "categories.works": "works",

    "artists.overline": "Our Creators",
    "artists.title": "Featured Artists",
    "artists.desc": "Meet the creative minds behind our collection",
    "artists.viewAll": "View All Artists",

    "testimonials.overline": "Testimonials",

    "cta.overline": "Start Your Collection",
    "cta.title1": "Ready to Own a Piece",
    "cta.title2": "of Uzbekistan?",
    "cta.desc": "Join thousands of art lovers who have discovered their perfect pieces through ArtWall.",
    "cta.gallery": "Explore Gallery",
    "cta.artist": "Become an Artist",

    // Footer
    "footer.newsletter.title": "Stay Connected with Art",
    "footer.newsletter.desc": "Subscribe to receive updates on new artworks, featured artists, and exclusive offers.",
    "footer.newsletter.placeholder": "Enter your email",
    "footer.newsletter.button": "Subscribe",
    "footer.brand.desc": "Connecting Uzbekistan's finest artists with art lovers worldwide. Discover, visualize, and own authentic artworks.",
    "footer.explore": "Explore",
    "footer.forArtists": "For Artists",
    "footer.support": "Support",
    "footer.copyright": "© 2024 ArtWall Uzbekistan. All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",

    // Try on Wall
    "wall.title": "Try on Your",
    "wall.titleAccent": "Wall",
    "wall.subtitle": "Visualize how artwork looks in your space before you buy",
    "wall.selectArtwork": "Select Artwork",
    "wall.clickToPreview": "Click an artwork to preview it here",
    "wall.dragToMove": "Drag to move",
    "wall.size": "Size",
    "wall.frame": "Frame",
    "wall.saveLook": "Save Look",
    "wall.inquire": "Inquire to Buy",
    "wall.yourRoom": "Your Room",
    "wall.roomModern": "Modern Living",
    "wall.roomScandinavian": "Scandinavian Bedroom",
    "wall.roomStudy": "Elegant Study",
    "wall.inquiryTitle": "Inquire About This Artwork",
    "wall.inquiryDesc": "We'll connect you with the artist directly.",
    "wall.yourName": "Your Name",
    "wall.email": "Email",
    "wall.message": "Message",
    "wall.sendInquiry": "Send Inquiry",

    // Theme
    "theme.light": "Light",
    "theme.dark": "Dark",
  },
  ru: {
    // Navbar
    "nav.home": "Главная",
    "nav.gallery": "Галерея",
    "nav.artists": "Художники",
    "nav.tryOnWall": "На стене",
    "nav.signIn": "Войти",
    "nav.joinArtist": "Стать художником",

    // Hero
    "hero.overline": "AR-маркетплейс искусства",
    "hero.title1": "Откройте узбекское искусство.",
    "hero.title2": "Примерьте на стену.",
    "hero.subtitle": "Первый AR-маркетплейс, соединяющий узбекских художников с ценителями искусства по всему миру.",
    "hero.cta": "Смотреть галерею",
    "hero.stat1.value": "200+",
    "hero.stat1.label": "Покупателей в ожидании",
    "hero.stat2.value": "50+",
    "hero.stat2.label": "Художников",
    "hero.stat3.value": "🇺🇿",
    "hero.stat3.label": "Сделано в Узбекистане",

    // Sections
    "featured.overline": "Избранное",
    "featured.title": "Избранные работы",
    "featured.desc": "Лучшие произведения от наших талантливых художников",
    "featured.viewAll": "Смотреть все",

    "howItWorks.overline": "Простой процесс",
    "howItWorks.title": "Как это работает",
    "howItWorks.desc": "От открытия до доставки — покупка искусства без усилий",
    "howItWorks.step1.title": "Откройте искусство",
    "howItWorks.step1.desc": "Просматривайте коллекцию аутентичных узбекских работ от проверенных художников.",
    "howItWorks.step2.title": "Визуализируйте на стене",
    "howItWorks.step2.desc": "Используйте AR, чтобы увидеть, как работа смотрится в вашем интерьере.",
    "howItWorks.step3.title": "Владейте и наслаждайтесь",
    "howItWorks.step3.desc": "Безопасная оплата и доставка по всему миру прямо к вашей двери.",

    "categories.overline": "По стилю",
    "categories.title": "Категории",
    "categories.works": "работ",

    "artists.overline": "Наши авторы",
    "artists.title": "Избранные художники",
    "artists.desc": "Познакомьтесь с творцами нашей коллекции",
    "artists.viewAll": "Все художники",

    "testimonials.overline": "Отзывы",

    "cta.overline": "Начните коллекцию",
    "cta.title1": "Готовы приобрести частичку",
    "cta.title2": "Узбекистана?",
    "cta.desc": "Присоединяйтесь к тысячам ценителей искусства, нашедших идеальные работы через ArtWall.",
    "cta.gallery": "Смотреть галерею",
    "cta.artist": "Стать художником",

    // Footer
    "footer.newsletter.title": "Оставайтесь на связи с искусством",
    "footer.newsletter.desc": "Подписывайтесь на обновления о новых работах, художниках и эксклюзивных предложениях.",
    "footer.newsletter.placeholder": "Ваш email",
    "footer.newsletter.button": "Подписаться",
    "footer.brand.desc": "Соединяем лучших художников Узбекистана с ценителями искусства по всему миру.",
    "footer.explore": "Обзор",
    "footer.forArtists": "Художникам",
    "footer.support": "Поддержка",
    "footer.copyright": "© 2024 ArtWall Узбекистан. Все права защищены.",
    "footer.privacy": "Политика конфиденциальности",
    "footer.terms": "Условия использования",

    // Try on Wall
    "wall.title": "Примерьте на",
    "wall.titleAccent": "стену",
    "wall.subtitle": "Визуализируйте, как работа смотрится в вашем пространстве",
    "wall.selectArtwork": "Выберите работу",
    "wall.clickToPreview": "Нажмите на работу для предпросмотра",
    "wall.dragToMove": "Перетащите",
    "wall.size": "Размер",
    "wall.frame": "Рама",
    "wall.saveLook": "Сохранить",
    "wall.inquire": "Купить",
    "wall.yourRoom": "Ваша комната",
    "wall.roomModern": "Современная гостиная",
    "wall.roomScandinavian": "Скандинавская спальня",
    "wall.roomStudy": "Элегантный кабинет",
    "wall.inquiryTitle": "Запрос о работе",
    "wall.inquiryDesc": "Мы свяжем вас с художником напрямую.",
    "wall.yourName": "Ваше имя",
    "wall.email": "Email",
    "wall.message": "Сообщение",
    "wall.sendInquiry": "Отправить запрос",

    "theme.light": "Светлая",
    "theme.dark": "Тёмная",
  },
  uz: {
    // Navbar
    "nav.home": "Bosh sahifa",
    "nav.gallery": "Galereya",
    "nav.artists": "Rassomlar",
    "nav.tryOnWall": "Devorga qo'yish",
    "nav.signIn": "Kirish",
    "nav.joinArtist": "Rassom bo'lish",

    // Hero
    "hero.overline": "AR san'at bozori",
    "hero.title1": "O'zbek san'atini kashf eting.",
    "hero.title2": "Devoringizda ko'ring.",
    "hero.subtitle": "O'zbek rassomlarini global san'at ishqibozlari bilan bog'laydigan birinchi AR bozor.",
    "hero.cta": "Galereyani ko'rish",
    "hero.stat1.value": "200+",
    "hero.stat1.label": "Kutayotgan xaridorlar",
    "hero.stat2.value": "50+",
    "hero.stat2.label": "Rassomlar",
    "hero.stat3.value": "🇺🇿",
    "hero.stat3.label": "O'zbekistonda ishlab chiqilgan",

    // Sections
    "featured.overline": "Tanlangan",
    "featured.title": "Tanlangan asarlar",
    "featured.desc": "Eng iqtidorli rassomlarimizdan tanlangan durdonalar",
    "featured.viewAll": "Hammasini ko'rish",

    "howItWorks.overline": "Oddiy jarayon",
    "howItWorks.title": "Qanday ishlaydi",
    "howItWorks.desc": "Kashfiyotdan yetkazib berishgacha — san'at sotib olish oson",
    "howItWorks.step1.title": "San'atni kashf eting",
    "howItWorks.step1.desc": "Tasdiqlangan mahalliy rassomlardan haqiqiy o'zbek san'at asarlarini ko'ring.",
    "howItWorks.step2.title": "Devorda tasavvur qiling",
    "howItWorks.step2.desc": "AR yordamida asar sizning xonangizda qanday ko'rinishini ko'ring.",
    "howItWorks.step3.title": "Egalik qiling",
    "howItWorks.step3.desc": "Xavfsiz to'lov va butun dunyo bo'ylab yetkazib berish.",

    "categories.overline": "Uslub bo'yicha",
    "categories.title": "Kategoriyalar",
    "categories.works": "asar",

    "artists.overline": "Bizning ijodkorlar",
    "artists.title": "Tanlangan rassomlar",
    "artists.desc": "Kolleksiyamiz ortidagi ijodiy aqllar bilan tanishing",
    "artists.viewAll": "Barcha rassomlar",

    "testimonials.overline": "Fikrlar",

    "cta.overline": "Kolleksiyangizni boshlang",
    "cta.title1": "O'zbekistondan bir bo'lakka",
    "cta.title2": "ega bo'lishga tayyormisiz?",
    "cta.desc": "ArtWall orqali o'z asarlarini topgan minglab san'at ishqibozlariga qo'shiling.",
    "cta.gallery": "Galereyani ko'rish",
    "cta.artist": "Rassom bo'lish",

    // Footer
    "footer.newsletter.title": "San'at bilan aloqada bo'ling",
    "footer.newsletter.desc": "Yangi asarlar, rassomlar va maxsus takliflar haqida yangilanishlarni oling.",
    "footer.newsletter.placeholder": "Email manzilingiz",
    "footer.newsletter.button": "Obuna bo'lish",
    "footer.brand.desc": "O'zbekistonning eng yaxshi rassomlarini butun dunyo san'at ishqibozlari bilan bog'laymiz.",
    "footer.explore": "Ko'rib chiqish",
    "footer.forArtists": "Rassomlar uchun",
    "footer.support": "Yordam",
    "footer.copyright": "© 2024 ArtWall O'zbekiston. Barcha huquqlar himoyalangan.",
    "footer.privacy": "Maxfiylik siyosati",
    "footer.terms": "Foydalanish shartlari",

    // Try on Wall
    "wall.title": "Devoringizga",
    "wall.titleAccent": "qo'ying",
    "wall.subtitle": "Sotib olishdan oldin asarni o'z xonangizda tasavvur qiling",
    "wall.selectArtwork": "Asar tanlang",
    "wall.clickToPreview": "Oldindan ko'rish uchun asarni bosing",
    "wall.dragToMove": "Suring",
    "wall.size": "O'lcham",
    "wall.frame": "Ramka",
    "wall.saveLook": "Saqlash",
    "wall.inquire": "Sotib olish",
    "wall.yourRoom": "Sizning xonangiz",
    "wall.roomModern": "Zamonaviy yashash xonasi",
    "wall.roomScandinavian": "Skandinav yotoqxonasi",
    "wall.roomStudy": "Nafis ish xonasi",
    "wall.inquiryTitle": "Asar haqida so'rov",
    "wall.inquiryDesc": "Sizni rassom bilan bog'laymiz.",
    "wall.yourName": "Ismingiz",
    "wall.email": "Email",
    "wall.message": "Xabar",
    "wall.sendInquiry": "So'rov yuborish",

    "theme.light": "Kunduz",
    "theme.dark": "Tungi",
  },
};

export function t(key: string): string {
  const locale = useI18nStore.getState().locale;
  return translations[locale][key] || translations.en[key] || key;
}

export function useTranslation() {
  const locale = useI18nStore((s) => s.locale);
  const translate = (key: string): string => {
    return translations[locale][key] || translations.en[key] || key;
  };
  return { t: translate, locale };
}
