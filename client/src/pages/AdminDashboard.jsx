import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
    const [leads, setLeads] = useState([]);
    const [resources, setResources] = useState([]);
    const [resourceForm, setResourceForm] = useState({ title: '', category: 'O-Level Math', link: '' });
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const token = localStorage.getItem('token');
        try {
            const leadsRes = await axios.get(`${API_URL}/api/leads`, { headers: { 'x-auth-token': token } });
            const resourcesRes = await axios.get(`${API_URL}/api/resources`);
            setLeads(leadsRes.data);
            setResources(resourcesRes.data);
        } catch (err) {
            console.error(err);
            if (err.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        }
    };

    const handleAddResource = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post(`${API_URL}/api/resources`, resourceForm, { headers: { 'x-auth-token': token } });
            setResourceForm({ title: '', category: 'O-Level Math', link: '' });
            fetchData();
        } catch (err) {
            console.error(err);
            alert('Error adding resource');
        }
    };

    const handleDeleteResource = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${API_URL}/api/resources/${id}`, { headers: { 'x-auth-token': token } });
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen pt-24 px-6 max-w-7xl mx-auto pb-20">
            <h1 className="text-4xl font-heading font-bold text-primary mb-10">Admin Dashboard</h1>

            <div className="grid lg:grid-cols-2 gap-10">
                {/* Leads Section */}
                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                    <h2 className="text-2xl font-bold mb-6 text-secondary">Inquiries ({leads.length})</h2>
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                        {leads.map(lead => (
                            <div key={lead._id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg">{lead.name}</h3>
                                    <span className="text-xs bg-primary text-black px-2 py-1 rounded font-bold">{lead.subject}</span>
                                </div>
                                <p className="text-gray-400 text-sm mb-1">{lead.email} | {lead.phone}</p>
                                <p className="text-gray-300 text-sm mt-2 font-mono bg-black/30 p-2 rounded">{lead.message}</p>
                                <div className="mt-2 text-xs text-gray-500">{new Date(lead.createdAt).toLocaleString()}</div>
                            </div>
                        ))}
                        {leads.length === 0 && <p className="text-gray-500 text-center">No inquiries yet.</p>}
                    </div>
                </div>

                {/* Resources Section */}
                <div className="space-y-10">
                    {/* Add Resource Form */}
                    <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                        <h2 className="text-2xl font-bold mb-6 text-primary">Add Resource</h2>
                        <form onSubmit={handleAddResource} className="space-y-4">
                            <input
                                className="w-full bg-gray-800 p-3 rounded text-white border border-gray-700 focus:border-primary outline-none transition-colors"
                                placeholder="Title"
                                value={resourceForm.title}
                                onChange={e => setResourceForm({ ...resourceForm, title: e.target.value })}
                                required
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <select
                                    className="w-full bg-gray-800 p-3 rounded text-white border border-gray-700 focus:border-primary outline-none transition-colors"
                                    value={resourceForm.category}
                                    onChange={e => setResourceForm({ ...resourceForm, category: e.target.value })}
                                >
                                    <option>O-Level Math</option>
                                    <option>O-Level CS</option>
                                    <option>A-Level CS</option>
                                </select>
                                <input
                                    className="w-full bg-gray-800 p-3 rounded text-white border border-gray-700 focus:border-primary outline-none transition-colors"
                                    placeholder="Link (PDF/Drive)"
                                    value={resourceForm.link}
                                    onChange={e => setResourceForm({ ...resourceForm, link: e.target.value })}
                                    required
                                />
                            </div>
                            <button className="w-full bg-secondary text-white font-bold py-3 rounded hover:bg-purple-600 transition-colors">
                                Upload Resource
                            </button>
                        </form>
                    </div>

                    {/* Resources List */}
                    <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                        <h2 className="text-2xl font-bold mb-6 text-white">Current Resources</h2>
                        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {resources.map(res => (
                                <div key={res._id} className="flex justify-between items-center bg-gray-800 p-3 rounded border border-gray-700 hover:border-gray-600 transition-colors">
                                    <div>
                                        <div className="font-bold text-sm">{res.title}</div>
                                        <div className="text-xs text-gray-400">{res.category}</div>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteResource(res._id)}
                                        className="text-red-500 hover:text-red-400 text-sm font-bold bg-red-500/10 px-3 py-1 rounded hover:bg-red-500/20 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                            {resources.length === 0 && <p className="text-gray-500 text-center">No resources found.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
