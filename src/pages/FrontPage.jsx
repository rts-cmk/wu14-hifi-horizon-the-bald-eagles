import React from 'react';
import NavComponent from '../components/NavComponent.jsx';
import HeaderComponent from '../components/HeaderComponent.jsx';
import FooterComponent from '../components/FooterComponent.jsx';
import '../styles/_front.scss';

export default function FrontPage() {
    return (
        <div className="front-page">
            <HeaderComponent />
            <NavComponent />
            <main>
            </main>
            <FooterComponent />
        </div>
    );
}