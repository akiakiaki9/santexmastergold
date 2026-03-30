import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import Script from 'next/script';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Santex Master Gold | Оптовая сантехника в Самарканде | Премиум бренды",
    template: "%s | Santex Master Gold"
  },
  description: "Оптовая продажа сантехники в Самарканде. Mercury plast, Zegor, Hydro Plast, Climaroom и другие премиум бренды. Доставка по Узбекистану. Низкие цены, гарантия качества.",
  keywords: [
    "сантехника Самарканд",
    "оптовая сантехника Самарканд",
    "магазин сантехники Самарканд",
    "Mercury plast Самарканд",
    "Zegor Самарканд",
    "Hydro Plast Самарканд",
    "сантехника оптом",
    "трубы и фитинги оптом",
    "смесители оптом",
    "сантехника для дома",
    "сантехника для бизнеса",
    "Santex Master Gold",
    "магазин сантехники",
    "сантехника премиум класса"
  ],
  authors: [{ name: "Santex Master Gold" }],
  creator: "Santex Master Gold",
  publisher: "Santex Master Gold",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL('https://santexmastergold.uz'),
  alternates: {
    canonical: '/',
    languages: {
      'ru': '/',
      'uz': '/uz',
    },
  },
  openGraph: {
    title: "Santex Master Gold | Оптовая сантехника в Самарканде",
    description: "Оптовая продажа сантехники в Самарканде. Mercury plast, Zegor, Hydro Plast, Climaroom и другие премиум бренды. Доставка по Узбекистану. Низкие цены, гарантия качества.",
    url: "https://santexmastergold.uz",
    siteName: "Santex Master Gold",
    images: [
      {
        url: "https://santexmastergold.uz/images/logo.png",
        width: 512,
        height: 512,
        alt: "Santex Master Gold - Оптовая сантехника в Самарканде",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Santex Master Gold | Оптовая сантехника в Самарканде",
    description: "Оптовая продажа сантехники в Самарканде. Mercury plast, Zegor, Hydro Plast, Climaroom и другие премиум бренды.",
    images: ["https://santexmastergold.uz/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
      { url: '/images/logo.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/images/logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  verification: {
    google: 'ВАШ_GOOGLE_VERIFICATION_КОД',
    yandex: 'ВАШ_YANDEX_VERIFICATION_КОД',
  },
  category: 'sanitary ware wholesale',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#C5A572',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <Script
          id="ld-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WholesaleStore",
              "name": "Santex Master Gold",
              "image": "https://santexmastergold.uz/images/logo.png",
              "logo": "https://santexmastergold.uz/images/logo.png",
              "url": "https://santexmastergold.uz",
              "description": "Оптовая продажа сантехники в Самарканде. Премиум бренды: Mercury plast, Zegor, Hydro Plast, Climaroom, Fayz Plast, AeMarket.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Самарканд",
                "addressCountry": "UZ",
                "streetAddress": "ул. Узбекистанская, 45"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "39.6542",
                "longitude": "66.9597"
              },
              "openingHours": "Mo-Su 09:00-20:00",
              "telephone": "+998 98 110 22 55",
              "email": "info@santexmastergold.uz",
              "priceRange": "$$",
              "sameAs": [
                "https://t.me/shavkat_sharipov_86",
                "https://www.instagram.com/master_gold_plumbing",
                "https://www.youtube.com/@debora_ceramica"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Сантехника",
                "itemListElement": [
                  {
                    "@type": "OfferCatalog",
                    "name": "Трубы и фитинги",
                    "itemListElement": [
                      {
                        "@type": "Product",
                        "name": "Mercury plast",
                        "description": "Качественные трубы и фитинги для водоснабжения и отопления"
                      },
                      {
                        "@type": "Product",
                        "name": "Hydro Plast",
                        "description": "Профессиональные системы трубопроводов"
                      }
                    ]
                  },
                  {
                    "@type": "OfferCatalog",
                    "name": "Смесители",
                    "itemListElement": [
                      {
                        "@type": "Product",
                        "name": "Zegor",
                        "description": "Современные смесители для кухни и ванной"
                      }
                    ]
                  },
                  {
                    "@type": "OfferCatalog",
                    "name": "Сантехника",
                    "itemListElement": [
                      {
                        "@type": "Product",
                        "name": "DERYA PLASTIK & DERYA KERAMIKA",
                        "description": "Премиальная сантехника для вашего дома"
                      }
                    ]
                  },
                  {
                    "@type": "OfferCatalog",
                    "name": "Вентиляция",
                    "itemListElement": [
                      {
                        "@type": "Product",
                        "name": "Climaroom",
                        "description": "Климатическое оборудование и вентиляция"
                      }
                    ]
                  },
                  {
                    "@type": "OfferCatalog",
                    "name": "Бочки и емкости",
                    "itemListElement": [
                      {
                        "@type": "Product",
                        "name": "Fayz Plast",
                        "description": "Пластиковые бочки и емкости для хранения воды"
                      }
                    ]
                  },
                  {
                    "@type": "OfferCatalog",
                    "name": "Отопление и насосы",
                    "itemListElement": [
                      {
                        "@type": "Product",
                        "name": "AeMarket",
                        "description": "Бойлеры, генераторы, насосы"
                      }
                    ]
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}