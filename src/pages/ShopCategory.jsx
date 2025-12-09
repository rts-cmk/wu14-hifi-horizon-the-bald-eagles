import React from 'react';
import '../styles/_shop-cat.scss';
import NavComponent from '../components/NavComponent.jsx';
import HeaderComponent from '../components/HeaderComponent.jsx';
import FooterComponent from '../components/FooterComponent.jsx';

export default function ShopCategory() {
    return (
        <div className="shop-cat-page">
        <HeaderComponent />
        <NavComponent />
        <main>
        </main>
        <FooterComponent />
        </div>
    );
    }