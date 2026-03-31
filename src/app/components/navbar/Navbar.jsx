'use client'
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
    FiSearch,
    FiMenu,
    FiX,
    FiPhone,
    FiClock,
    FiAward,
    FiChevronDown,
    FiUsers,
    FiBox,
    FiMail,
    FiChevronRight
} from 'react-icons/fi';
import { brands, products } from '@/app/utils/data1';
import './navbar.css';

// Функция для создания слага из названия бренда
const createSlug = (name) => {
    if (!name) return '';
    return name
        .toLowerCase()
        .replace(/[&]/g, 'and')
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-');
};

// Номера телефонов сайта
const SITE_PHONES = ['+998981102255', '+998915452255'];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(false);
    const [showPhonesModal, setShowPhonesModal] = useState(false);
    const [showSuppliersModal, setShowSuppliersModal] = useState(false);
    const [dropdownTimeout, setDropdownTimeout] = useState(null);
    const searchRef = useRef(null);
    const dropdownRef = useRef(null);
    const menuRef = useRef(null);
    const router = useRouter();

    // Данные поставщиков (бренды с фото) - телефоны заменены на номера сайта
    const suppliers = useMemo(() => {
        return brands.map(brand => ({
            id: brand.id,
            name: brand.name || '',
            type: brand.type || '',
            image: brand.image,
            slug: createSlug(brand.name),
            phone: SITE_PHONES[0], // Используем первый номер сайта вместо телефона поставщика
            email: brand.contacts?.[0]?.email || null
        }));
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Закрытие поиска при клике вне
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Закрытие модалок при клике вне
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showPhonesModal && !event.target.closest('.phones-modal-content') && !event.target.closest('.mobile-phone-icon-btn')) {
                setShowPhonesModal(false);
            }
            if (showSuppliersModal && !event.target.closest('.suppliers-modal-content') && !event.target.closest('.mobile-suppliers-icon-btn')) {
                setShowSuppliersModal(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showPhonesModal, showSuppliersModal]);

    // Закрытие меню при ресайзе
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 992 && isOpen) {
                setIsOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isOpen]);

    // Блокировка скролла при открытом меню
    useEffect(() => {
        if (isOpen || showPhonesModal || showSuppliersModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, showPhonesModal, showSuppliersModal]);

    // Используем бренды из data1.js и создаем slug для каждого
    const brandsList = useMemo(() => {
        return brands.map(brand => ({
            name: brand.name || '',
            id: brand.id,
            type: brand.type || '',
            slug: createSlug(brand.name)
        }));
    }, []);

    // Поиск по товарам и брендам с защитой от undefined
    useEffect(() => {
        if (searchQuery.length > 1) {
            const query = searchQuery.toLowerCase();
            
            // Поиск по товарам с проверкой на существование полей
            const productResults = products.filter(product => {
                const name = product.name ? product.name.toLowerCase() : '';
                const brand = product.brand ? product.brand.toLowerCase() : '';
                const category = product.category ? product.category.toLowerCase() : '';
                return name.includes(query) || brand.includes(query) || category.includes(query);
            }).slice(0, 5);
            
            // Поиск по брендам с проверкой на существование полей
            const brandResults = brands.filter(brand => {
                const name = brand.name ? brand.name.toLowerCase() : '';
                const type = brand.type ? brand.type.toLowerCase() : '';
                return name.includes(query) || type.includes(query);
            }).slice(0, 3);
            
            setSearchResults([...productResults, ...brandResults]);
            setShowResults(true);
        } else {
            setSearchResults([]);
            setShowResults(false);
        }
    }, [searchQuery]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
            setShowResults(false);
            setSearchQuery('');
            setIsOpen(false);
        }
    };

    const handleResultClick = (item, type) => {
        if (type === 'product' && item.id) {
            router.push(`/product/${item.id}`);
        } else if (type === 'brand' && item.name) {
            router.push(`/catalog/${createSlug(item.name)}`);
        }
        setShowResults(false);
        setSearchQuery('');
        setIsOpen(false);
    };

    const closeMenu = () => {
        setIsOpen(false);
        setActiveDropdown(false);
    };

    // Обработчики для дропдауна с задержкой
    const handleMouseEnter = () => {
        if (dropdownTimeout) {
            clearTimeout(dropdownTimeout);
            setDropdownTimeout(null);
        }
        setActiveDropdown(true);
    };

    const handleMouseLeave = () => {
        const timeout = setTimeout(() => {
            setActiveDropdown(false);
        }, 300);
        setDropdownTimeout(timeout);
    };

    return (
        <>
            {/* Верхний бар - всегда в потоке документа */}
            <div className="navbar-top">
                <div className="container">
                    <div className="navbar-top-inner">
                        <div className="contact-info">
                            <FiPhone className="icon" />
                            <a href="tel:+998981102255" className="phone-link">
                                +998 98 110-22-55
                            </a>
                        </div>
                        <div className="years-badge">
                            <FiClock className="icon" />
                            <span>9:00 - 20:00 ежедневно</span>
                        </div>
                        <div className="premium-badge">
                            <FiAward className="icon" />
                            <a href="tel:+998915452255" className="phone-link">
                                +998 91 545-22-55
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Основной навбар - фиксированный */}
            <nav className={`navbar-main ${scrolled ? 'scrolled' : ''}`}>
                <div className="container">
                    <div className="navbar-main-inner">
                        <Link href="/" className="logo" onClick={closeMenu}>
                            <div className="logo-wrapper">
                                <Image
                                    src="/images/logo.png"
                                    alt="Santex Master Gold"
                                    width={70}
                                    height={70}
                                    priority
                                    className="logo-image"
                                />
                            </div>
                            <span className="logo-text">Santex Master Gold</span>
                        </Link>

                        {/* Десктоп меню */}
                        <ul className={`nav-menu ${isOpen ? 'active' : ''}`} ref={menuRef}>
                            <li className="nav-item">
                                <Link href="/" onClick={closeMenu}>
                                    Главная
                                </Link>
                            </li>
                            <li
                                className={`nav-item dropdown ${activeDropdown ? 'active' : ''}`}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                ref={dropdownRef}
                            >
                                <Link href="/catalog" className="dropdown-trigger" onClick={closeMenu}>
                                    Каталог
                                    <FiChevronDown className="dropdown-arrow" />
                                </Link>
                                <div className={`dropdown-menu ${activeDropdown ? 'show' : ''}`}>
                                    {brandsList.map(brand => (
                                        <Link
                                            key={brand.id}
                                            href={`/catalog/${brand.slug}`}
                                            className="dropdown-item"
                                            onClick={closeMenu}
                                        >
                                            {brand.name}
                                        </Link>
                                    ))}
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link href="/contacts" onClick={closeMenu}>
                                    Контакты
                                </Link>
                            </li>
                        </ul>

                        {/* Поиск и действия */}
                        <div className="nav-actions">
                            {/* Кнопка поставщиков - ДЛЯ ПК */}
                            <button
                                className="suppliers-pc-btn"
                                onClick={() => setShowSuppliersModal(true)}
                                aria-label="Поставщики"
                            >
                                <FiUsers className="suppliers-pc-icon" />
                                <span className="suppliers-pc-text">Поставщики</span>
                            </button>

                            {/* Иконка телефона для мобильных */}
                            <button
                                className="mobile-phone-icon-btn"
                                onClick={() => setShowPhonesModal(true)}
                                aria-label="Позвонить"
                            >
                                <FiPhone />
                            </button>

                            {/* Иконка поставщиков для мобильных */}
                            <button
                                className="mobile-suppliers-icon-btn"
                                onClick={() => setShowSuppliersModal(true)}
                                aria-label="Поставщики"
                            >
                                <FiUsers />
                            </button>

                            <div className="search-wrapper" ref={searchRef}>
                                <form onSubmit={handleSearch} className="search-form">
                                    <input
                                        type="text"
                                        placeholder="Поиск товаров или брендов..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onFocus={() => searchResults.length > 0 && setShowResults(true)}
                                        className="search-input"
                                        suppressHydrationWarning
                                    />
                                    <button type="submit" className="search-button" aria-label="Поиск">
                                        <FiSearch />
                                    </button>
                                </form>

                                {/* Результаты поиска */}
                                {showResults && searchResults.length > 0 && (
                                    <div className="search-results">
                                        {searchResults.map((item, index) => {
                                            const isProduct = item.hasOwnProperty('brand');
                                            const itemName = item.name || (isProduct ? 'Товар' : 'Бренд');
                                            const itemCategory = isProduct ? (item.brand || '') : (item.type || '');
                                            const itemImage = isProduct ? item.image : null;
                                            
                                            return (
                                                <div
                                                    key={isProduct ? `product-${item.id || index}` : `brand-${item.id || index}`}
                                                    className="search-result-item"
                                                    onClick={() => handleResultClick(item, isProduct ? 'product' : 'brand')}
                                                >
                                                    <div className="result-image">
                                                        {itemImage ? (
                                                            <img src={itemImage} alt={itemName} />
                                                        ) : (
                                                            <div className="result-image-placeholder">
                                                                <FiBox size={20} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="result-info">
                                                        <div className="result-name">{itemName}</div>
                                                        {itemCategory && (
                                                            <div className="result-category">{itemCategory}</div>
                                                        )}
                                                        <div className="result-type-badge">
                                                            {isProduct ? 'Товар' : 'Бренд'}
                                                        </div>
                                                    </div>
                                                    <FiChevronRight className="result-arrow" />
                                                </div>
                                            );
                                        })}
                                        <div className="search-results-footer">
                                            <button onClick={handleSearch} className="view-all-button">
                                                Все результаты ({searchResults.length})
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Бургер меню */}
                            <button
                                className={`burger-button ${isOpen ? 'active' : ''}`}
                                onClick={() => setIsOpen(!isOpen)}
                                aria-label="Меню"
                                aria-expanded={isOpen}
                            >
                                {isOpen ? <FiX /> : <FiMenu />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Модальное окно с телефонами для мобильных */}
            {showPhonesModal && (
                <div className="phones-modal-overlay" onClick={() => setShowPhonesModal(false)}>
                    <div className="phones-modal-content" onClick={e => e.stopPropagation()}>
                        <div className="phones-modal-header">
                            <FiPhone className="phones-modal-icon" />
                            <h3 className="phones-modal-title">Связаться с нами</h3>
                            <button
                                className="phones-modal-close"
                                onClick={() => setShowPhonesModal(false)}
                            >
                                <FiX />
                            </button>
                        </div>
                        <div className="phones-modal-body">
                            <a href="tel:+998981102255" className="phones-modal-item">
                                <span className="phones-modal-name">Основной номер</span>
                                <span className="phones-modal-number">+998 98 110-22-55</span>
                            </a>
                            <a href="tel:+998915452255" className="phones-modal-item">
                                <span className="phones-modal-name">Дополнительный</span>
                                <span className="phones-modal-number">+998 91 545-22-55</span>
                            </a>
                        </div>
                        <div className="phones-modal-footer">
                            <button
                                className="phones-modal-btn"
                                onClick={() => setShowPhonesModal(false)}
                            >
                                Закрыть
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Модальное окно с поставщиками (брендами) */}
            {showSuppliersModal && (
                <div className="suppliers-modal-overlay" onClick={() => setShowSuppliersModal(false)}>
                    <div className="suppliers-modal-content" onClick={e => e.stopPropagation()}>
                        <div className="suppliers-modal-header">
                            <FiUsers className="suppliers-modal-icon" />
                            <h3 className="suppliers-modal-title">Наши поставщики</h3>
                            <button
                                className="suppliers-modal-close"
                                onClick={() => setShowSuppliersModal(false)}
                            >
                                <FiX />
                            </button>
                        </div>
                        <div className="suppliers-modal-body">
                            {suppliers.map((supplier) => (
                                <div key={supplier.id} className="supplier-item">
                                    <div className="supplier-image">
                                        {supplier.image ? (
                                            <img src={supplier.image} alt={supplier.name} />
                                        ) : (
                                            <div className="supplier-image-placeholder">
                                                <FiBox size={24} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="supplier-info">
                                        <div className="supplier-name">
                                            <h4>{supplier.name || 'Бренд'}</h4>
                                            <span className="supplier-type">{supplier.type || ''}</span>
                                        </div>
                                        {/* Телефон заменен на номер сайта */}
                                        <a
                                            href={`tel:${supplier.phone}`}
                                            className="supplier-phone"
                                            onClick={() => setShowSuppliersModal(false)}
                                        >
                                            <FiPhone className="supplier-phone-icon" />
                                            {supplier.phone}
                                        </a>
                                        {supplier.email && (
                                            <a
                                                href={`mailto:${supplier.email}`}
                                                className="supplier-email"
                                                onClick={() => setShowSuppliersModal(false)}
                                            >
                                                <FiMail className="supplier-email-icon" />
                                                {supplier.email}
                                            </a>
                                        )}
                                        <Link
                                            href={`/catalog/${supplier.slug}`}
                                            className="supplier-link"
                                            onClick={() => setShowSuppliersModal(false)}
                                        >
                                            Смотреть товары
                                            <FiChevronDown className="supplier-link-icon" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="suppliers-modal-footer">
                            <button
                                className="suppliers-modal-btn"
                                onClick={() => setShowSuppliersModal(false)}
                            >
                                Закрыть
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Оффсет для фиксированного навбара */}
            <div className="navbar-offset" />
        </>
    );
};

export default Navbar;