'use client'
import React, { useState, useMemo, useCallback, useEffect, memo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
    FiGrid,
    FiList,
    FiArrowLeft,
    FiChevronRight,
    FiBox,
    FiShoppingCart,
    FiGlobe,
    FiPhone,
    FiMail,
    FiMapPin,
    FiClock,
    FiAward,
    FiTruck,
    FiShield,
    FiStar,
    FiExternalLink,
    FiInstagram,
    FiFacebook,
    FiYoutube
} from 'react-icons/fi';
import { FaTelegram, FaWhatsapp } from 'react-icons/fa';
import { useCart } from '@/app/context/CartContext';
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

// Маппинг иконок для типов брендов
const brandIcons = {
    'Трубы и фитинги': <FiBox />,
    'Сместители': <FiGlobe />,
    'Сантехника': <FiBox />,
    'Сантехника и вентиляция': <FiGlobe />,
    'Бочки': <FiBox />,
    'Ванная и кухня, вода и насосы, отопление, электричество и генераторы': <FiGlobe />,
    'default': <FiGlobe />
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

// URL баннеров для брендов
const brandBanners = {
    'Mercury plast': '/images/banners/mercury-plast.jpg',
    'Zegor': '/images/banners/zegor.jpg',
    'DERYA PLASTIK & DERYA KERAMIKA': '/images/banners/derya.jpg',
    'Hydro Plast': '/images/banners/hydro-plast.jpg',
    'Climaroom': '/images/banners/climaroom.jpg',
    'Fayz Plast': '/images/banners/fayz-plast.jpg',
    'AeMarket': '/images/banners/aemarket.jpg',
    'default': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&auto=format'
};

// Компонент изображения
const ProductImage = memo(({ product, isHovered, onMouseEnter, onMouseLeave }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [currentImage, setCurrentImage] = useState(product.image);

    useEffect(() => {
        if (isHovered && product.image_1) {
            setCurrentImage(product.image_1);
        } else {
            setCurrentImage(product.image);
        }
    }, [isHovered, product.image, product.image_1]);

    const handleImageError = () => {
        setImageError(true);
        setCurrentImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR202VPZfMD9kdS4yqx2x8aeg6DYlFypnBNBA&s');
    };

    return (
        <div
            className="product-image-container"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {!imageLoaded && !imageError && (
                <div className="image-skeleton" />
            )}
            {imageError ? (
                <div className="image-error">
                    <FiBox size={32} />
                </div>
            ) : (
                <img
                    src={currentImage}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => setImageLoaded(true)}
                    onError={handleImageError}
                    className={`product-img ${imageLoaded ? 'loaded' : 'loading'}`}
                />
            )}

            {product.oldPrice && (
                <span className="product-badge sale">SALE</span>
            )}
            {!product.inStock && (
                <span className="product-badge out">Под заказ</span>
            )}
        </div>
    );
});

ProductImage.displayName = 'ProductImage';

// Карточка товара для сетки
const GridProductCard = memo(({ product, onAddToCart, onMouseEnter, onMouseLeave, isHovered }) => {
    return (
        <div className="product-card-grid">
            <Link
                href={`/product/${product.id}`}
                className="product-card-link"
                prefetch={false}
            >
                <ProductImage
                    product={product}
                    isHovered={isHovered}
                    onMouseEnter={() => onMouseEnter(product.id)}
                    onMouseLeave={onMouseLeave}
                />

                <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-category">{product.category}</p>
                </div>
            </Link>

            <div className="product-actions">
                <button
                    className="action-btn cart-btn"
                    aria-label="В корзину"
                    onClick={(e) => onAddToCart(e, product)}
                    disabled={!product.inStock}
                >
                    <FiShoppingCart />
                </button>
            </div>
        </div>
    );
});

GridProductCard.displayName = 'GridProductCard';

