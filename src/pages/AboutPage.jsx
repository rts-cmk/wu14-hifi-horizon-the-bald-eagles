import React from 'react';
import '../styles/_about.scss';
import NavComponent from '../components/NavComponent.jsx';
import HeaderComponent from '../components/HeaderComponent.jsx';
import FooterComponent from '../components/FooterComponent.jsx';

export default function AboutPage() {
    return (
        <div className="about-page">
            <HeaderComponent />
            <NavComponent />
            <main>
            </main>
            <FooterComponent />
        </div>
    );
}