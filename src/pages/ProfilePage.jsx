import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import HeaderComponent from '../components/HeaderComponent.jsx';
import FooterComponent from '../components/FooterComponent.jsx';
import '../styles/_profile.scss';

export default function ProfilePage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');
    const [editingField, setEditingField] = useState(null);
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

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/users/update/${user._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editData),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data.user));
                setUser(data.user);
                setEditingField(null);
                alert('Profile updated!');
            }
        } catch (err) {
            alert('Update failed');
        }
    };

    if (!user) return <p>Loading...</p>;

    const renderInfoRow = (label, fieldKey, icon) => {
        const isEditing = editingField === fieldKey;

        return (
            <>
                
                <div className="info-row">
                    <div className="info-row__left">
                        <img src={`/src/assets/profile-icons/${icon}.svg`} alt={icon} />
                    </div>

                    <div className="info-row__middle">
                        <p className="label">{label}</p>
                        {isEditing ? (
                            <div className="edit-container">

                                {fieldKey === 'address' ? (
                                    <>
                                        <input type="text" value={editData.address} onChange={(e) => setEditData({ ...editData, address: e.target.value })} placeholder="Street" />
                                        <input type="text" value={editData.zipCode} onChange={(e) => setEditData({ ...editData, zipCode: e.target.value })} placeholder="Zip Code" />
                                        <input type="text" value={editData.city} onChange={(e) => setEditData({ ...editData, city: e.target.value })} placeholder="City" />
                                        <input type="text" value={editData.country} onChange={(e) => setEditData({ ...editData, country: e.target.value })} placeholder="Country" />
                                    </>
                                ) : (
                                    <input
                                        type={fieldKey === 'password' ? 'password' : 'text'}
                                        value={fieldKey === 'password' ? '' : editData[fieldKey]}
                                        onChange={(e) => setEditData({ ...editData, [fieldKey]: e.target.value })}
                                        autoFocus
                                    />
                                )}
                                <div className="action-btns">
                                    <button onClick={handleUpdate} className="save-btn">Save</button>
                                    <button onClick={() => setEditingField(null)} className="cancel-btn">Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div className="value-display">
                                {fieldKey === 'address' ? (
                                    <div className="address-display">
                                        <span>{user.address}</span>
                                        <span>{user.zipCode} {user.city}</span>
                                        <span>{user.country}</span>
                                    </div>
                                ) : (
                                    <span>{fieldKey === 'password' ? '**********' : user[fieldKey]}</span>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="info-row__right">
                        {!isEditing && (
                            <button className="edit-icon-btn" onClick={() => setEditingField(fieldKey)}>
                                <img src="/src/assets/profile-icons/edit.svg" alt="edit" />
                            </button>
                        )}
                    </div>
                </div>
                
            </>
        );
    };

    return (
        <>

            <HeaderComponent />
            <div className="profile-wrapper">
                <div className="profile-card">
                    {/* Tab Navigation Bar */}
                    <div className="profile-tabs">
                        <button
                            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                            onClick={() => setActiveTab('profile')}
                        >
                            Profile
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
                            onClick={() => setActiveTab('orders')}
                        >
                            Orders
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="tab-content">
                        {activeTab === 'profile' ? (
                            <div className="profile-section">
                                <h2>YOUR PROFILE INFORMATION</h2>
                                <div className="info-list">
                                    {renderInfoRow("Name", "fullName", "profile")}
                                    {renderInfoRow("Phone number", "phone", "phone")}
                                    {renderInfoRow("Mail", "email", "mail")}
                                    {renderInfoRow("Password", "password", "password")}
                                    {renderInfoRow("Address", "address", "address")}
                                </div>
                            </div>
                        ) : (
                            <div className="orders-section">
                                <h2>YOUR RECENT ORDERS</h2>
                                <p>You have no orders..</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <FooterComponent />
        </>
    );
}