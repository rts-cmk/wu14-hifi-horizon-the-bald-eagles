import React from 'react';
import '../styles/_blog.scss';
import NavComponent from '../components/NavComponent.jsx';
import HeaderComponent from '../components/HeaderComponent.jsx';
import FooterComponent from '../components/FooterComponent.jsx';

export default function BlogPage() {
    return (
        <div className="blog-page">
        <HeaderComponent />
        <NavComponent />
        <main className="blog-content">
        </main>
        <FooterComponent />
        </div>
    );
    }