import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/background.png';


const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email === 'admin' && password === '123123') {
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/');
        }
    };

    return (
        <div
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'top',
                minHeight: '100vh',
            }}
        >
            <div className='login-form'>
                <h2>Build Dynamic Form</h2>
                <form className='login' onSubmit={handleSubmit}>
                    <input
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className='submit'>Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;