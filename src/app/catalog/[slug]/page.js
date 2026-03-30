'use client'
import React, { useState, useMemo, memo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
    FiArrowLeft,
    FiChevronRight,
    FiBox,
    FiGlobe,
    FiPhone,
    FiMail,
    FiExternalLink,
    FiInstagram,
    FiFacebook,
    FiYoutube,
    FiPackage,
    FiGrid,
    FiList,
    FiChevronDown,
    FiShield,
    FiTruck,
    FiStar,
    FiMessageCircle
} from 'react-icons/fi';
import { FaTelegram, FaWhatsapp } from 'react-icons/fa';
import Navbar from '@/app/components/navbar/Navbar';
import Footer from '@/app/components/footer/Footer';
import { brands, products } from '@/app/utils/data1';
import './brand.css';

// Функция для создания слага из названия бренда
const createSlug = (name) => {
    return name
        .toLowerCase()
        .replace(/[&]/g, 'and')
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-');
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
    'Mercury plast': 'Ведущий производитель труб и фитингов для систем водоснабжения и отопления. Инновационные решения для строительства и ремонта.',
    'Zegor': 'Современные смесители для кухни и ванной. Сочетание немецкого качества и стильного дизайна.',
    'DERYA PLASTIK & DERYA KERAMIKA': 'Премиальная сантехника и керамика для ванных комнат. Высокое качество и долговечность.',
    'Hydro Plast': 'Профессиональные системы трубопроводов для промышленного и бытового использования.',
    'Climaroom': 'Климатическое оборудование и системы вентиляции для создания комфортного микроклимата.',
    'Fayz Plast': 'Качественные пластиковые бочки и емкости для хранения воды и других жидкостей.',
    'AeMarket': 'Широкий ассортимент товаров для дома: отопление, насосы, электрика, генераторы, солнечные панели.'
};

// Компонент карточки товара (только внешние ссылки)
const ProductCard = memo(({ product }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Проверяем наличие внешней ссылки
    const hasExternalUrl = product.url && product.url.startsWith('http');

    // Если нет внешней ссылки, карточка не кликабельна
    if (!hasExternalUrl) {
        return (
            <div className="product-card-large no-link">
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
                </div>
                <div className="product-info-large">
                    <h3 className="product-name-large">{product.name}</h3>
                    {product.category && (
                        <p className="product-category-large">{product.category}</p>
                    )}
                </div>
            </div>
        );
    }

    // Если есть внешняя ссылка - кликабельная карточка
    return (
        <div className="product-card-large">
            <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="product-card-link"
            >
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
                    <span className="product-badge-external">
                        <FiExternalLink /> На сайт
                    </span>
                </div>
                <div className="product-info-large">
                    <h3 className="product-name-large">{product.name}</h3>
                    {product.category && (
                        <p className="product-category-large">{product.category}</p>
                    )}
                    <p className="product-external-note">
                        <FiExternalLink /> Перейти на сайт поставщика
                    </p>
                </div>
            </a>
        </div>
    );
});

ProductCard.displayName = 'ProductCard';

