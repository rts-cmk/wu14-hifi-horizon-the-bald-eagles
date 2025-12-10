import React, { useState, useEffect } from 'react';
import '../styles/_shop-page.scss';
import HeaderComponent from '../components/HeaderComponent.jsx';
import FooterComponent from '../components/FooterComponent.jsx';

export default function ShopPage() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);

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

    return (
        <div className="shop-page">
            <HeaderComponent />
            <main>
                <h1 className='mainTitle'>PRODUCTS</h1>
                <div className='sortProducts'></div>
                <section className='productsGrid'>
                    <ul>
                        <li className='product'>
                            <div>compare</div>
                            <img src="" alt="" />
                            <h2>Product 1</h2>
                            <p>price</p>
                            <button>add to cart</button>
                            <p>stock</p>
                        </li>
                    </ul>
                </section>
                
            </main>
            <FooterComponent />
        </div>
    );
}