'use client'
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight, FiAward, FiShield, FiTruck, FiPackage, FiGlobe } from 'react-icons/fi';
import './header.css';

// Функция для создания слага из названия бренда
const createSlug = (name) => {
    return name
        .toLowerCase()
        .replace(/[&]/g, 'and')
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-');
};

const Header = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const slides = [
        {
            id: 1,
            title: 'Оптовая сантехника',
            subtitle: 'Ведущие бренды',
            description: 'Mercury plast, Zegor, Hydro Plast, Climaroom, Fayz Plast, AeMarket. Прямые поставки от производителей. Лучшие цены на рынке.',
            image: '/images/header/1.png',
            link: '/catalog',
            badge: 'Оптовые цены'
        },
        {
            id: 2,
            title: 'Mercury plast',
            subtitle: 'Трубы и фитинги',
            description: 'Качественные системы водоснабжения и отопления. Надежность, проверенная временем. Полный ассортимент в наличии.',
            image: '/images/header/2.png',
            link: '/catalog/mercury-plast',
            badge: 'Официальный дистрибьютор'
        },
        {
            id: 3,
            title: 'Zegor',
            subtitle: 'Смесители премиум',
            description: 'Современные смесители для кухни и ванной. Немецкое качество, стильный дизайн, долговечность. Идеально для вашего проекта.',
            image: '/images/header/3.png',
            link: '/catalog/zegor',
            badge: 'Германское качество'
        },
        {
            id: 4,
            title: 'Hydro Plast',
            subtitle: 'Профессиональные системы',
            description: 'Трубы и фитинги для любых задач. Промышленное и бытовое использование. Сертифицированная продукция.',
            image: '/images/header/4.png',
            link: '/catalog/hydro-plast',
            badge: 'Профессионально'
        },
        {
            id: 5,
            title: 'AeMarket',
            subtitle: 'Всё для дома',
            description: 'Бойлеры, насосы, генераторы, солнечные панели. Широкий ассортимент для дома и бизнеса. Гарантия качества.',
            image: '/images/header/5.png',
            link: '/catalog/aemarket',
            badge: 'Хит продаж'
        }
    ];

    const nextSlide = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        setTimeout(() => setIsAnimating(false), 800);
    }, [slides.length, isAnimating]);

    const prevSlide = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
        setTimeout(() => setIsAnimating(false), 800);
    }, [slides.length, isAnimating]);

    const goToSlide = useCallback((index) => {
        if (isAnimating || index === currentSlide) return;
        setIsAnimating(true);
        setCurrentSlide(index);
        setTimeout(() => setIsAnimating(false), 800);
    }, [currentSlide, isAnimating]);

    // Автоматическая смена слайдов
    useEffect(() => {
        const timer = setInterval(() => {
            if (!isAnimating) {
                nextSlide();
            }
        }, 6000);
        return () => clearInterval(timer);
    }, [nextSlide, isAnimating]);

    // Обработка свайпов для мобильных
    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 100) {
            nextSlide();
        }
        if (touchStart - touchEnd < -100) {
            prevSlide();
        }
    };

    return (
        <header className="header">
            {/* Карусель */}
            <div
                className="carousel"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                        style={{ zIndex: index === currentSlide ? 2 : 1 }}
                    >
                        {/* Фоновое изображение с параллакс эффектом */}
                        <div
                            className="slide-background"
                            style={{
                                backgroundImage: `url(${slide.image})`,
                                transform: index === currentSlide ? 'scale(1.1)' : 'scale(1)'
                            }}
                        >
                            <div className="overlay"></div>
                        </div>

                        <div className="container">
                            <div className="slide-content">
                                <div className="slide-info">
                                    {slide.badge && (
                                        <span className="slide-badge">{slide.badge}</span>
                                    )}
                                    <span className="slide-subtitle">{slide.subtitle}</span>
                                    <h1 className="slide-title">{slide.title}</h1>
                                    <p className="slide-description">{slide.description}</p>
                                    <div className="slide-actions">
                                        <Link
                                            href={slide.link}
                                            className="btn btn-primary"
                                            tabIndex={index === currentSlide ? 0 : -1}
                                        >
                                            Подробнее
                                        </Link>
                                        <Link
                                            href="/catalog"
                                            className="btn btn-outline"
                                            tabIndex={index === currentSlide ? 0 : -1}
                                        >
                                            Все бренды
                                        </Link>
                                    </div>
                                </div>
                                <div className="slide-image">
                                    <div className="image-wrapper">
                                        <img
                                            src={slide.image}
                                            alt={slide.title}
                                            loading={index === 0 ? 'eager' : 'lazy'}
                                        />
                                        <div className="image-overlay"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Навигация карусели */}
                <button
                    className="carousel-nav carousel-prev"
                    onClick={prevSlide}
                    aria-label="Предыдущий слайд"
                    disabled={isAnimating}
                >
                    <FiChevronLeft />
                </button>
                <button
                    className="carousel-nav carousel-next"
                    onClick={nextSlide}
                    aria-label="Следующий слайд"
                    disabled={isAnimating}
                >
                    <FiChevronRight />
                </button>

                {/* Индикаторы */}
                <div className="carousel-dots">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Перейти к слайду ${index + 1}`}
                            disabled={isAnimating}
                        />
                    ))}
                </div>
            </div>

            {/* Преимущества */}
            <div className="benefits">
                <div className="container">
                    <div className="benefits-grid">
                        <div className="benefit-item">
                            <div className="benefit-icon">
                                <FiPackage />
                            </div>
                            <div className="benefit-info">
                                <h3>Прямые поставки</h3>
                                <p>От производителей</p>
                            </div>
                        </div>
                        <div className="benefit-item">
                            <div className="benefit-icon">
                                <FiTruck />
                            </div>
                            <div className="benefit-info">
                                <h3>Доставка по Узбекистану</h3>
                                <p>Оптовым клиентам</p>
                            </div>
                        </div>
                        <div className="benefit-item">
                            <div className="benefit-icon">
                                <FiAward />
                            </div>
                            <div className="benefit-info">
                                <h3>Гарантия качества</h3>
                                <p>Сертифицированные бренды</p>
                            </div>
                        </div>
                        <div className="benefit-item">
                            <div className="benefit-icon">
                                <FiGlobe />
                            </div>
                            <div className="benefit-info">
                                <h3>7+ брендов</h3>
                                <p>В ассортименте</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;