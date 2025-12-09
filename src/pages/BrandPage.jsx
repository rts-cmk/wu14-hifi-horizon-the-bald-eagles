import React from 'react';
import '../styles/_brand.scss';
import NavComponent from '../components/NavComponent.jsx';
import HeaderComponent from '../components/HeaderComponent.jsx';
import FooterComponent from '../components/FooterComponent.jsx';

export default function BrandPage() {
    return (
        <div className="brand-page">
        <HeaderComponent />
        <NavComponent />
        <main>
        </main>
        <FooterComponent />
        </div>
    );
    }