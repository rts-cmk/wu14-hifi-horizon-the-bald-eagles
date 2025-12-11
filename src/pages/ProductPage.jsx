import React from 'react';
import '../styles/_product.scss';
import HeaderComponent from '../components/HeaderComponent.jsx';
import FooterComponent from '../components/FooterComponent.jsx';

export default function ProductPage() {
    return (
        <div className="product-page">
            <HeaderComponent />
            <main>
            </main>
            <FooterComponent />
        </div>
    );
}