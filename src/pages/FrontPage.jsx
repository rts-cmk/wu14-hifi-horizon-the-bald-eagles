import React from 'react';
import HeaderComponent from '../components/HeaderComponent.jsx';
import FooterComponent from '../components/FooterComponent.jsx';
import '../styles/_front.scss';

export default function FrontPage() {
    return (
        <div className="front-page">
            <HeaderComponent />
            <main>
            </main>
            <FooterComponent />
        </div>
    );
}