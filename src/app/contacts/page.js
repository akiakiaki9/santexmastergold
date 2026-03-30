import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import { FiPhone, FiMapPin, FiClock, FiNavigation, FiMessageCircle, FiMail } from 'react-icons/fi';
import { FaTelegram, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import './contacts.css';

export const metadata = {
    title: 'Контакты | Santex Master Gold - Оптовая сантехника в Самарканде',
    description: 'Свяжитесь с нами: телефоны +998 98 110-22-55, +998 91 545-22-55. Адрес: г. Самарканд, ул. Узбекистанская, 45. Режим работы: ежедневно 09:00-20:00. Быстрая связь в Telegram.',
    keywords: 'сантехника Самарканд, контакты, магазин сантехники, Santex Master Gold, оптовая сантехника, телефоны, адрес, режим работы',
    alternates: {
        canonical: 'https://santexmastergold.uz/contacts',
    },
    openGraph: {
        title: 'Контакты | Santex Master Gold - Оптовая сантехника в Самарканде',
        description: 'Свяжитесь с нами по телефонам +998 98 110-22-55, +998 91 545-22-55 или в Telegram. Адрес магазина: г. Самарканд, ул. Узбекистанская, 45.',
        url: 'https://santexmastergold.uz/contacts',
        siteName: 'Santex Master Gold',
        locale: 'ru_RU',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Контакты | Santex Master Gold',
        description: 'Свяжитесь с нами для оптовых закупок сантехники в Самарканде',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function ContactsPage() {
    // Основная локация - Самарканд
    const mainLocation = {
        name: 'Santex Master Gold',
        address: 'г. Самарканд, улица Узумзор',
        coordinates: '39.655443,66.880413',
        phone: '+998 98 110 22 55',
        phone2: '+998 91 545 22 55',
        phone3: '+998 99 133 77 27',
        email: 'info@santexmastergold.uz',
        mapLink: 'https://maps.google.com/maps?q=39.655443,66.880413&ll=39.655443,66.880413&z=16',
        workHours: '09:00 - 20:00',
        workDays: 'Ежедневно'
    };

    // Telegram контакт для обратной связи
    const telegramContact = 'Deryakeramik';

    // Структурированные данные для локального бизнеса
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Santex Master Gold",
        "image": "https://santexmastergold.uz/images/logo.png",
        "logo": "https://santexmastergold.uz/images/logo.png",
        "url": "https://santexmastergold.uz",
        "telephone": "+998981102255",
        "email": "info@santexmastergold.uz",
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "ул. Узбекистанская, 45",
            "addressLocality": "Самарканд",
            "addressCountry": "UZ"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "39.6542",
            "longitude": "66.9597"
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
                ],
                "opens": "09:00",
                "closes": "20:00"
            }
        ],
        "sameAs": [
            "https://t.me/shavkat_sharipov_86",
            "https://www.instagram.com/master_gold_plumbing"
        ],
        "contactPoint": [
            {
                "@type": "ContactPoint",
                "telephone": "+998981102255",
                "contactType": "customer service",
                "availableLanguage": ["Russian", "Uzbek"]
            },
            {
                "@type": "ContactPoint",
                "telephone": "+998915452255",
                "contactType": "sales",
                "availableLanguage": ["Russian", "Uzbek"]
            }
        ]
    };

    return (
        <>
            <Navbar />
            <main className="contacts-page">
                {/* Schema.org разметка */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />

                {/* Hero секция */}
                <section className="contacts-hero">
                    <div className="container">
                        <div className="hero-content">
                            <span className="hero-badge">Свяжитесь с нами</span>
                            <h1 className="contacts-title">Контакты</h1>
                            <p className="contacts-subtitle">
                                Santex Master Gold - ваш надежный партнер в мире сантехники.
                                Оптовые поставки по всему Узбекистану.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Кнопка обратной связи в Telegram */}
                <section className="telegram-feedback">
                    <div className="container">
                        <a
                            href={`https://t.me/${telegramContact}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="telegram-feedback-btn"
                            aria-label="Написать в Telegram"
                        >
                            <div className="telegram-feedback-icon">
                                <FaTelegram />
                            </div>
                            <div className="telegram-feedback-content">
                                <span className="telegram-feedback-title">Быстрая связь</span>
                                <span className="telegram-feedback-text">
                                    Напишите нам в Telegram, и мы ответим в течение 5 минут
                                </span>
                            </div>
                            <div className="telegram-feedback-arrow">
                                <FiMessageCircle />
                            </div>
                        </a>
                    </div>
                </section>

                {/* Контактная информация */}
                <section className="contacts-info">
                    <div className="container">
                        <div className="info-grid">
                            <div className="info-card">
                                <div className="info-icon">
                                    <FiPhone />
                                </div>
                                <h3 className="info-title">Телефоны</h3>
                                <a href="tel:+998981102255" className="info-value">+998 98 110 22 55</a>
                                <a href="tel:+998915452255" className="info-value">+998 91 545 22 55</a>
                                <a href="tel:+998991337727" className="info-value">+998 99 133 77 27</a>
                                <p className="info-note">Для связи с менеджером</p>
                            </div>

                            <div className="info-card">
                                <div className="info-icon">
                                    <FiMail />
                                </div>
                                <h3 className="info-title">Email</h3>
                                <a href="mailto:info@santexmastergold.uz" className="info-value">info@santexmastergold.uz</a>
                                <p className="info-note">Для коммерческих предложений</p>
                            </div>

                            <div className="info-card">
                                <div className="info-icon">
                                    <FiClock />
                                </div>
                                <h3 className="info-title">Режим работы</h3>
                                <p className="info-value">{mainLocation.workHours}</p>
                                <p className="info-value">{mainLocation.workDays}</p>
                                <p className="info-note">Без выходных</p>
                            </div>

                            <div className="info-card">
                                <div className="info-icon">
                                    <FiMapPin />
                                </div>
                                <h3 className="info-title">Адрес</h3>
                                <p className="info-value">{mainLocation.address}</p>
                                <p className="info-note">г. Самарканд</p>
                            </div>

                            <div className="info-card">
                                <div className="info-icon">
                                    <FaTelegram />
                                </div>
                                <h3 className="info-title">Telegram</h3>
                                <a href={`https://t.me/${telegramContact}`} target="_blank" rel="noopener noreferrer" className="info-value">
                                    @{telegramContact}
                                </a>
                                <p className="info-note">Быстрая обратная связь</p>
                            </div>

                            <div className="info-card">
                                <div className="info-icon">
                                    <FaInstagram />
                                </div>
                                <h3 className="info-title">Instagram</h3>
                                <a href="https://www.instagram.com/master_gold_plumbing" target="_blank" rel="noopener noreferrer" className="info-value">
                                    @master_gold_plumbing
                                </a>
                                <p className="info-note">Следите за новинками</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Основная локация - карта */}
                <section className="main-location-section">
                    <div className="container">
                        <h2 className="section-title">Наш магазин в Самарканде</h2>
                        <div className="main-location-card">
                            <div className="main-location-info">
                                <div className="main-location-header">
                                    <FiMapPin className="main-location-icon" />
                                    <h3>{mainLocation.name}</h3>
                                </div>
                                <p className="main-location-address">
                                    <strong>Адрес:</strong> {mainLocation.address}
                                </p>
                                <div className="main-location-phones">
                                    <strong>Телефоны:</strong>
                                    <a href="tel:+998981102255" className="location-phone-link">+998 98 110 22 55</a>
                                    <a href="tel:+998915452255" className="location-phone-link">+998 91 545 22 55</a>
                                    <a href="tel:+998991337727" className="location-phone-link">+998 99 133 77 27</a>
                                </div>
                                <div className="main-location-email">
                                    <strong>Email:</strong>
                                    <a href="mailto:info@santexmastergold.uz" className="location-email-link">info@santexmastergold.uz</a>
                                </div>
                                <div className="main-location-hours">
                                    <strong>Режим работы:</strong>
                                    <span>{mainLocation.workHours} | {mainLocation.workDays}</span>
                                </div>
                                <a
                                    href={mainLocation.mapLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="main-location-map-link"
                                    aria-label="Построить маршрут на карте"
                                >
                                    <FiNavigation />
                                    Построить маршрут
                                </a>
                            </div>
                            <div className="main-location-map">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000.1234567890123!2d66.9597!3d39.6542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDM5JzE1LjEiTiA2NsKwNTcnMzQuOSJF!5e0!3m2!1sru!2s!4v1234567890123!5m2!1sru!2s"
                                    width="100%"
                                    height="350"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Карта магазина Santex Master Gold в Самарканде"
                                    aria-label="Карта расположения магазина Santex Master Gold в Самарканде"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Социальные сети */}
                <section className="contacts-social">
                    <div className="container">
                        <h2 className="social-title">Мы в соцсетях</h2>
                        <p className="social-subtitle">
                            Подписывайтесь на нас, чтобы следить за новинками, акциями и получать актуальную информацию
                        </p>
                        <div className="social-grid">
                            <a
                                href="https://t.me/shavkat_sharipov_86"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-card telegram"
                                aria-label="Telegram канал Santex Master Gold"
                            >
                                <FaTelegram className="social-icon" />
                                <span className="social-name">Telegram</span>
                                <span className="social-link">@shavkat_sharipov_86</span>
                            </a>
                            <a
                                href="https://www.instagram.com/master_gold_plumbing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-card instagram"
                                aria-label="Instagram страница Santex Master Gold"
                            >
                                <FaInstagram className="social-icon" />
                                <span className="social-name">Instagram</span>
                                <span className="social-link">@master_gold_plumbing</span>
                            </a>
                            {/* <a
                                href="https://wa.me/998981102255"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-card whatsapp"
                                aria-label="WhatsApp чат Santex Master Gold"
                            >
                                <FaWhatsapp className="social-icon" />
                                <span className="social-name">WhatsApp</span>
                                <span className="social-link">+998 98 110 22 55</span>
                            </a> */}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}