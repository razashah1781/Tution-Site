import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useVibe } from '../context/VibeContext';
import { Download, FileText, ExternalLink } from 'lucide-react';

const Resources = () => {
    const { t } = useVibe();
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/resources`);
                setResources(res.data);
            } catch (err) {
                console.error("Failed to fetch resources");
            } finally {
                setLoading(false);
            }
        };
        fetchResources();
    }, []);

    // Group resources by category
    const groupedResources = resources.reduce((acc, resource) => {
        const category = resource.category || 'General';
        if (!acc[category]) acc[category] = [];
        acc[category].push(resource);
        return acc;
    }, {});

    return (
        <div className="min-h-screen pt-24 px-6 max-w-7xl mx-auto pb-20">
            <Helmet>
                <title>{t("Resources | Raza's Hub", "Loot Drop | Raza's Base")}</title>
            </Helmet>

            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary mb-4">
                    {t("Study Resources", "The Loot")}
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    {t(
                        "Access past papers, notes, and cheat sheets to ace your exams.",
                        "Grab the cheat codes. Don't be a bot."
                    )}
                </p>
            </div>

            {loading ? (
                <div className="text-center text-primary animate-pulse">Loading loot...</div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Object.keys(groupedResources).length === 0 ? (
                        <p className="text-gray-500 col-span-full text-center">No resources uploaded yet.</p>
                    ) : (
                        Object.entries(groupedResources).map(([category, items]) => (
                            <div key={category} className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6">
                                <h2 className="text-2xl font-heading font-bold text-secondary mb-6 border-b border-gray-700 pb-2">
                                    {category}
                                </h2>
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <a
                                            key={item._id}
                                            href={item.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="block group bg-gray-800 p-4 rounded-xl border border-gray-700 hover:border-primary transition-all hover:-translate-y-1"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-3">
                                                    <FileText className="text-primary w-5 h-5 flex-shrink-0" />
                                                    <span className="font-bold text-gray-200 group-hover:text-white transition-colors">
                                                        {item.title}
                                                    </span>
                                                </div>
                                                <ExternalLink className="text-gray-500 w-4 h-4 group-hover:text-primary transition-colors" />
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Resources;
