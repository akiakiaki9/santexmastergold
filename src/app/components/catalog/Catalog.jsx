'use client'
import React, { memo } from 'react';
import Link from 'next/link';
import {
    FiArrowRight,
    FiBox,
    FiGrid,
    FiGlobe,
    FiPhone,
} from 'react-icons/fi';
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

// URL изображений для брендов (если нет в данных, можно добавить fallback)
const getBrandImage = (brand) => {
    if (brand.image) return brand.image;
    return '/images/brands/default.png';
};

// Карточка бренда с фото
const BrandCard = memo(({ brand }) => {
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

                {/* Контакты бренда (опционально) */}
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
});

BrandCard.displayName = 'BrandCard';

const CatalogPreview = () => {
    return (
        <section className="catalog-preview">
            <div className="container">
                <div className="section-header">
                    <div>
                        <span className="section-subtitle">Бренды</span>
                        <h2 className="section-title">Выберите бренд</h2>
                    </div>
                </div>

                {/* Сетка брендов с фото */}
                <div className="brands-grid-premium">
                    {brands.map((brand) => (
                        <BrandCard key={brand.id} brand={brand} />
                    ))}
                </div>

                {/* Общая кнопка каталога */}
                <div className="catalog-button-wrapper">
                    <Link href="/catalog" className="catalog-main-btn" prefetch={false}>
                        <span>Перейти в полный каталог</span>
                        <FiArrowRight className="btn-icon" />
                    </Link>
                </div>

                {/* Баннер */}
                <div className="premium-banner">
                    <div className="banner-content">
                        <h3>Премиум сантехника для вашего дома</h3>
                        <p>Итальянские, немецкие и японские бренды. 17 лет на рынке Ташкента.</p>
                        <Link href="/catalog" className="banner-btn" prefetch={false}>
                            Перейти в каталог
                            <FiArrowRight />
                        </Link>
                    </div>
                    <div className="banner-stats">
                        <div className="stat-item">
                            <span className="stat-number">17+</span>
                            <span className="stat-label">лет на рынке</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">5000+</span>
                            <span className="stat-label">довольных клиентов</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">{brands.length}+</span>
                            <span className="stat-label">брендов</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default memo(CatalogPreview);