import React from 'react';
import '../styles/_profile.scss';
import HeaderComponent from '../components/HeaderComponent.jsx';
import FooterComponent from '../components/FooterComponent.jsx';

export default function ProfilePage() {
    return (
        <div className="profile-page">
            <HeaderComponent />
            <main className="profile-content">
            </main>
            <FooterComponent />
        </div>
    );
}