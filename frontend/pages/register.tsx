import '../src/app/globals.css';
import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage: React.FC = () => {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const {data} = await axios.post('http://localhost:3001/api/users/register', {
                username,
                email,
                password,
                confirmPassword
            })

            if (data.token) {
                localStorage.setItem('token', data.token);
                window.location.href = '/';
            }
        } catch (err) {
            setError('Error during registration. Try again.');
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-md w-full space-y-8'>
                <h1 className='text-2x1 font-bold text-gray-900'>Register</h1>
                {error && <p className='text-red-500'>{error}</p>}
                <div className='space-y-4'>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username} 
                        onChange={e => setUserName(e.target.value)} 
                        className='w-full p-3 border border-gray-300 rounded'
                    />
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
                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        value={confirmPassword} 
                        onChange={e => setConfirmPassword(e.target.value)} 
                        className='w-full p-3 border border-gray-300 rounded'
                    />
                    <button
                        onClick={handleRegister}
                        className='w-full p-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700'
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
