import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import HeaderComponent from '../components/HeaderComponent.jsx';
import FooterComponent from '../components/FooterComponent.jsx';
import '../styles/_login.scss';

export default function LoginPage() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data.user))

                alert('You succesfully logged in ! redirecting to home page.');

                navigate('/');
            } else {
                setError(data.message || 'Something went wrong, try again!');
            }
        } catch (err) {
            setError('There was an error with the server, please try again later.');
            console.error(err);
        }

    };


return (
    <div>
    <div className="login-page">
        <HeaderComponent />
        <h2 className='login-page__heading'>LOGIN</h2>
        <div className='login-page__account-form'>
            <h3>REGISTERED CUSTOMERS</h3>
            <p>If you have an account, sign in with your email and password:</p>
            <form onSubmit={handleLogin}>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                {error && <p className="error-message">{error}</p>}

                <label className='remember-me'>
                <input type="checkbox" name="checkbox" />
                    <h5>Remember Me</h5>
                </label>

                <button type="submit">Login</button>
                <Link className='login-page__account-form__forgot-password' to='/faq'>Forgot your password?</Link>
            </form>

        </div>

        <div className="new-customer">
            <h3>NEW CUSTOMER</h3>
            <p>Creating an account has many benefits: check out faster, track orders and more.</p>
            <button onClick={() => navigate('/create-account')}>Create an Account</button>
        </div>

        <FooterComponent />
    </div>
    </div>
);
}