'use client'
import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
    FiGrid,
    FiList,
    FiBox,
    FiGlobe,
    FiX,
    FiChevronRight,
    FiSearch,
    FiExternalLink,
    FiInstagram,
    FiFacebook,
    FiYoutube,
    FiChevronDown,
    FiShield,
    FiTruck,
    FiStar,
    FiPackage
} from 'react-icons/fi';
import { FaTelegram, FaWhatsapp } from 'react-icons/fa';
import Navbar from '@/app/components/navbar/Navbar';
import Footer from '@/app/components/footer/Footer';
import { brands, products } from '@/app/utils/data1';
import './catalog.css';

// Функция для создания слага из названия бренда
const createSlug = (name) => {
    if (!name) return '';
    return name
        .toLowerCase()
        .replace(/[&]/g, 'and')
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
};

// Функция для получения бренда по slug
const getBrandBySlug = (slug) => {
    if (!slug) return null;
    return brands.find(brand => createSlug(brand.name) === slug);
};

// Социальные сети иконки
const socialIcons = {
    'website': <FiGlobe />,
    'instagram': <FiInstagram />,
    'telegram': <FaTelegram />,
    'facebook': <FiFacebook />,
    'youtube': <FiYoutube />,
    'whatsapp': <FaWhatsapp />
};

// Названия соцсетей на русском
const socialNames = {
    'website': 'Сайт',
    'instagram': 'Instagram',
    'telegram': 'Telegram',
    'facebook': 'Facebook',
    'youtube': 'YouTube',
    'whatsapp': 'WhatsApp'
};

// Описания для брендов
const brandDescriptions = {
    'Mercury plast': 'Качественные трубы и фитинги для водоснабжения и отопления. Надежность и долговечность.',
    'Zegor': 'Современные смесители для кухни и ванной. Немецкое качество по доступным ценам.',
    'DERYA PLASTIK & DERYA KERAMIKA': 'Премиальная сантехника для вашего дома. Керамика высшего качества.',
    'Hydro Plast': 'Профессиональные системы трубопроводов для любых задач.',
    'Climaroom': 'Климатическое оборудование и вентиляция для комфортного микроклимата.',
    'Fayz Plast': 'Качественные пластиковые бочки и емкости для хранения воды.',
    'AeMarket': 'Широкий ассортимент товаров для дома: отопление, насосы, электрика и генераторы.'
};

// Компонент карточки товара (без корзины, с внешними ссылками)
const ProductCard = ({ product }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const hasExternalUrl = product.url && product.url.startsWith('http');

    const content = (
        <>
            <div className="product-image-large">
                {!imageLoaded && !imageError && <div className="image-skeleton" />}
                {imageError ? (
                    <div className="image-error">
                        <FiBox size={48} />
                    </div>
                ) : (
                    <img
                        src={product.image}
                        alt={product.name}
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageError(true)}
                        className={`product-img-large ${imageLoaded ? 'loaded' : 'loading'}`}
                    />
                )}
                {!product.inStock && <span className="product-badge-out">Под заказ</span>}
                {hasExternalUrl && (
                    <span className="product-badge-external">
                        <FiExternalLink /> На сайт
                    </span>
                )}
            </div>
            <div className="product-info-large">
                <h3 className="product-name-large">{product.name}</h3>
                {product.category && (
                    <p className="product-category-large">{product.category}</p>
                )}
                {hasExternalUrl && (
                    <p className="product-external-note">
                        <FiExternalLink /> Перейти на сайт поставщика
                    </p>
                )}
            </div>
        </>
    );

    if (hasExternalUrl) {
        return (
            <div className="product-card-large">
                <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="product-card-link"
                >
                    {content}
                </a>
            </div>
        );
    }

    return (
        <div className="product-card-large no-link">
            <div className="product-card-link-static">
                {content}
            </div>
        </div>
    );
};

// Компонент карточки бренда
const BrandCard = ({ brand, isActive, onClick }) => {
    return (
        <div
            className={`brand-card ${isActive ? 'active' : ''}`}
            onClick={() => onClick(brand)}
        >
            {brand.image && (
                <div className="brand-card-image">
                    <img src={brand.image} alt={brand.name} />
                </div>
            )}
            <div className="brand-card-info">
                <h3 className="brand-card-name">{brand.name}</h3>
                <p className="brand-card-type">{brand.type}</p>
            </div>
            {isActive && (
                <div className="brand-card-active">
                    <FiX />
                </div>
            )}
        </div>
    );
};

