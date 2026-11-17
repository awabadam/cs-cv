/*
 * The site in three languages. English sits at the root, Arabic at /ar and Turkish at /tr.
 * This file holds the page chrome and the hand-written copy (hero, about); the project
 * data is translated through the dictionaries in ar.json and tr.json (see data.ts).
 */

import type { Kind } from "@/data/work";

export const locales = ["en", "ar", "tr"] as const;
export type Locale = (typeof locales)[number];

export const languages: Record<Locale, { short: string; name: string; og: string }> = {
  en: { short: "EN", name: "English", og: "en_US" },
  ar: { short: "عربي", name: "العربية", og: "ar_AR" },
  tr: { short: "TR", name: "Türkçe", og: "tr_TR" },
};

export const isRtl = (l: Locale) => l === "ar";

/* The locale of a page, from its URL. */
export const localeOf = (url: URL): Locale => {
  const first = url.pathname.split("/")[1]?.replace(/\.html$/, "");
  return first === "ar" || first === "tr" ? first : "en";
};

/* A page's path with the locale taken off: "/ar/work/x" → "/work/x", "/tr" → "/". */
export const unlocalized = (url: URL) =>
  url.pathname.replace(/\.html$/, "").replace(/^\/(ar|tr)(?=\/|$)/, "") || "/";

/* A site path in a locale: ("/work/x", "ar") → "/ar/work/x", ("/#work", "tr") → "/tr#work". */
export const localized = (path: string, l: Locale) =>
  l === "en" ? path : `/${l}${path.replace(/^\/(?=$|#)/, "")}`;

type Strings = {
  name: string;
  role: string;
  description: string;
  share: string;
  nav: { work: string; about: string; experience: string; skills: string; contact: string };
  sections: string;
  language: string;
  hero: { title: string; muted: string; intro: string };
  /* The about section: a statement (its first sentence, then the rest in grey) and the story,
     one chapter per city. */
  about: { title: string; muted: string; story: { place: string; years: string; text: string }[] };
  design: string;
  technical: string;
  phone: string;
  basedIn: string;
  city: string;
  cityCountry: string;
  studioSite: string;
  online: string;
  contact: { title: string; muted: string };
  menu: string;
  toTop: string;
  localTime: string;
  cities: { london: string; newYork: string; dubai: string; tokyo: string };
  all: string;
  filter: string;
  kinds: Record<Kind, string>;
  listSep: string;
  allWork: string;
  next: string;
  allProjects: (n: number) => string;
  moreWork: string;
  project: string;
  scope: string;
  palette: string;
  sampledAll: string;
  sampledSome: (names: string) => string;
  caseStudy: string;
  roleLabel: string;
  liveSite: string;
  enlarge: (alt: string) => string;
  enlargeImage: string;
  viewer: string;
  close: string;
  prev: string;
  nextImage: string;
  theme: string;
  themes: { auto: string; light: string; dark: string };
  notFound: { title: string; heading: string; body: string; back: string };
};

