import React from 'react';
import '../styles/_product.scss';
import NavComponent from '../components/NavComponent.jsx';
import HeaderComponent from '../components/HeaderComponent.jsx';
import FooterComponent from '../components/FooterComponent.jsx';

export default function ProductPage() {
    return (
        <div className="product-page">
        <HeaderComponent />
        <NavComponent />
        <main>
        </main>
        <FooterComponent />
        </div>
    );
    }