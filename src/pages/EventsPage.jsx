import React from 'react';
import '../styles/_events.scss';
import NavComponent from '../components/NavComponent.jsx';
import HeaderComponent from '../components/HeaderComponent.jsx';
import FooterComponent from '../components/FooterComponent.jsx';

export default function EventsPage() {
    return (
        <div className="events-page">
        <HeaderComponent />
        <NavComponent />
        <main>
        </main>
        <FooterComponent />
        </div>
    );
    }