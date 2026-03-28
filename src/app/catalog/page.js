'use client'
import React, { useState, useMemo, useCallback, memo, useEffect } from 'react';
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
    FiFilter,
    FiX
} from 'react-icons/fi';
import { useCart } from '@/app/context/CartContext';
import Navbar from '@/app/components/navbar/Navbar';
import Footer from '@/app/components/footer/Footer';
import { brands, products } from '../utils/data1';
import './brand.css';

// Улучшенная функция для создания слага из названия бренда
const createSlug = (name) => {
    if (!name) return '';
    
    return name
        .toLowerCase()
        // Replace & with 'and'
        .replace(/&/g, 'and')
        // Remove any characters that are not letters, numbers, spaces, or hyphens
        .replace(/[^\w\s-]/g, '')
        // Replace spaces with hyphens
        .replace(/\s+/g, '-')
        // Remove multiple consecutive hyphens
        .replace(/-+/g, '-')
        // Remove leading/trailing hyphens
        .replace(/^-+|-+$/g, '');
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

// Компонент изображения (остается без изменений)
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
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const { addToCart } = useCart();
    const [hoveredProductId, setHoveredProductId] = useState(null);

    // Создаем маппинг slug -> brand
    const slugToBrandMap = useMemo(() => {
        const map = new Map();
        brands.forEach(brand => {
            const brandSlug = createSlug(brand.name);
            map.set(brandSlug, brand);
            
            // Для отладки: выводим в консоль маппинг
            console.log(`Slug: "${brandSlug}" -> Brand: "${brand.name}"`);
        });
        return map;
    }, []);

    // Получаем информацию о бренде по slug
    const brandInfo = useMemo(() => {
        if (!slug) return null;
        
        const found = slugToBrandMap.get(slug);
        
        if (!found) {
            console.log(`Brand not found for slug: "${slug}"`);
            return null;
        }

        return {
            ...found,
            icon: brandIcons[found.type] || brandIcons.default,
            description: brandDescriptions[found.name] || `${found.name} - ${found.type}`,
            banner: brandBanners[found.name] || brandBanners.default
        };
    }, [slug, slugToBrandMap]);

    // Получаем товары бренда
    const brandProducts = useMemo(() => {
        if (!brandInfo) return [];
        return products.filter(p => p.brand === brandInfo.name);
    }, [brandInfo]);

    // Получаем уникальные категории для фильтрации
    const categories = useMemo(() => {
        const cats = new Set();
        brandProducts.forEach(product => {
            if (product.category) {
                cats.add(product.category);
            }
        });
        return ['all', ...Array.from(cats).sort()];
    }, [brandProducts]);

    // Фильтруем товары по категории
    const filteredProducts = useMemo(() => {
        if (selectedCategory === 'all') {
            return brandProducts;
        }
        return brandProducts.filter(p => p.category === selectedCategory);
    }, [brandProducts, selectedCategory]);

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
                                    {brandInfo.contacts[0].email && (
                                        <a href={`mailto:${brandInfo.contacts[0].email}`} className="brand-contact">
                                            <FiMail />
                                            <span>{brandInfo.contacts[0].email}</span>
                                        </a>
                                    )}
                                </div>
                            )}

                            <div className="brand-stats">
                                <span className="stat">
                                    Товаров: <strong>{brandProducts.length}</strong>
                                </span>
                                <span className="stat">
                                    В наличии: <strong>{brandProducts.filter(p => p.inStock !== false).length}</strong>
                                </span>
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

                    {/* Навигация по брендам */}
                    <div className="brands-nav">
                        <div className="brands-nav-scroll">
                            {brands.map(brand => {
                                const brandSlug = createSlug(brand.name);
                                const isActive = brandSlug === slug;
                                return (
                                    <Link
                                        key={brand.id}
                                        href={`/catalog/${brandSlug}`}
                                        className={`brand-nav-item ${isActive ? 'active' : ''}`}
                                    >
                                        {brand.image && (
                                            <div className="brand-nav-image">
                                                <img src={brand.image} alt={brand.name} />
                                            </div>
                                        )}
                                        <span className="brand-nav-name">{brand.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Заголовок с фильтрацией и кнопкой PDF */}
                    <div className="brand-header">
                        <h2 className="brand-subtitle">
                            Товары {brandInfo.name}
                            {selectedCategory !== 'all' && (
                                <span className="category-badge"> / {selectedCategory}</span>
                            )}
                        </h2>

                        <div className="header-actions">
                            <button
                                className="mobile-filter-btn"
                                onClick={() => setShowMobileFilters(true)}
                                aria-label="Фильтр по категориям"
                            >
                                <FiFilter />
                                Категории
                                {selectedCategory !== 'all' && (
                                    <span className="filter-count">1</span>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Фильтры по категориям (десктоп) */}
                    {categories.length > 1 && (
                        <div className="category-filters desktop-only">
                            <div className="category-filters-scroll">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        className={`category-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                                        onClick={() => setSelectedCategory(cat)}
                                    >
                                        {cat === 'all' ? 'Все товары' : cat}
                                        {cat !== 'all' && (
                                            <span className="category-count">
                                                {brandProducts.filter(p => p.category === cat).length}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="brand-content">
                        {/* Товары */}
                        <div className="brand-products">
                            <div className="products-toolbar">
                                <div className="results-count">
                                    Найдено: <strong>{filteredProducts.length}</strong> товаров
                                    {selectedCategory !== 'all' && (
                                        <button
                                            className="clear-category"
                                            onClick={() => setSelectedCategory('all')}
                                        >
                                            <FiX />
                                            Очистить
                                        </button>
                                    )}
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

                            {filteredProducts.length === 0 ? (
                                <div className="no-products">
                                    <p>В данной категории пока нет товаров</p>
                                    <button
                                        className="reset-filters-btn"
                                        onClick={() => setSelectedCategory('all')}
                                    >
                                        Показать все товары
                                    </button>
                                </div>
                            ) : (
                                <div className={`products-${viewMode}`}>
                                    {filteredProducts.map(product => (
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
                        <div className="mobile-filters-list">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    className={`mobile-category-item ${selectedCategory === cat ? 'active' : ''}`}
                                    onClick={() => {
                                        setSelectedCategory(cat);
                                        setShowMobileFilters(false);
                                    }}
                                >
                                    <span>{cat === 'all' ? 'Все товары' : cat}</span>
                                    {cat !== 'all' && (
                                        <span className="mobile-category-count">
                                            {brandProducts.filter(p => p.category === cat).length}
                                        </span>
                                    )}
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