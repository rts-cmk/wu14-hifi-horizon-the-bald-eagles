import React from 'react';
import '../styles/_cat-list.scss';
import NavComponent from '../components/NavComponent.jsx';
import HeaderComponent from '../components/HeaderComponent.jsx';
import FooterComponent from '../components/FooterComponent.jsx';

export default function CategoryList() {
    return (
        <div className="category-list-page">
        <HeaderComponent />
        <NavComponent />
        <main className="category-list-content">
        </main>
        <FooterComponent />
        </div>
    );
    }