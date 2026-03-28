'use client'
import React, { useState } from 'react';
import {
    FiPhone,
    FiMapPin,
    FiMail,
    FiClock,
    FiArrowRight,
    FiNavigation,
    FiMessageCircle
} from 'react-icons/fi';
import { FaInstagram, FaTelegram } from 'react-icons/fa';
import './contacts.css';

const Contacts = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });
    const [formStatus, setFormStatus] = useState({
        submitted: false,
        success: false,
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setFormStatus({
                submitted: true,
                success: true,
                message: 'Спасибо! Мы свяжемся с вами в ближайшее время.'
            });
            setIsSubmitting(false);
            setFormData({
                name: '',
                phone: '',
                email: '',
                message: ''
            });

            setTimeout(() => {
                setFormStatus({
                    submitted: false,
                    success: false,
                    message: ''
                });
            }, 5000);
        }, 1500);
    };

    const contacts = [
        {
            id: 1,
            icon: <FiPhone />,
            title: 'Телефоны',
            values: [
                { type: 'tel', value: '+998981102255', label: '+998 98 110 22 55' },
                { type: 'tel', value: '+998915452255', label: '+998 91 545 22 55' },
            ],
            note: 'Для связи с менеджером'
        },
        {
            id: 2,
            icon: <FiClock />,
            title: 'Режим работы',
            values: [
                { type: 'text', value: '09:00 - 20:00', label: '09:00 - 20:00' },
                { type: 'text', value: 'Ежедневно', label: 'Ежедневно' }
            ],
            note: 'Без выходных'
        },
        {
            id: 3,
            icon: <FiMapPin />,
            title: 'Адрес',
            values: [
                { type: 'text', value: mainLocation.address, label: mainLocation.address }
            ],
            note: 'г. Самарканд'
        },
        {
            id: 4,
            icon: <FaTelegram />,
            title: 'Telegram',
            values: [
                { type: 'link', value: `@${telegramContact}`, label: `@${telegramContact}` }
            ],
            note: 'Быстрая обратная связь',
            link: {
                href: `https://t.me/${telegramContact}`,
                text: 'Написать в Telegram'
            }
        }
    ];

    const socials = [
        {
            id: 1,
            name: 'Telegram',
            icon: <FaTelegram />,
            link: `https://t.me/${telegramContact}`,
            username: `@${telegramContact}`,
            color: 'telegram'
        },
        {
            id: 2,
            name: 'Instagram',
            icon: <FaInstagram />,
            link: 'https://www.instagram.com/master_gold_plumbing',
            username: '@master_gold_plumbing',
            color: 'instagram'
        }
    ];

    return (
        <main className="contacts-page">
            {/* Hero секция */}
            <section className="contacts-hero">
                <div className="container">
                    <div className="hero-content">
                        <span className="hero-badge">Santex Master Gold</span>
                        <h1 className="contacts-title">Контакты</h1>
                        <p className="contacts-subtitle">
                            Ваш надежный партнер в мире сантехники.
                            Мы всегда рады помочь с выбором качественной продукции.
                        </p>
                    </div>
                </div>
                <div className="hero-decoration">
                    <div className="decoration-circle"></div>
                    <div className="decoration-circle"></div>
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
                        {contacts.map((contact, index) => (
                            <div
                                key={contact.id}
                                className="info-card"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="info-icon-wrapper">
                                    <div className="info-icon">
                                        {contact.icon}
                                    </div>
                                </div>
                                <h3 className="info-title">{contact.title}</h3>
                                <div className="info-values">
                                    {contact.values.map((item, idx) => (
                                        item.type === 'tel' || item.type === 'email' ? (
                                            <a
                                                key={idx}
                                                href={`${item.type}:${item.value.replace(/\s/g, '')}`}
                                                className="info-value"
                                            >
                                                {item.label}
                                            </a>
                                        ) : (
                                            <span key={idx} className="info-value">
                                                {item.label}
                                            </span>
                                        )
                                    ))}
                                </div>
                                <p className="info-note">{contact.note}</p>
                                {contact.link && (
                                    <a
                                        href={contact.link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="info-link"
                                    >
                                        {contact.link.text}
                                        <FiArrowRight />
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Основная локация - Самарканд */}
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
                    <p className="social-subtitle">
                        Подписывайтесь на наши соцсети, чтобы следить за новинками и акциями
                    </p>
                    <div className="social-grid">
                        {socials.map((social, index) => (
                            <a
                                key={social.id}
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`social-card ${social.color}`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="social-icon-wrapper">
                                    {social.icon}
                                </div>
                                <div className="social-info">
                                    <span className="social-name">{social.name}</span>
                                    <span className="social-link">{social.username}</span>
                                </div>
                                <div className="social-arrow">
                                    <FiArrowRight />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Contacts;