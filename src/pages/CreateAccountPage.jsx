import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import HeaderComponent from '../components/HeaderComponent.jsx';
import FooterComponent from '../components/FooterComponent.jsx';
import '../styles/_create-account.scss';

export default function CreateAccountPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        address: '',
        address2: '',
        zipCode: '',
        city: '',
        country: '',
        phone: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Account Has been created ! redirecting to login page.');
                navigate('/login');
            } else {
                setError(data.message || 'Ups ! something went wrong.');
                console.error(err);
            }
        } catch (err) {
            setError('Something is going on with the server, please try again later.');
            console.error(err);
        }
    };

    return (
        < div className="create-account-page" >
            <HeaderComponent />
            <h2 className='create-account-page__heading'>CREATE ACCOUNT</h2>
            <form className="create-account-page__account-form" onSubmit={handleSubmit}>
                <h2>Create New Customer Account:</h2>

                {error && <p className="create-account-page__error-message">{error}</p>}

                <div className="create-account-page__form-group">
                    <p>Full Name:<span>*</span></p>
                    <input type="text" name="fullName" placeholder="" onChange={handleChange} required />
                </div>

                <div className="create-account-page__form-group">
                    <p>Adress:<span>*</span></p>
                    <input type="text" name="address" placeholder="" onChange={handleChange} required />
                </div>

                <div className="create-account-page__form-group">
                    <p>Repeat-Adress:</p>
                    <input type="text" name="address2" placeholder="" onChange={handleChange} />
                </div>

                <div className="create-account-page__form-row">
                    <p>Zip-Code:<span>*</span></p>
                    <input type="text" name="zipCode" placeholder="" onChange={handleChange} required />
                    <p>City:</p>
                    <input type="text" name="city" placeholder="" onChange={handleChange} required />
                </div>

                <div className="create-account-page__form-group">
                    <p>Country:</p>
                    <input type="text" name="country" placeholder="" onChange={handleChange} />
                </div>

                <div className="create-account-page__form-group">
                    <p>Phone-Number:</p>
                    <input type="text" name="phone" placeholder="" onChange={handleChange} />
                </div>

                <div className="create-account-page__form-group">
                    <p>Email:<span>*</span></p>
                    <input type="email" name="email" placeholder="" onChange={handleChange} required />
                </div>

                <div className="create-account-page__form-group">
                    <p>Password:<span>*</span></p>
                    <input type="password" name="password" placeholder="min 6 chararcters.." onChange={handleChange} required />
                </div>

                <div className="create-account-page__form-group">
                    <p>Repeat-Password<span>*</span></p>
                    <input type="password" name="repeat-password" onChange={handleChange} required />
                </div>

                <div className="create-account-page__checkboxes">
                    <input type="checkbox" name="agree-to-data" id="" /> I agree to the processing of my personal data in accordance with the <a href="/privacy-policy">Privacy Policy</a>.<br />
                    <input type="checkbox" name="accept-marketing" id="" /> I would like to receive marketing and promotional offers.<br />
                </div>

                <button type="submit" className="submit-btn">Create an Account</button>
            </form >
            <FooterComponent />
        </div >
    );
}