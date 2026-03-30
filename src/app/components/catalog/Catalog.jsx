'use client'
import React from 'react';
import Link from 'next/link';
import {
    FiArrowRight,
    FiBox,
    FiGrid,
    FiGlobe,
    FiPhone,
    FiPackage,
    FiTruck,
    FiShield
} from 'react-icons/fi';
import { FaTelegram, FaInstagram } from 'react-icons/fa';
import { brands, products } from '@/app/utils/data1';
import './catalog.css';

// Функция для создания слага из названия бренда
const createSlug = (name) => {
    return name
        .toLowerCase()
        .replace(/[&]/g, 'and')
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-');
};

// Маппинг иконок для брендов
const brandIcons = {
    'Трубы и фитинги': <FiBox />,
    'Сместители': <FiGlobe />,
    'Сантехника': <FiBox />,
    'Сантехника и вентиляция': <FiGrid />,
    'Бочки': <FiBox />,
    'Ванная и кухня, вода и насосы, отопление, электричество и генераторы': <FiGrid />,
    'default': <FiGrid />
};

// Функция для получения количества товаров бренда
const getProductCount = (brandName) => {
    return products.filter(product => product.brand === brandName).length;
};

// URL изображений для брендов из интернета (заглушки)
const getBrandImage = (brand) => {
    if (brand.image && !brand.image.includes('source.unsplash')) {
        return brand.image;
    }
    const defaultImages = {
        'Mercury plast': 'https://images.unsplash.com/photo-1581092335871-4a3c9b5db1c6?w=400&auto=format',
        'Zegor': 'https://images.unsplash.com/photo-1585123334904-845d60e97b29?w=400&auto=format',
        'DERYA PLASTIK & DERYA KERAMIKA': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format',
        'Hydro Plast': 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&auto=format',
        'Climaroom': 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400&auto=format',
        'Fayz Plast': 'https://images.unsplash.com/photo-1581092335871-4a3c9b5db1c6?w=400&auto=format',
        'AeMarket': 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400&auto=format'
    };
    return defaultImages[brand.name] || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format';
};

// Карточка бренда с фото (без memo)
const BrandCard = ({ brand }) => {
    const icon = brandIcons[brand.type] || brandIcons.default;
    const imageUrl = getBrandImage(brand);
    const productCount = getProductCount(brand.name);
    const slug = createSlug(brand.name);

    return (
        <Link href={`/catalog/${slug}`} className="brand-card">
            <div className="brand-card-image">
                <img src={imageUrl} alt={brand.name} loading="lazy" />
                <div className="brand-card-overlay">
                    <span className="brand-card-icon">{icon}</span>
                </div>
            </div>
            <div className="brand-card-content">
                <h3 className="brand-card-title">{brand.name}</h3>
                <p className="brand-card-type">{brand.type}</p>
                <p className="brand-card-count">{productCount} товаров</p>

                {brand.contacts && brand.contacts.length > 0 && (
                    <div className="brand-contacts-preview">
                        {brand.contacts[0].phone && (
                            <span className="brand-contact-phone">
                                <FiPhone size={12} /> {brand.contacts[0].phone}
                            </span>
                        )}
                    </div>
                )}

                <span className="brand-card-link">
                    Перейти
                    <FiArrowRight className="brand-card-arrow" />
                </span>
            </div>
        </Link>
    );
};

const CatalogPreview = () => {
    const totalProducts = products.length;
    const totalBrands = brands.length;
    const inStock = products.filter(p => p.inStock !== false).length;

    return (
        <section className="catalog-preview">
            <div className="container">
                <div className="section-header">
                    <div>
                        <span className="section-subtitle">Наши партнеры</span>
                        <h2 className="section-title">Ведущие бренды</h2>
                        <p className="section-description">
                            Прямые поставки от производителей. Только сертифицированная продукция.
                        </p>
                    </div>
                </div>

                <div className="brands-grid-premium">
                    {brands.map((brand) => (
                        <BrandCard key={brand.id} brand={brand} />
                    ))}
                </div>

                <div className="stats-section">
                    <div className="stats-grid">
                        <div className="stat-card">
                            <FiPackage className="stat-card-icon" />
                            <div className="stat-card-info">
                                <span className="stat-card-number">{totalProducts}+</span>
                                <span className="stat-card-label">Товаров в наличии</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <FiGlobe className="stat-card-icon" />
                            <div className="stat-card-info">
                                <span className="stat-card-number">{totalBrands}+</span>
                                <span className="stat-card-label">Брендов</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <FiTruck className="stat-card-icon" />
                            <div className="stat-card-info">
                                <span className="stat-card-number">По всему Узбекистану</span>
                                <span className="stat-card-label">Доставка оптом</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <FiShield className="stat-card-icon" />
                            <div className="stat-card-info">
                                <span className="stat-card-number">100%</span>
                                <span className="stat-card-label">Сертифицировано</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="catalog-button-wrapper">
                    <Link href="/catalog" className="catalog-main-btn">
                        <span>Смотреть все бренды</span>
                        <FiArrowRight className="btn-icon" />
                    </Link>
                </div>

                <div className="premium-banner">
                    <div className="banner-content">
                        <div className="banner-badge">Оптовый склад</div>
                        <h3>Santex Master Gold</h3>
                        <p>
                            Крупнейший поставщик сантехники в Самарканде.
                            Работаем с юридическими и физическими лицами.
                            Индивидуальные условия для постоянных клиентов.
                        </p>
                        <div className="banner-contacts">
                            <a href="tel:+998981102255" className="banner-phone">
                                <FiPhone /> +998 98 110 22 55
                            </a>
                            <a href="tel:+998915452255" className="banner-phone">
                                <FiPhone /> +998 91 545 22 55
                            </a>
                        </div>
                        <div className="banner-social">
                            <a href="https://t.me/shavkat_sharipov_86" target="_blank" rel="noopener noreferrer" className="banner-social-link">
                                <FaTelegram /> Telegram
                            </a>
                            <a href="https://www.instagram.com/master_gold_plumbing" target="_blank" rel="noopener noreferrer" className="banner-social-link">
                                <FaInstagram /> Instagram
                            </a>
                        </div>
                        <Link href="/catalog" className="banner-btn">
                            Перейти в каталог
                            <FiArrowRight />
                        </Link>
                    </div>
                    <div className="banner-stats">
                        <div className="stat-item">
                            <span className="stat-number">7+</span>
                            <span className="stat-label">брендов</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">{totalProducts}+</span>
                            <span className="stat-label">товаров</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">{inStock}+</span>
                            <span className="stat-label">в наличии</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">24/7</span>
                            <span className="stat-label">поддержка</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CatalogPreview;