import React from 'react';
import '../styles/_shop-page.scss';
import HeaderComponent from '../components/HeaderComponent.jsx';
import FooterComponent from '../components/FooterComponent.jsx';

export default function ShopPage() {
    return (
        <div className="shop-page">
            <HeaderComponent />
            <main>
            </main>
            <FooterComponent />
        </div>
    );
}