export const ui: Record<Locale, Strings> = {
  en: {
    name: "Awab Elkhalil",
    role: "Designer & Developer",
    description:
      "Work and CV of Awab Elkhalil — brand identity, campaigns, websites and products, designed and built end to end. Based in Istanbul.",
    share: "Brand identity, campaigns, websites and products — designed and built end to end.",
    nav: { work: "Work", about: "About", experience: "Experience", skills: "Skills", contact: "Contact" },
    sections: "Sections",
    language: "Language",
    hero: {
      title: "I design it, then I build it.",
      muted: "Brand, interface, code — end to end.",
      intro:
        "Designer and developer in Istanbul. A decade of graphic design, five years building two brands from the ground up, and a practice that now runs the whole distance — brand, interface, code, and the server it ships to. Mostly multilingual, mostly Arabic first.",
    },
    about: {
      title: "I am a digital artisan.",
      muted: "I hack, I play, I mold projects until they hit their targets — or until the work speaks for itself.",
      story: [
        {
          place: "Khartoum",
          years: "2016 – 2020",
          text: "It started in Khartoum — designing logos and event materials at icare-net, where I first touched web design and felt the pull of the screen. From there: leading teams, building brands, co-founding a production studio with friends on the side. In 2020, everything changed.",
        },
        {
          place: "Istanbul",
          years: "2020 – Present",
          text: "New city. New language. New market. I joined a dental company with two brands and no designer. Over five years I built everything — the logos, the identity systems, the social media, the websites — and a team to carry it forward. Then I learned to build the software too: a platform in eight languages, a patient app, a portal, an AI system that listens to sales calls. The design eye never left.",
        },
      ],
    },
    design: "Design",
    technical: "Technical",
    phone: "Phone",
    basedIn: "Based in",
    city: "Istanbul",
    cityCountry: "Istanbul, Türkiye",
    studioSite: "Studio site",
    online: "Online",
    contact: { title: "Have something to build?", muted: "Write to me." },
    menu: "Menu",
    toTop: "Back to top",
    localTime: "Local time",
    cities: { london: "London", newYork: "New York", dubai: "Dubai", tokyo: "Tokyo" },
    all: "All",
    filter: "Filter by discipline",
    kinds: {
      brand: "Brand",
      web: "Web",
      product: "Product",
      campaign: "Campaign",
      "3d": "3D",
      motion: "Motion",
      print: "Print",
      photo: "Photo",
    },
    listSep: ", ",
    allWork: "← All work",
    next: "Next",
    allProjects: (n) => `All ${n} projects →`,
    moreWork: "More work",
    project: "project",
    scope: "Scope",
    palette: "Palette",
    sampledAll: "Sampled from the artwork",
    sampledSome: (names) => `${names} sampled from the artwork; the rest as specified`,
    caseStudy: "Case study",
    roleLabel: "Role",
    liveSite: "Live site",
    enlarge: (alt) => `Enlarge: ${alt}`,
    enlargeImage: "Enlarge image",
    viewer: "Image viewer",
    close: "Close",
    prev: "Previous image",
    nextImage: "Next image",
    theme: "Colour theme",
    themes: { auto: "Auto", light: "Light", dark: "Dark" },
    notFound: {
      title: "Nothing here",
      heading: "Nothing here.",
      body: "The page you’re looking for doesn’t exist or has moved.",
      back: "← See the work",
    },
  },

  ar: {
    name: "أواب الخليل",
    role: "مصمم ومطوّر",
    description:
      "أعمال أواب الخليل وسيرته الذاتية — هويات بصرية وحملات ومواقع ومنتجات، صممها وبناها من البداية إلى النهاية. مقيم في إسطنبول.",
    share: "هويات بصرية وحملات ومواقع ومنتجات — صممها وبناها من البداية إلى النهاية.",
    nav: { work: "الأعمال", about: "نبذة", experience: "الخبرات", skills: "المهارات", contact: "تواصل" },
    sections: "الأقسام",
    language: "اللغة",
    hero: {
      title: "أصممه، ثم أبنيه.",
      muted: "الهوية، والواجهة، والكود — من البداية إلى النهاية.",
      intro:
        "مصمم ومطوّر في إسطنبول. عشر سنوات في التصميم الجرافيكي، وخمس سنوات في بناء علامتين تجاريتين من الصفر، وممارسة تغطي اليوم المسافة كلها — الهوية، والواجهة، والكود، والخادم الذي يُنشر عليه. أغلب أعمالي متعددة اللغات، وأغلبها بالعربية أولًا.",
    },
    about: {
      title: "أنا حِرفي رقمي.",
      muted: "أجرّب وألعب وأشكّل المشاريع حتى تصيب أهدافها — أو حتى يتحدث العمل عن نفسه.",
      story: [
        {
          place: "الخرطوم",
          years: "2016 – 2020",
          text: "بدأ كل شيء في الخرطوم — بتصميم الشعارات ومواد الفعاليات في icare-net، حيث لمست تصميم الويب لأول مرة وشعرت بجاذبية الشاشة. ومن هناك: قيادة الفرق، وبناء العلامات التجارية، وتأسيس استوديو إنتاج مع أصدقاء إلى جانب عملي. وفي 2020 تغيّر كل شيء.",
        },
        {
          place: "إسطنبول",
          years: "2020 – حتى الآن",
          text: "مدينة جديدة. لغة جديدة. سوق جديد. انضممت إلى شركة طب أسنان لديها علامتان تجاريتان ولا مصمم لديها. على مدى خمس سنوات بنيت كل شيء — الشعارات، وأنظمة الهوية، ووسائل التواصل الاجتماعي، والمواقع — وفريقًا يواصل المسيرة. ثم تعلمت أن أبني البرمجيات أيضًا: منصة بثماني لغات، وتطبيقًا للمرضى، وبوابة، ونظام ذكاء اصطناعي يستمع إلى مكالمات المبيعات. ولم تغب عين المصمم يومًا.",
        },
      ],
    },
    design: "التصميم",
    technical: "التقنية",
    phone: "الهاتف",
    basedIn: "المقر",
    city: "إسطنبول",
    cityCountry: "إسطنبول، تركيا",
    studioSite: "موقع الاستوديو",
    online: "على الإنترنت",
    contact: { title: "لديك ما تريد بناءه؟", muted: "راسلني." },
    menu: "القائمة",
    toTop: "العودة إلى الأعلى",
    localTime: "التوقيت المحلي",
    cities: { london: "لندن", newYork: "نيويورك", dubai: "دبي", tokyo: "طوكيو" },
    all: "الكل",
    filter: "تصفية حسب المجال",
    kinds: {
      brand: "هوية",
      web: "ويب",
      product: "منتجات",
      campaign: "حملات",
      "3d": "ثلاثي الأبعاد",
      motion: "موشن",
      print: "مطبوعات",
      photo: "تصوير",
    },
    listSep: "، ",
    allWork: "→ كل الأعمال",
    next: "التالي",
    allProjects: (n) => `كل المشاريع (${n}) ←`,
    moreWork: "أعمال أخرى",
    project: "المشروع",
    scope: "النطاق",
    palette: "الألوان",
    sampledAll: "مأخوذة من العمل نفسه",
    sampledSome: (names) => `${names} مأخوذة من العمل نفسه، والبقية كما حُددت`,
    caseStudy: "دراسة حالة",
    roleLabel: "الدور",
    liveSite: "الموقع",
    enlarge: (alt) => `تكبير: ${alt}`,
    enlargeImage: "تكبير الصورة",
    viewer: "عارض الصور",
    close: "إغلاق",
    prev: "الصورة السابقة",
    nextImage: "الصورة التالية",
    theme: "سمة الألوان",
    themes: { auto: "تلقائي", light: "فاتح", dark: "داكن" },
    notFound: {
      title: "لا شيء هنا",
      heading: "لا شيء هنا.",
      body: "الصفحة التي تبحث عنها غير موجودة أو نُقلت.",
      back: "→ شاهد الأعمال",
    },
  },

  tr: {
    name: "Awab Elkhalil",
    role: "Tasarımcı ve Geliştirici",
    description:
      "Awab Elkhalil'in işleri ve özgeçmişi — marka kimliği, kampanyalar, web siteleri ve ürünler; uçtan uca tasarlandı ve geliştirildi. İstanbul'da.",
    share: "Marka kimliği, kampanyalar, web siteleri ve ürünler — uçtan uca tasarlandı ve geliştirildi.",
    nav: { work: "İşler", about: "Hakkımda", experience: "Deneyim", skills: "Yetkinlikler", contact: "İletişim" },
    sections: "Bölümler",
    language: "Dil",
    hero: {
      title: "Önce tasarlarım, sonra geliştiririm.",
      muted: "Marka, arayüz, kod — uçtan uca.",
      intro:
        "İstanbul'da tasarımcı ve geliştirici. On yıllık grafik tasarım, iki markayı sıfırdan kurmaya geçen beş yıl ve artık yolun tamamını kapsayan bir pratik — marka, arayüz, kod ve yayına alındığı sunucu. İşlerimin çoğu çok dilli, çoğu önce Arapça.",
    },
    about: {
      title: "Dijital bir zanaatkârım.",
      muted: "Kurcalarım, denerim, projeleri hedeflerine ulaşana kadar şekillendiririm — ya da iş kendini anlatana kadar.",
      story: [
        {
          place: "Hartum",
          years: "2016 – 2020",
          text: "Her şey Hartum'da başladı — icare-net'te logo ve etkinlik materyalleri tasarlarken web tasarımıyla ilk kez tanıştım ve ekranın çekimini hissettim. Sonrası: ekipler yönetmek, markalar kurmak, yan işte arkadaşlarla bir prodüksiyon stüdyosu kurmak. 2020'de her şey değişti.",
        },
        {
          place: "İstanbul",
          years: "2020 – Günümüz",
          text: "Yeni şehir. Yeni dil. Yeni pazar. İki markası olan ama hiç tasarımcısı olmayan bir diş kliniği şirketine katıldım. Beş yılda her şeyi kurdum — logoları, kimlik sistemlerini, sosyal medyayı, web sitelerini — ve bunları ileri taşıyacak bir ekibi. Sonra yazılımı da kurmayı öğrendim: sekiz dilli bir platform, bir hasta uygulaması, bir portal, satış görüşmelerini dinleyen bir yapay zekâ sistemi. Tasarımcı gözü hiç kaybolmadı.",
        },
      ],
    },
    design: "Tasarım",
    technical: "Teknik",
    phone: "Telefon",
    basedIn: "Konum",
    city: "İstanbul",
    cityCountry: "İstanbul, Türkiye",
    studioSite: "Stüdyo sitesi",
    online: "Çevrimiçi",
    contact: { title: "Yapılacak bir işiniz mi var?", muted: "Bana yazın." },
    menu: "Menü",
    toTop: "Başa dön",
    localTime: "Yerel saat",
    cities: { london: "Londra", newYork: "New York", dubai: "Dubai", tokyo: "Tokyo" },
    all: "Tümü",
    filter: "Alana göre filtrele",
    kinds: {
      brand: "Marka",
      web: "Web",
      product: "Ürün",
      campaign: "Kampanya",
      "3d": "3D",
      motion: "Motion",
      print: "Baskı",
      photo: "Fotoğraf",
    },
    listSep: ", ",
    allWork: "← Tüm işler",
    next: "Sıradaki",
    allProjects: (n) => `Tüm projeler (${n}) →`,
    moreWork: "Diğer işler",
    project: "proje",
    scope: "Kapsam",
    palette: "Renk paleti",
    sampledAll: "Çalışmadan örneklendi",
    sampledSome: (names) => `${names} çalışmadan örneklendi; diğerleri belirtildiği gibi`,
    caseStudy: "Vaka çalışması",
    roleLabel: "Rol",
    liveSite: "Canlı site",
    enlarge: (alt) => `Büyüt: ${alt}`,
    enlargeImage: "Görseli büyüt",
    viewer: "Görsel görüntüleyici",
    close: "Kapat",
    prev: "Önceki görsel",
    nextImage: "Sonraki görsel",
    theme: "Renk teması",
    themes: { auto: "Otomatik", light: "Açık", dark: "Koyu" },
    notFound: {
      title: "Burada bir şey yok",
      heading: "Burada bir şey yok.",
      body: "Aradığınız sayfa yok ya da taşındı.",
      back: "← İşlere göz atın",
    },
  },
};
