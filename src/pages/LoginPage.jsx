import React from 'react';
import HeaderComponent from '../components/HeaderComponent.jsx';
import FooterComponent from '../components/FooterComponent.jsx';
import '../styles/_login.scss';

export default function LoginPage() {
    return (
        <div className="login-page">
            <HeaderComponent />
            <main>
            </main>
            <FooterComponent />
        </div>
    );
}