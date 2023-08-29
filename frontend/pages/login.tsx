import '../src/app/globals.css';
import React, { useState } from 'react';
import axios from 'axios';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const {data} = await axios.post('http://localhost:3001/api/users/login', {
                email,
                password
            })

            if (data.token) {
                // Save the JWT token and user data, and redirect to the dashboard or homepage.
                localStorage.setItem('token', data.token);
                window.location.href = '/';
            }
        } catch (err) {
            setError('Invalid credentials or error logging in.');
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-md w-full space-y-8'>
                <h1 className='text-2x1 font-bold text-gray-900'>Login</h1>
                {error && <p className='text-red-500'>{error}</p>}
                <div className='space-y-4'>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        className='w-full p-3 border border-gray-300 rounded'
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        className='w-full p-3 border border-gray-300 rounded'
                    />
                    <button
                        onClick={handleLogin}
                        className='w-full p-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700'
                    >Login</button>
                </div>
                
            </div>
        </div>
    );
};

export default LoginPage;
