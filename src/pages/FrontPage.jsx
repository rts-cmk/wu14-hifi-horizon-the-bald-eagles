import React, { use, useEffect } from 'react';
import HeaderComponent from '../components/HeaderComponent.jsx';
import FooterComponent from '../components/FooterComponent.jsx';
import '../styles/_front.scss';

export default function FrontPage() {

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const dataArray = await response.json();

                console.log('Fetched products:', dataArray);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        
        fetchProducts();

    }, []);


    return (
        <div className="front-page">
            <HeaderComponent />
            <main>
            </main>
            <FooterComponent />
        </div>
    );
}