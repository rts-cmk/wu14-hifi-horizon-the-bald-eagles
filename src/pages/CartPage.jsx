import React from 'react';
import '../styles/_cart.scss';
import HeaderComponent from '../components/HeaderComponent.jsx';
import FooterComponent from '../components/FooterComponent.jsx';

export default function CartPage() {
    return (
        <div className="cart-page">
            <HeaderComponent />
            <main>
            </main>
            <FooterComponent />
        </div>
    );
}