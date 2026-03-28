'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    FiMail,
    FiMapPin,
    FiClock,
    FiArrowUp,
    FiChevronRight,
    FiCode,
    FiPhone
} from 'react-icons/fi';
import { FaYoutube, FaInstagram, FaTelegram } from 'react-icons/fa';
import { brands } from '@/app/utils/data1';
import './footer.css';

// Функция для создания слага из названия бренда
const createSlug = (name) => {
    return name
        .toLowerCase()
        .replace(/[&]/g, 'and')
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-');
};

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Берем все бренды для футера
    const allBrands = brands;

    const footerInfoLinks = [
        { name: 'Контакты', slug: '/contacts' },
        { name: 'Корзина', slug: '/cart' },
        { name: 'Каталог', slug: '/catalog' },
    ];

    const footerSocialLinks = [
        // { icon: <FaTelegram />, href: 'https://t.me/debora_ceramic', label: 'Telegram' },
        { icon: <FaInstagram />, href: 'https://www.instagram.com/master_gold_plumbing', label: 'Instagram' },
        // { icon: <FaYoutube />, href: 'https://www.youtube.com/@debora_ceramica', label: 'YouTube' },
    ];

    return (
        <footer className="site-footer">
            {/* Декоративная волна сверху */}
            <div className="footer-wave-decoration">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="var(--navy-dark)" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                </svg>
            </div>

            {/* Основной футер */}
            <div className="footer-main-content">
                <div className="footer-container">
                    <div className="footer-columns">
                        {/* О компании */}
                        <div className="footer-column footer-about">
                            <div className="footer-logo-block">
                                <Image
                                    src="/images/logo.png"
                                    alt="Debora Ceramica"
                                    width={100}
                                    height={100}
                                    className="footer-logo-image"
                                />
                                <h3 className="footer-brand-name">Santex Master Gold</h3>
                            </div>
                            <p className="footer-company-description">
                                Оптовик примеальных сантехник в Самарканде
                            </p>
                            <div className="footer-social-links">
                                {footerSocialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="footer-social-item"
                                        aria-label={social.label}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Бренды с логотипами */}
                        <div className="footer-column">
                            <h3 className="footer-column-title">Бренды</h3>
                            <ul className="footer-menu-list">
                                {allBrands.map((brand) => {
                                    const brandSlug = createSlug(brand.name);
                                    return (
                                        <li key={brand.id}>
                                            <Link href={`/catalog/${brandSlug}`} className="footer-menu-link">
                                                {brand.image && (
                                                    <div className="footer-brand-logo">
                                                        <img src={brand.image} alt={brand.name} />
                                                    </div>
                                                )}
                                                <span className="footer-brand-name-text">{brand.name}</span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* Информация */}
                        <div className="footer-column">
                            <h3 className="footer-column-title">Информация</h3>
                            <ul className="footer-menu-list">
                                {footerInfoLinks.map((link) => (
                                    <li key={link.slug}>
                                        <Link href={link.slug} className="footer-menu-link">
                                            <FiChevronRight className="footer-link-icon" />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Контакты */}
                        <div className="footer-column">
                            <h3 className="footer-column-title">Контакты</h3>
                            <ul className="footer-contact-list">
                                <li className="footer-contact-item">
                                    <div className="footer-contact-icon-wrapper">
                                        <FiPhone className="footer-contact-icon" />
                                    </div>
                                    <div className="footer-contact-details">
                                        <span className="footer-contact-label">Телефоны:</span>
                                        <a href="tel:+998981102255" className="footer-contact-phone">+998 98 110 22 55</a>
                                        <a href="tel:+998915452255" className="footer-contact-phone">+998 91 545 22 55</a>
                                    </div>
                                </li>
                                <li className="footer-contact-item">
                                    <div className="footer-contact-icon-wrapper">
                                        <FiClock className="footer-contact-icon" />
                                    </div>
                                    <div className="footer-contact-details">
                                        <span className="footer-contact-label">Режим работы:</span>
                                        <span>09:00 - 20:00</span>
                                        <span>Ежедневно</span>
                                    </div>
                                </li>
                                <li className="footer-contact-item">
                                    <div className="footer-contact-icon-wrapper">
                                        <FiMapPin className="footer-contact-icon" />
                                    </div>
                                    <div className="footer-contact-details">
                                        <span className="footer-contact-label">Сайт:</span>
                                        <a href="https://santexmastergold.uz" target="_blank" rel="noopener noreferrer" className="footer-contact-link">
                                            santexmastergold.uz
                                        </a>
                                    </div>
                                </li>
                                <li className="footer-contact-item">
                                    <div className="footer-contact-icon-wrapper">
                                        <FiMail className="footer-contact-icon" />
                                    </div>
                                    <div className="footer-contact-details">
                                        <span className="footer-contact-label">Email:</span>
                                        <a href="mailto:info@santexmastergold.uz">info@santexmastergold.uz</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Нижний бар */}
            <div className="footer-bottom-bar">
                <div className="footer-container">
                    <div className="footer-bottom-content">
                        <div className="footer-copyright">
                            © {currentYear} Santex Master Gold. Все права защищены.
                        </div>
                        <div className="footer-payment-methods">
                            <span className="footer-payment-icon">Visa</span>
                            <span className="footer-payment-icon">UzCard</span>
                            <span className="footer-payment-icon">Humo</span>
                        </div>
                        <div className="footer-developer">
                            <FiCode className="footer-developer-icon" />
                            <span>Разработчик: </span>
                            <a
                                href="https://akbarsoft.uz"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-developer-link"
                            >
                                Akbar Soft
                            </a>
                        </div>
                        <button
                            className="footer-scroll-top"
                            onClick={scrollToTop}
                            aria-label="Наверх"
                        >
                            <FiArrowUp />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;