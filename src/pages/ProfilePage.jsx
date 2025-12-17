import React, { useState, useEffect, use } from 'react';
import { useNavigate } from 'react-router';

import '../styles/_profile.scss';
import HeaderComponent from '../components/HeaderComponent.jsx';
import FooterComponent from '../components/FooterComponent.jsx';

export default function ProfilePage() {
    const navigate = useNavigate();
    const [userData, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('credentials');
    const [editData, setEditData] = useState({});

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/login');
        } else {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setEditData(parsedUser);
        }
    }, [navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(`http://localhost:3000/api/users/update/${userData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editData),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            setIsEditing(false);
            alert('Profile has been updated!');
        }
    } catch (err) {
        alert('Something went wrong, please try again!');
        console.error(err);
    }
    };

    if (!user) return <p>Loading...</p>;


    return (
        <div className="profile-page">
            {/* <HeaderComponent /> */}
            <div className="profile-page">
                <div className="profile-container">

                </div>
            </div>
            {/* <FooterComponent /> */}
        </div>
    );
}