// Компонент виджета соцсетей
const BrandSocialWidget = ({ brandInfo }) => {
    if (!brandInfo?.social_links || brandInfo.social_links.length === 0) return null;

    return (
        <div className="brand-social-widget">
            <div className="brand-social-widget-header">
                <FiPackage className="widget-icon" />
                <h4>Больше информации в соцсетях</h4>
            </div>
            <p className="brand-social-widget-text">
                Подписывайтесь на {brandInfo.name}, чтобы следить за новинками, акциями и получать подробную информацию о товарах
            </p>
            <div className="brand-social-widget-links">
                {brandInfo.social_links.map((link, index) => (
                    <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-widget-link"
                    >
                        {socialIcons[link.type] || <FiGlobe />}
                        <span>{socialNames[link.type] || link.type}</span>
                        <FiExternalLink className="external-icon" />
                    </a>
                ))}
            </div>
        </div>
    );
};

export default function CatalogPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const brandSlug = searchParams.get('brand');

    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [showBrandsList, setShowBrandsList] = useState(true);
    const [categoriesOpen, setCategoriesOpen] = useState(true);

    // Получаем выбранный бренд из URL (без useMemo)
    const selectedBrand = !brandSlug ? null : getBrandBySlug(brandSlug);

    // Получаем все категории из товаров (без useMemo)
    const allCategories = (() => {
        const categories = new Set();
        products.forEach(product => {
            if (product.category) categories.add(product.category);
        });
        return ['all', ...Array.from(categories).sort()];
    })();

    // Фильтруем товары по бренду, категории и поиску (без useMemo)
    const filteredProducts = (() => {
        let filtered = products;

        if (selectedBrand) {
            filtered = filtered.filter(p => p.brand === selectedBrand.name);
        }
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(p =>
                p.name?.toLowerCase().includes(query) ||
                p.category?.toLowerCase().includes(query) ||
                p.brand?.toLowerCase().includes(query)
            );
        }
        return filtered;
    })();

    // Статистика по категориям (без useMemo)
    const categoryStats = (() => {
        const stats = {};
        const sourceProducts = selectedBrand ? products.filter(p => p.brand === selectedBrand.name) : products;
        sourceProducts.forEach(p => {
            if (p.category) {
                stats[p.category] = (stats[p.category] || 0) + 1;
            }
        });
        return stats;
    })();

    // Функция для выбора бренда
    const handleBrandSelect = useCallback((brand) => {
        const params = new URLSearchParams(searchParams);
        if (brand) {
            params.set('brand', createSlug(brand.name));
        } else {
            params.delete('brand');
        }
        router.push(`/catalog?${params.toString()}`);
        setSelectedCategory('all');
    }, [router, searchParams]);

    // Функция для очистки фильтров
    const clearFilters = useCallback(() => {
        setSelectedCategory('all');
        setSearchQuery('');
        handleBrandSelect(null);
    }, [handleBrandSelect]);

    useEffect(() => {
        if (showMobileFilters) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showMobileFilters]);

    return (
        <>
            <Navbar />

            <main className="catalog-page">
                <div className="container">
                    {/* Хлебные крошки */}
                    <div className="breadcrumbs">
                        <Link href="/">Главная</Link>
                        <FiChevronRight />
                        <span>Каталог</span>
                        {selectedBrand && (
                            <>
                                <FiChevronRight />
                                <span className="breadcrumb-brand">{selectedBrand.name}</span>
                            </>
                        )}
                    </div>

                    {/* Заголовок страницы */}
                    <div className="catalog-header">
                        <h1 className="catalog-title">
                            {selectedBrand ? `Товары ${selectedBrand.name}` : 'Каталог товаров'}
                        </h1>
                        {selectedBrand && (
                            <button onClick={clearFilters} className="clear-brand-btn">
                                <FiX />
                                Очистить бренд
                            </button>
                        )}
                    </div>

                    {/* Секция брендов */}
                    <div className="brands-section">
                        <div className="brands-header">
                            <h2 className="brands-title">Бренды</h2>
                            <button
                                className="toggle-brands-btn"
                                onClick={() => setShowBrandsList(!showBrandsList)}
                            >
                                {showBrandsList ? 'Скрыть' : 'Показать все'}
                            </button>
                        </div>

                        {showBrandsList && (
                            <div className="brands-grid">
                                {brands.map(brand => {
                                    const isActive = selectedBrand?.id === brand.id;
                                    return (
                                        <BrandCard
                                            key={brand.id}
                                            brand={brand}
                                            isActive={isActive}
                                            onClick={handleBrandSelect}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Основной лейаут */}
                    <div className="catalog-main-layout">
                        {/* Левая колонка - категории */}
                        <aside className="catalog-sidebar">
                            <div className="categories-widget">
                                <div
                                    className="categories-header"
                                    onClick={() => setCategoriesOpen(!categoriesOpen)}
                                >
                                    <h3>Категории товаров</h3>
                                    <FiChevronDown className={`categories-toggle ${categoriesOpen ? 'open' : ''}`} />
                                </div>
                                {categoriesOpen && (
                                    <ul className="categories-list">
                                        {allCategories.map(cat => (
                                            <li key={cat}>
                                                <button
                                                    className={`category-link ${selectedCategory === cat ? 'active' : ''}`}
                                                    onClick={() => setSelectedCategory(cat)}
                                                >
                                                    {cat === 'all' ? 'Все товары' : cat}
                                                    {cat !== 'all' && selectedBrand && (
                                                        <span className="category-count">{categoryStats[cat] || 0}</span>
                                                    )}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Информация о выбранном бренде */}
                            {selectedBrand && (
                                <>
                                    <div className="brand-sidebar-info">
                                        <h4>О бренде</h4>
                                        <p>{brandDescriptions[selectedBrand.name] || `${selectedBrand.name} - ${selectedBrand.type}`}</p>
                                        <div className="brand-features">
                                            <div className="brand-feature">
                                                <FiShield />
                                                <span>Официальная гарантия</span>
                                            </div>
                                            <div className="brand-feature">
                                                <FiTruck />
                                                <span>Прямые поставки</span>
                                            </div>
                                            <div className="brand-feature">
                                                <FiStar />
                                                <span>Сертифицировано</span>
                                            </div>
                                        </div>
                                    </div>

                                    <BrandSocialWidget brandInfo={selectedBrand} />
                                </>
                            )}
                        </aside>

                        {/* Правая колонка - товары */}
                        <div className="catalog-products-area">
                            {/* Панель инструментов */}
                            <div className="products-toolbar">
                                <div className="results-count">
                                    <FiPackage className="results-icon" />
                                    <span>Найдено <strong>{filteredProducts.length}</strong> товаров</span>
                                    {(selectedCategory !== 'all' || searchQuery) && (
                                        <button className="clear-category" onClick={clearFilters}>
                                            <FiX /> Сбросить фильтры
                                        </button>
                                    )}
                                </div>
                                <div className="view-toggle">
                                    <button
                                        className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                        onClick={() => setViewMode('grid')}
                                    >
                                        <FiGrid />
                                    </button>
                                    <button
                                        className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                                        onClick={() => setViewMode('list')}
                                    >
                                        <FiList />
                                    </button>
                                </div>
                            </div>

                            {/* Поиск */}
                            <div className="search-box">
                                <FiSearch className="search-icon" />
                                <input
                                    type="text"
                                    placeholder="Поиск товаров..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button className="clear-search" onClick={() => setSearchQuery('')}>
                                        <FiX />
                                    </button>
                                )}
                            </div>

                            {/* Товары */}
                            {filteredProducts.length === 0 ? (
                                <div className="no-products">
                                    <FiBox size={64} />
                                    <h3>Нет товаров в этой категории</h3>
                                    <p>Попробуйте изменить параметры фильтрации</p>
                                    <button onClick={clearFilters} className="reset-filters-btn">
                                        Сбросить все фильтры
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className={`products-${viewMode === 'grid' ? 'grid-large' : 'list-large'}`}>
                                        {filteredProducts.map(product => (
                                            <ProductCard key={product.id} product={product} />
                                        ))}
                                    </div>

                                    {/* Виджет соцсетей под товарами (для мобильных) */}
                                    {selectedBrand && (
                                        <div className="brand-social-widget-mobile">
                                            <BrandSocialWidget brandInfo={selectedBrand} />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Мобильные фильтры */}
            {showMobileFilters && (
                <div className="mobile-filters-overlay" onClick={() => setShowMobileFilters(false)}>
                    <div className="mobile-filters-panel" onClick={e => e.stopPropagation()}>
                        <div className="mobile-filters-header">
                            <h3>Категории</h3>
                            <button onClick={() => setShowMobileFilters(false)}>
                                <FiX />
                            </button>
                        </div>
                        <div className="mobile-filters-content">
                            {allCategories.map(cat => (
                                <button
                                    key={cat}
                                    className={`mobile-category-item ${selectedCategory === cat ? 'active' : ''}`}
                                    onClick={() => {
                                        setSelectedCategory(cat);
                                        setShowMobileFilters(false);
                                    }}
                                >
                                    {cat === 'all' ? 'Все товары' : cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}