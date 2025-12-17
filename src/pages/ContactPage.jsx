import React, { useState } from 'react';
import '../styles/_contact.scss';
import HeaderComponent from '../components/HeaderComponent.jsx';
import FooterComponent from '../components/FooterComponent.jsx';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert('Thank you! Your message has been sent.');
                setFormData({ fullName: '', email: '', subject: '', message: '' }); // Clear form
            }
        } catch (err) {
            alert('Failed to send message.');
        }
    };

    return (
        <div className="contact-page">
            <HeaderComponent />
            <h1>GET IN TOUCH WITH US</h1>
            <div className="contact-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full name <span>*</span></label>
                        <input type="text" required value={formData.fullName} 
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
                    </div>
                    <div className="form-group">
                        <label>Email <span>*</span></label>
                        <input type="email" required value={formData.email} 
                            onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    </div>
                    <div className="form-group">
                        <label>Subject <span>*</span></label>
                        <input type="text" required value={formData.subject} 
                            onChange={(e) => setFormData({...formData, subject: e.target.value})} />
                    </div>
                    <div className="form-group__message">
                        <label>Message <span>*</span></label>
                        <textarea required value={formData.message} 
                            onChange={(e) => setFormData({...formData, message: e.target.value})} />
                    </div>
                    <button type="submit" className="submit-btn">Submit</button>
                </form>
            </div>
            <p className="footer-note">
                Visit our sister companies <span className="highlight">Home Sound</span> and <span className="highlight">The Movie Rooms</span> part of the HiFi Horizon Group.
            </p>
            <FooterComponent />
        </div>
    );
}