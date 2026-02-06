import React, { useState } from 'react';
import axios from 'axios';
import { useVibe } from '../context/VibeContext';
import { useNavigate } from 'react-router-dom';

const AdminResources = () => {
    const { t } = useVibe();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        category: 'O-Level CS',
        link: '',
        type: 'PDF',
        description: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${import.meta.env.VITE_API_URL}/api/resources`, formData, {
                headers: { 'x-auth-token': token }
            });
            setStatus('success');
            setTimeout(() => navigate('/resources'), 1500);
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen pt-24 px-6 max-w-4xl mx-auto pb-20">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-8 text-center">
                {t("Add Resource", "Drop Loot")}
            </h1>

            <form onSubmit={handleSubmit} className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 space-y-6 max-w-2xl mx-auto">
                <div>
                    <label className="block text-gray-400 mb-2 font-bold">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2 font-bold">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                    >
                        <option value="O-Level CS">O-Level CS</option>
                        <option value="O-Level Math">O-Level Math</option>
                        <option value="A-Level CS">A-Level CS</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-400 mb-2 font-bold">Link (Google Drive/Dropbox)</label>
                    <input
                        type="url"
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2 font-bold">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary h-24"
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full py-4 bg-primary text-black font-bold font-heading rounded hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                        disabled={status === 'loading'}
                    >
                        {status === 'loading' ? 'Uploading...' : 'Add Resource'}
                    </button>

                    {status === 'success' && (
                        <p className="text-green-400 text-center mt-4 font-bold">Resource Added Successfully!</p>
                    )}
                    {status === 'error' && (
                        <p className="text-red-400 text-center mt-4 font-bold">Failed to add resource. Try again.</p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default AdminResources;
