import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, formData);
            localStorage.setItem('token', res.data.token);
            navigate('/admin');
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.msg || 'Login Failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark">
            <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-xl border border-gray-800 w-96 shadow-2xl">
                <h2 className="text-2xl font-bold mb-6 text-primary text-center font-heading">Admin Login</h2>
                <div className="space-y-4">
                    <input
                        className="w-full bg-gray-800 p-3 rounded text-white border border-gray-700 focus:border-primary outline-none transition-colors"
                        placeholder="Username"
                        value={formData.username}
                        onChange={e => setFormData({ ...formData, username: e.target.value })}
                    />
                    <input
                        className="w-full bg-gray-800 p-3 rounded text-white border border-gray-700 focus:border-primary outline-none transition-colors"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>
                <button className="w-full bg-primary text-black font-bold py-3 rounded mt-6 hover:bg-cyan-400 transition-all font-heading">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