// Карточка товара для списка
const ListProductCard = memo(({ product, onAddToCart }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
        <div className="product-card-list">
            <Link
                href={`/product/${product.id}`}
                className="product-card-link"
                prefetch={false}
            >
                <div className="product-image-container">
                    {!imageLoaded && !imageError && (
                        <div className="image-skeleton" />
                    )}
                    {imageError ? (
                        <div className="image-error">
                            <FiBox size={32} />
                        </div>
                    ) : (
                        <img
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                            decoding="async"
                            onLoad={() => setImageLoaded(true)}
                            onError={() => setImageError(true)}
                            className={`product-img ${imageLoaded ? 'loaded' : 'loading'}`}
                        />
                    )}
                    {product.oldPrice && (
                        <span className="product-badge sale">SALE</span>
                    )}
                    {!product.inStock && (
                        <span className="product-badge out">Под заказ</span>
                    )}
                </div>

                <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-category">{product.category}</p>
                </div>
            </Link>

            {product.inStock && (
                <button
                    className="list-cart-btn"
                    onClick={(e) => onAddToCart(e, product)}
                >
                    <FiShoppingCart />
                    В корзину
                </button>
            )}
        </div>
    );
});

ListProductCard.displayName = 'ListProductCard';

export default function BrandPage() {
    const params = useParams();
    const slug = params.slug;
    const [viewMode, setViewMode] = useState('grid');
    const { addToCart } = useCart();
    const [hoveredProductId, setHoveredProductId] = useState(null);

    // Получаем информацию о бренде по slug
    const brandInfo = useMemo(() => {
        const brandMap = {};
        brands.forEach(brand => {
            const brandSlug = createSlug(brand.name);
            brandMap[brandSlug] = brand;
        });

        const found = brandMap[slug];

        if (!found) return null;

        return {
            ...found,
            icon: brandIcons[found.type] || brandIcons.default,
            description: brandDescriptions[found.name] || `${found.name} - ${found.type}`,
            banner: brandBanners[found.name] || brandBanners.default
        };
    }, [slug]);

    // Получаем товары бренда
    const brandProducts = useMemo(() => {
        if (!brandInfo) return [];
        return products.filter(p => p.brand === brandInfo.name);
    }, [brandInfo]);

    // Статистика бренда
    const brandStats = useMemo(() => {
        const totalProducts = brandProducts.length;
        const inStock = brandProducts.filter(p => p.inStock !== false).length;
        const categories = [...new Set(brandProducts.map(p => p.category))];

        return {
            totalProducts,
            inStock,
            categoriesCount: categories.length,
            categories
        };
    }, [brandProducts]);

    const handleAddToCart = useCallback((e, product) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.detail > 1) return;
        if (!product.inStock) return;

        addToCart(product);

        const btn = e.currentTarget;
        btn.classList.add('clicked');
        setTimeout(() => btn.classList.remove('clicked'), 200);
    }, [addToCart]);

    const handleMouseEnter = useCallback((productId) => {
        setHoveredProductId(productId);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setHoveredProductId(null);
    }, []);

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
                {/* Баннер бренда с логотипом и названием */}
                <div
                    className="brand-banner"
                    style={{ backgroundImage: `url(${brandInfo.banner})` }}
                >
                    <div className="banner-overlay"></div>
                    <div className="container">
                        <div className="banner-content">
                            {brandInfo.image && (
                                <div className="brand-logo-large">
                                    <img
                                        src={brandInfo.image}
                                        alt={brandInfo.name}
                                        loading="lazy"
                                    />
                                </div>
                            )}
                            <div className="brand-icon-large">
                                {brandInfo.icon}
                            </div>
                            <h1 className="brand-title">{brandInfo.name}</h1>
                            <p className="brand-type">{brandInfo.type}</p>
                            <p className="brand-description">{brandInfo.description}</p>

                            {/* Контакты бренда */}
                            {brandInfo.contacts && brandInfo.contacts.length > 0 && (
                                <div className="brand-contacts">
                                    {brandInfo.contacts[0].phone && (
                                        <a href={`tel:${brandInfo.contacts[0].phone}`} className="brand-contact">
                                            <FiPhone />
                                            <span>{brandInfo.contacts[0].phone}</span>
                                        </a>
                                    )}
                                    {brandInfo.contacts[0].phone_1 && (
                                        <a href={`tel:${brandInfo.contacts[0].phone_1}`} className="brand-contact">
                                            <FiPhone />
                                            <span>{brandInfo.contacts[0].phone_1}</span>
                                        </a>
                                    )}
                                    {brandInfo.contacts[0].email && (
                                        <a href={`mailto:${brandInfo.contacts[0].email}`} className="brand-contact">
                                            <FiMail />
                                            <span>{brandInfo.contacts[0].email}</span>
                                        </a>
                                    )}
                                </div>
                            )}

                            {/* Социальные сети */}
                            {brandInfo.social_links && brandInfo.social_links.length > 0 && (
                                <div className="brand-social-links">
                                    {brandInfo.social_links.map((link, index) => (
                                        <a
                                            key={index}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="brand-social-link"
                                            title={link.type}
                                        >
                                            {socialIcons[link.type] || <FiExternalLink />}
                                        </a>
                                    ))}
                                </div>
                            )}

                            <div className="brand-stats">
                                <div className="stat">
                                    <FiBox className="stat-icon" />
                                    <div>
                                        <strong>{brandStats.totalProducts}</strong>
                                        <span>Товаров</span>
                                    </div>
                                </div>
                                <div className="stat">
                                    <FiAward className="stat-icon" />
                                    <div>
                                        <strong>{brandStats.inStock}</strong>
                                        <span>В наличии</span>
                                    </div>
                                </div>
                                <div className="stat">
                                    <FiGrid className="stat-icon" />
                                    <div>
                                        <strong>{brandStats.categoriesCount}</strong>
                                        <span>Категорий</span>
                                    </div>
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

                    {/* Информационная секция о бренде */}
                    <div className="brand-info-section">
                        <div className="brand-info-card">
                            <h3 className="brand-info-title">О бренде {brandInfo.name}</h3>
                            <p className="brand-info-text">
                                {brandInfo.description}
                            </p>
                            <div className="brand-info-features">
                                <div className="feature-item">
                                    <FiShield className="feature-icon" />
                                    <span>Официальная гарантия</span>
                                </div>
                                <div className="feature-item">
                                    <FiTruck className="feature-icon" />
                                    <span>Быстрая доставка</span>
                                </div>
                                <div className="feature-item">
                                    <FiStar className="feature-icon" />
                                    <span>Премиум качество</span>
                                </div>
                                <div className="feature-item">
                                    <FiClock className="feature-icon" />
                                    <span>Поддержка 24/7</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Заголовок с кнопкой PDF */}
                    <div className="brand-header">
                        <h2 className="brand-subtitle">
                            Товары {brandInfo.name}
                        </h2>
                    </div>

                    <div className="brand-content">
                        {/* Товары */}
                        <div className="brand-products">
                            <div className="products-toolbar">
                                <div className="results-count">
                                    Найдено: <strong>{brandProducts.length}</strong> товаров
                                </div>

                                <div className="toolbar-right">
                                    <div className="view-toggle">
                                        <button
                                            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                            onClick={() => setViewMode('grid')}
                                            aria-label="Сетка"
                                        >
                                            <FiGrid />
                                        </button>
                                        <button
                                            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                                            onClick={() => setViewMode('list')}
                                            aria-label="Список"
                                        >
                                            <FiList />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {brandProducts.length === 0 ? (
                                <div className="no-products">
                                    <p>В данном бренде пока нет товаров</p>
                                    <Link href="/catalog" className="reset-filters-btn">
                                        Вернуться в каталог
                                    </Link>
                                </div>
                            ) : (
                                <div className={`products-${viewMode}`}>
                                    {brandProducts.map(product => (
                                        viewMode === 'grid' ? (
                                            <GridProductCard
                                                key={product.id}
                                                product={product}
                                                onAddToCart={handleAddToCart}
                                                onMouseEnter={() => handleMouseEnter(product.id)}
                                                onMouseLeave={handleMouseLeave}
                                                isHovered={hoveredProductId === product.id}
                                            />
                                        ) : (
                                            <ListProductCard
                                                key={product.id}
                                                product={product}
                                                onAddToCart={handleAddToCart}
                                            />
                                        )
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}