// Компонент социальных сетей бренда (для отображения под карточками)
const BrandSocialWidget = memo(({ brandInfo }) => {
    if (!brandInfo.social_links || brandInfo.social_links.length === 0) return null;

    return (
        <div className="brand-social-widget">
            <div className="brand-social-widget-header">
                <FiMessageCircle className="widget-icon" />
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
});

BrandSocialWidget.displayName = 'BrandSocialWidget';

export default function BrandPage() {
    const params = useParams();
    const slug = params.slug;
    const [viewMode, setViewMode] = useState('grid');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [categoriesOpen, setCategoriesOpen] = useState(true);

    // Получаем информацию о бренде по slug
    const brandInfo = useMemo(() => {
        const brandMap = {};
        brands.forEach(brand => {
            const brandSlug = createSlug(brand.name);
            brandMap[brandSlug] = brand;
        });
        return brandMap[slug] || null;
    }, [slug]);

    // Получаем товары бренда
    const brandProducts = useMemo(() => {
        if (!brandInfo) return [];
        return products.filter(p => p.brand === brandInfo.name);
    }, [brandInfo]);

    // Получаем категории товаров (уникальные)
    const categories = useMemo(() => {
        const cats = new Set();
        brandProducts.forEach(product => {
            if (product.category) cats.add(product.category);
        });
        return ['all', ...Array.from(cats).sort()];
    }, [brandProducts]);

    // Фильтруем товары по категории
    const filteredProducts = useMemo(() => {
        if (selectedCategory === 'all') return brandProducts;
        return brandProducts.filter(p => p.category === selectedCategory);
    }, [brandProducts, selectedCategory]);

    // Получаем статистику по категориям
    const categoryStats = useMemo(() => {
        const stats = {};
        brandProducts.forEach(p => {
            if (p.category) {
                stats[p.category] = (stats[p.category] || 0) + 1;
            }
        });
        return stats;
    }, [brandProducts]);

    if (!brandInfo) {
        return (
            <>
                <Navbar />
                <main className="brand-page">
                    <div className="container">
                        <div className="brand-not-found">
                            <h1>Бренд не найден</h1>
                            <p>Извините, запрошенный бренд не существует</p>
                            <Link href="/catalog" className="btn btn-primary">
                                <FiArrowLeft />
                                Вернуться в каталог
                            </Link>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className="brand-page">
                {/* Баннер бренда - акцент на бренде */}
                <div className="brand-hero">
                    <div className="brand-hero-bg">
                        <div className="brand-hero-overlay"></div>
                    </div>
                    <div className="container">
                        <div className="brand-hero-content">
                            <div className="brand-logo-wrapper">
                                {brandInfo.image && (
                                    <div className="brand-logo-hero">
                                        <img src={brandInfo.image} alt={brandInfo.name} />
                                    </div>
                                )}
                                <div className="brand-icon-hero">
                                    <FiBox size={32} />
                                </div>
                            </div>
                            <div className="brand-info-hero">
                                <h1 className="brand-name-hero">{brandInfo.name}</h1>
                                <p className="brand-type-hero">{brandInfo.type}</p>
                                <p className="brand-desc-hero">{brandDescriptions[brandInfo.name] || brandInfo.type}</p>

                                {/* Контакты и соцсети */}
                                <div className="brand-links-hero">
                                    {brandInfo.contacts && brandInfo.contacts[0]?.phone && (
                                        <a href={`tel:${brandInfo.contacts[0].phone}`} className="brand-link">
                                            <FiPhone /> {brandInfo.contacts[0].phone}
                                        </a>
                                    )}
                                    {brandInfo.contacts && brandInfo.contacts[0]?.email && (
                                        <a href={`mailto:${brandInfo.contacts[0].email}`} className="brand-link">
                                            <FiMail /> {brandInfo.contacts[0].email}
                                        </a>
                                    )}
                                    {brandInfo.social_links?.map((link, i) => (
                                        <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="brand-link">
                                            {socialIcons[link.type] || <FiExternalLink />}
                                            {link.type === 'website' ? 'Сайт' : link.type}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    {/* Хлебные крошки */}
                    <div className="breadcrumbs">
                        <Link href="/">Главная</Link>
                        <FiChevronRight className="breadcrumb-icon" />
                        <Link href="/catalog">Каталог</Link>
                        <FiChevronRight className="breadcrumb-icon" />
                        <span>{brandInfo.name}</span>
                    </div>

                    {/* Основной контент */}
                    <div className="brand-main-layout">
                        {/* Левая колонка - категории */}
                        <aside className="brand-sidebar">
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
                                        {categories.map(cat => (
                                            <li key={cat}>
                                                <button
                                                    className={`category-link ${selectedCategory === cat ? 'active' : ''}`}
                                                    onClick={() => setSelectedCategory(cat)}
                                                >
                                                    {cat === 'all' ? 'Все товары' : cat}
                                                    {cat !== 'all' && (
                                                        <span className="category-count">{categoryStats[cat]}</span>
                                                    )}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Информация о бренде */}
                            <div className="brand-sidebar-info">
                                <h4>О бренде</h4>
                                <p>{brandInfo.description}</p>
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

                            {/* Виджет соцсетей в боковой панели */}
                            <BrandSocialWidget brandInfo={brandInfo} />
                        </aside>

                        {/* Правая колонка - товары */}
                        <div className="brand-products-area">
                            {/* Панель инструментов */}
                            <div className="products-toolbar">
                                <div className="results-count">
                                    <FiPackage className="results-icon" />
                                    <span>Найдено <strong>{filteredProducts.length}</strong> товаров</span>
                                    {selectedCategory !== 'all' && (
                                        <button
                                            className="clear-category"
                                            onClick={() => setSelectedCategory('all')}
                                        >
                                            <FiArrowLeft /> Вернуться ко всем
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

                            {/* Товары */}
                            {filteredProducts.length === 0 ? (
                                <div className="no-products">
                                    <FiBox size={64} />
                                    <h3>Нет товаров в этой категории</h3>
                                    <p>Попробуйте выбрать другую категорию</p>
                                </div>
                            ) : (
                                <>
                                    <div className={`products-${viewMode === 'grid' ? 'grid-large' : 'list-large'}`}>
                                        {filteredProducts.map(product => (
                                            <ProductCard key={product.id} product={product} />
                                        ))}
                                    </div>

                                    {/* Виджет соцсетей под товарами (для мобильных) */}
                                    <div className="brand-social-widget-mobile">
                                        <BrandSocialWidget brandInfo={brandInfo} />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}