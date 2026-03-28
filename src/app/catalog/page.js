'use client'
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
    FiGrid,
    FiList,
    FiBox,
    FiShoppingCart,
    FiGlobe,
    FiPhone,
    FiMail,
    FiFilter,
    FiX,
    FiChevronRight,
    FiSearch,
    FiStar,
    FiTruck,
    FiShield
} from 'react-icons/fi';
import { FaTelegram, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { useCart } from '@/app/context/CartContext';
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

// Иконки для социальных сетей
const socialIcons = {
    'website': <FiGlobe />,
    'instagram': <FaInstagram />,
    'telegram': <FaTelegram />,
    'facebook': <FiGlobe />,
    'whatsapp': <FaWhatsapp />
};

// Компонент карточки товара
const ProductCard = ({ product, onAddToCart }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
        <div className="product-card">
            <Link href={`/product/${product.id}`} className="product-card-link">
                <div className="product-image-container">
                    {!imageLoaded && !imageError && <div className="image-skeleton" />}
                    {imageError ? (
                        <div className="image-error">
                            <FiBox size={32} />
                        </div>
                    ) : (
                        <img
                            src={product.image}
                            alt={product.name}
                            onLoad={() => setImageLoaded(true)}
                            onError={() => setImageError(true)}
                            className={`product-img ${imageLoaded ? 'loaded' : 'loading'}`}
                        />
                    )}
                    {product.oldPrice && <span className="product-badge sale">SALE</span>}
                    {!product.inStock && <span className="product-badge out">Под заказ</span>}
                </div>
                <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-category">{product.category}</p>
                    <p className="product-brand">{product.brand}</p>
                </div>
            </Link>
            <button
                className="add-to-cart-btn"
                onClick={(e) => onAddToCart(e, product)}
                disabled={!product.inStock}
            >
                <FiShoppingCart />
                В корзину
            </button>
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

export default function CatalogPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const brandSlug = searchParams.get('brand');
    const { addToCart } = useCart();

    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [showBrandsList, setShowBrandsList] = useState(true);

    // Получаем выбранный бренд из URL
    const selectedBrand = useMemo(() => {
        if (!brandSlug) return null;
        return getBrandBySlug(brandSlug);
    }, [brandSlug]);

    // Получаем все категории из товаров
    const allCategories = useMemo(() => {
        const categories = new Set();
        products.forEach(product => {
            if (product.category) categories.add(product.category);
        });
        return ['all', ...Array.from(categories).sort()];
    }, []);

    // Фильтруем товары по бренду, категории и поиску
    const filteredProducts = useMemo(() => {
        let filtered = products;

        // Фильтр по бренду
        if (selectedBrand) {
            filtered = filtered.filter(p => p.brand === selectedBrand.name);
        }

        // Фильтр по категории
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        // Фильтр по поиску
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query) ||
                p.brand.toLowerCase().includes(query)
            );
        }

        return filtered;
    }, [selectedBrand, selectedCategory, searchQuery]);

    // Получаем статистику по товарам
    const stats = useMemo(() => {
        const totalProducts = filteredProducts.length;
        const inStock = filteredProducts.filter(p => p.inStock !== false).length;
        return { totalProducts, inStock };
    }, [filteredProducts]);

    // Функция для выбора бренда
    const handleBrandSelect = useCallback((brand) => {
        const params = new URLSearchParams(searchParams);
        if (brand) {
            params.set('brand', createSlug(brand.name));
        } else {
            params.delete('brand');
        }
        router.push(`/catalog?${params.toString()}`);
    }, [router, searchParams]);

    // Функция для очистки фильтров
    const clearFilters = useCallback(() => {
        setSelectedCategory('all');
        setSearchQuery('');
        handleBrandSelect(null);
    }, [handleBrandSelect]);

    // Функция добавления в корзину
    const handleAddToCart = useCallback((e, product) => {
        e.preventDefault();
        e.stopPropagation();
        if (!product.inStock) return;
        addToCart(product);

        const btn = e.currentTarget;
        btn.classList.add('clicked');
        setTimeout(() => btn.classList.remove('clicked'), 200);
    }, [addToCart]);

    // Блокировка скролла при открытых мобильных фильтрах
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

                    {/* Фильтры и поиск */}
                    <div className="filters-section">
                        <div className="filters-header">
                            <button
                                className="mobile-filter-btn"
                                onClick={() => setShowMobileFilters(true)}
                            >
                                <FiFilter />
                                Фильтры
                                {(selectedCategory !== 'all' || searchQuery) && (
                                    <span className="filter-count">1</span>
                                )}
                            </button>

                            <div className="search-box">
                                <FiSearch className="search-icon" />
                                <input
                                    type="text"
                                    placeholder="Поиск товаров..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button
                                        className="clear-search"
                                        onClick={() => setSearchQuery('')}
                                    >
                                        <FiX />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Десктопные фильтры по категориям */}
                        <div className="category-filters desktop-only">
                            {allCategories.map(cat => (
                                <button
                                    key={cat}
                                    className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(cat)}
                                >
                                    {cat === 'all' ? 'Все товары' : cat}
                                    {cat !== 'all' && (
                                        <span className="category-count">
                                            {products.filter(p => p.category === cat).length}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Результаты */}
                    <div className="results-section">
                        <div className="results-toolbar">
                            <div className="results-info">
                                <strong>{stats.totalProducts}</strong> товаров найдено
                                {selectedBrand && (
                                    <span className="filter-badge">
                                        Бренд: {selectedBrand.name}
                                        <button onClick={() => handleBrandSelect(null)}>
                                            <FiX />
                                        </button>
                                    </span>
                                )}
                                {selectedCategory !== 'all' && (
                                    <span className="filter-badge">
                                        Категория: {selectedCategory}
                                        <button onClick={() => setSelectedCategory('all')}>
                                            <FiX />
                                        </button>
                                    </span>
                                )}
                                {searchQuery && (
                                    <span className="filter-badge">
                                        Поиск: {searchQuery}
                                        <button onClick={() => setSearchQuery('')}>
                                            <FiX />
                                        </button>
                                    </span>
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

                        {filteredProducts.length === 0 ? (
                            <div className="no-results">
                                <FiBox size={48} />
                                <h3>Товары не найдены</h3>
                                <p>Попробуйте изменить параметры фильтрации</p>
                                <button onClick={clearFilters} className="reset-filters-btn">
                                    Сбросить все фильтры
                                </button>
                            </div>
                        ) : (
                            <div className={`products-${viewMode}`}>
                                {filteredProducts.map(product => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onAddToCart={handleAddToCart}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Информация о выбранном бренде */}
                    {selectedBrand && (
                        <div className="brand-info-section">
                            <div className="brand-info-card">
                                <h3>О бренде {selectedBrand.name}</h3>
                                <p>{brandDescriptions[selectedBrand.name] || `${selectedBrand.name} - ${selectedBrand.type}`}</p>

                                {selectedBrand.contacts && selectedBrand.contacts.length > 0 && (
                                    <div className="brand-contacts">
                                        {selectedBrand.contacts[0].phone && (
                                            <a href={`tel:${selectedBrand.contacts[0].phone}`}>
                                                <FiPhone /> {selectedBrand.contacts[0].phone}
                                            </a>
                                        )}
                                        {selectedBrand.contacts[0].email && (
                                            <a href={`mailto:${selectedBrand.contacts[0].email}`}>
                                                <FiMail /> {selectedBrand.contacts[0].email}
                                            </a>
                                        )}
                                    </div>
                                )}

                                {selectedBrand.social_links && selectedBrand.social_links.length > 0 && (
                                    <div className="brand-social">
                                        {selectedBrand.social_links.map((link, i) => (
                                            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer">
                                                {socialIcons[link.type] || <FiGlobe />}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Мобильные фильтры */}
            {showMobileFilters && (
                <div className="mobile-filters-overlay" onClick={() => setShowMobileFilters(false)}>
                    <div className="mobile-filters-panel" onClick={e => e.stopPropagation()}>
                        <div className="mobile-filters-header">
                            <h3>Фильтры</h3>
                            <button onClick={() => setShowMobileFilters(false)}>
                                <FiX />
                            </button>
                        </div>
                        <div className="mobile-filters-content">
                            <div className="mobile-filter-group">
                                <h4>Категории</h4>
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
                </div>
            )}

            <Footer />
        </>
    );
}

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