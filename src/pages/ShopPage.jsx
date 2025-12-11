import React, { useState, useEffect, useMemo } from 'react';
import '../styles/_shop-page.scss';
import HeaderComponent from '../components/HeaderComponent.jsx';
import FooterComponent from '../components/FooterComponent.jsx';
import FilterSidebar from '../components/FilterSidebar.jsx';
import ProductGrid from '../components/ProductGrid.jsx';


export default function ShopPage() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const normalizeProducts = (data) => {

        if (!data || Object.keys(data).length === 0) {
            return [];
        }

        const normalizedArray = [];

        for (const categoryKey in data) {
            if (typeof data[categoryKey] === 'object' && data[categoryKey] !== null) {

                for (const brandKey in data[categoryKey]) {
                    if (typeof data[categoryKey][brandKey] === 'object' && data[categoryKey][brandKey] !== null) {

                        for (const modelKey in data[categoryKey][brandKey]) {
                            const product = data[categoryKey][brandKey][modelKey];
                            normalizedArray.push({

                                category: categoryKey.toLowerCase().replace(/\s+/g, ''),
                                brand: brandKey,
                                model: modelKey,
                                id: '${categoryKey}-${brandkey}-${modelKey}'.replace(/\s+/g, '-').toLowerCase(),
                                ...product,
                            });
                        }

                    }
                }
            }
        }
        return normalizedArray;
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const rawData = await response.json();

                const normalizedData = normalizeProducts(rawData);
                setProducts(normalizedData);

                console.log('Fetched products:', data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();

    }, []);

    const filteredProducts = useMemo(() => {
        let currentProducts = products;

        // Filter by category
        if (selectedCategory) {
            currentProducts = currentProducts.filter(product =>
                product.category === selectedCategory
            );
        }
        // Filter by search term
        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            currentProducts = currentProducts.filter(product =>
                product.model.toLowercase().includes(lowerCaseSearchTerm) ||
                product.brand.toLowercase().includes(lowerCaseSearchTerm) ||
                product.description.toLowercase().includes(lowerCaseSearchTerm)
            );
        }

        return currentProducts;
    }, [products, searchTerm, selectedCategory]);

    if (loading) return <p>Loading products..</p>
    if (error) return <p>Error: {error}</p>

    const allCategories = [...new Set(products.map(p => p.category))];

    return (
        <div className="shopPage">
            <HeaderComponent
                setSearchTerm={setSearchTerm}
                setSelectedCategory={setSelectedCategory}
                allCategories={allCategories}
            />
            <main className='shopPage__content-area'>
                <FilterSidebar
                    allCategories={allCategories}
                    setSelectedCategory={setSelectedCategory}
                    selectedCategory={selectedCategory}
                />
                <ProductGrid products={filteredProducts} />
            </main>
            <FooterComponent />
        </div>
    );
}
