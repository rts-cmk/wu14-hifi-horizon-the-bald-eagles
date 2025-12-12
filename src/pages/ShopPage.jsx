import React, { useState, useEffect, useMemo } from 'react';
import '../styles/_shop-page.scss';
import HeaderComponent from '../components/HeaderComponent.jsx';
import FooterComponent from '../components/FooterComponent.jsx';
import FilterSidebar from '../components/FilterSidebar.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import { useProducts } from '../context/ProductContext.jsx';
import { useLocation } from 'react-router';

export default function ShopPage() {

    const { products, loading, error, allCategories } = useProducts();

    const location = useLocation();

    const urlParams = useMemo(() => {

        const params = new URLSearchParams(location.search);

        return {
            searchTerm: params.get('q') || '',
            selectedCategory: params.get('category') || ''
        };
    }, [location.search]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const filteredProducts = useMemo(() => {
        let currentProducts = products;

        // Filter by category
        if (urlParams.selectedCategory) {
            currentProducts = currentProducts.filter(product =>
                product.category === selectedCategory
            );
        }
        // Filter by search term
        if (urlParams.searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            currentProducts = currentProducts.filter(product =>
                
                product.model.toLowerCase().includes(lowerCaseSearchTerm) ||
                product.brand.toLowerCase().includes(lowerCaseSearchTerm) ||
                product.description.toLowerCase().includes(lowerCaseSearchTerm)
            );
        }

        return currentProducts;
    }, [products, urlParams.searchTerm, urlParams.selectedCategory]);

    console.log('Filtered Products:', filteredProducts);

    if (loading) return <p>Loading products..</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div className="shopPage">
            <HeaderComponent />
            <main className='shopPage__content-area'>
                <FilterSidebar
                    allCategories={allCategories}
                    selectedCategory={urlParams.selectedCategory}
                />
                <ProductGrid products={filteredProducts} />
            </main>
            <FooterComponent />
        </div>
    );
}