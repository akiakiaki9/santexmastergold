// src/app/catalog/page.js
import { Suspense } from 'react';
import CatalogContent from './CatalogContent';

export default function CatalogPage() {
    return (
        <Suspense fallback={
            <div className="catalog-loading">
                <div className="loading-spinner"></div>
                <p>Загрузка каталога...</p>
            </div>
        }>
            <CatalogContent />
        </Suspense>
    );
}