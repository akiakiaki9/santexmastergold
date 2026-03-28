import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import { FiPhone, FiMapPin, FiMail, FiClock, FiNavigation, FiMessageCircle } from 'react-icons/fi';
import { FaTelegram, FaInstagram, FaYoutube } from 'react-icons/fa';
import Link from 'next/link';
import './contacts.css';

export const metadata = {
    title: 'Контакты | Santex Master Gold - Премиальная сантехника в Самарканде',
    description: 'Магазин сантехники в Самарканде. Телефоны, адрес, режим работы 09:00-20:00. Быстрая связь через Telegram.',
    keywords: 'сантехника Самарканд, контакты, магазин сантехники, Santex Master Gold',
};

export default function ContactsPage() {
    // Основная локация - Самарканд
    const mainLocation = {
        name: 'Santex Master Gold',
        address: 'г. Самарканд, ул. Узбекистанская, 45',
        coordinates: '39.6542,66.9597',
        phone: '+998 98 110 22 55',
        phone2: '+998 91 545 22 55',
        mapLink: 'https://maps.google.com/maps?q=39.6542,66.9597&ll=39.6542,66.9597&z=16',
        workHours: '09:00 - 20:00',
        workDays: 'Ежедневно'
    };

    // Telegram контакт для обратной связи
    const telegramContact = 'shavkat_sharipov_86';

    return (
        <>
            <Navbar />
            <main className="contacts-page">
                {/* Hero секция */}
                <section className="contacts-hero">
                    <div className="container">
                        <h1 className="contacts-title">Контакты</h1>
                        <p className="contacts-subtitle">
                            Santex Master Gold - ваш надежный партнер в мире сантехники
                        </p>
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
                                <p className="info-note">Для связи с менеджером</p>
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
                                >
                                    <FiNavigation />
                                    Построить маршрут
                                </a>
                            </div>
                            <div className="main-location-map">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000.1234567890123!2d66.9597!3d39.6542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDM5JzE1LjEiTiA2NsKwNTcnMzQuOSJF!5e0!3m2!1sru!2s!4v1234567890123!5m2!1sru!2s"
                                    width="100%"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Карта магазина Santex Master Gold в Самарканде"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Социальные сети */}
                <section className="contacts-social">
                    <div className="container">
                        <h2 className="social-title">Мы в соцсетях</h2>
                        <div className="social-grid">
                            <a href="https://t.me/shavkat_sharipov_86" target="_blank" rel="noopener noreferrer" className="social-card telegram">
                                <FaTelegram className="social-icon" />
                                <span className="social-name">Telegram</span>
                                <span className="social-link">@shavkat_sharipov_86</span>
                            </a>
                            <a href="https://www.instagram.com/master_gold_plumbing" target="_blank" rel="noopener noreferrer" className="social-card instagram">
                                <FaInstagram className="social-icon" />
                                <span className="social-name">Instagram</span>
                                <span className="social-link">@master_gold_plumbing</span>
                            </a>
                            {/* <a href="https://www.youtube.com/@debora_ceramica" target="_blank" rel="noopener noreferrer" className="social-card youtube">
                                <FaYoutube className="social-icon" />
                                <span className="social-name">YouTube</span>
                                <span className="social-link">Debora Ceramica</span>
                            </a> */}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}