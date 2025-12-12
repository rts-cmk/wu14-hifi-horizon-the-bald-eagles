import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';

// Create the Context object
export const ProductContext = createContext();

//Data Normalization Function
const normalizeProducts = (data) => {
    if (!data || Object.keys(data).length === 0) {
        return [];
    }

    const normalizedArray = [];
    
    for (const categoryKey in data) {
        if (categoryKey === '_id') continue; 

        const brands = data[categoryKey];
        if (typeof brands === 'object' && brands !== null) {
            
            const categorySlug = categoryKey.toLowerCase().replace(/[^a-z0-9]/g, '');

            for (const brandKey in brands) {
                const models = brands[brandKey];
                if (typeof models === 'object' && models !== null) {

                    for (const modelKey in models) {
                        const product = models[modelKey];
                        normalizedArray.push({
                            category: categorySlug,
                            brand: brandKey,
                            model: modelKey,
                            id: `${categorySlug}-${brandKey}-${modelKey}`.replace(/\s+/g, '-').toLowerCase(), 
                            ...product,
                        });
                    }
                }
            }
        }
    }
    return normalizedArray;
};

//Create the Provider Component
export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch and Normalize Data on initial load
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

            } catch (err) {
                console.error('Global Error fetching products:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchProducts();
    }, []);

    // Memoize the list of unique categories
    const allCategories = useMemo(() => {
        return [...new Set(products.map(p => p.category))];
    }, [products]);

    // Define the values that will be passed down to consumers
    const contextValue = useMemo(() => ({
        products,
        allCategories,
        loading,
        error
    }), [products, allCategories, loading, error]);

    return (
        <ProductContext.Provider value={contextValue}>
            {children}
        </ProductContext.Provider>
    );
};

// Custom Hook for easy consumption
export const useProducts = () => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};