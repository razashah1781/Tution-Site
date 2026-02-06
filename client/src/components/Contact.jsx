import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Instagram } from 'lucide-react';
import { useVibe } from '../context/VibeContext';

const ContactSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    subject: Yup.string().required('Required'),
    message: Yup.string().required('Required'),
});

const Contact = () => {
    const { t } = useVibe();

    const formik = useFormik({
        initialValues: { name: '', email: '', subject: 'O-Level Math', message: '' },
        validationSchema: ContactSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                await axios.post(`${import.meta.env.VITE_API_URL}/api/leads`, values);
                alert(t("Message Sent!", "Slid into DMs successfully!"));
                resetForm();
            } catch (err) {
                console.error(err);
                alert("Error sending message");
            }
        },
    });

    return (
        <section className="py-20 px-6 max-w-4xl mx-auto" id="contact">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-center mb-10 text-primary">
                {t("Contact Me", "Hit Me Up")}
            </h2>

            <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 shadow-xl backdrop-blur-sm">
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm mb-2 text-gray-400">Name</label>
                            <input
                                name="name"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                className="w-full bg-gray-800 p-3 rounded border border-gray-700 focus:border-primary outline-none text-white"
                            />
                            {formik.errors.name && formik.touched.name && <div className="text-red-500 text-xs mt-1">{formik.errors.name}</div>}
                        </div>
                        <div>
                            <label className="block text-sm mb-2 text-gray-400">Email</label>
                            <input
                                name="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                className="w-full bg-gray-800 p-3 rounded border border-gray-700 focus:border-primary outline-none text-white"
                            />
                            {formik.errors.email && formik.touched.email && <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm mb-2 text-gray-400">Subject</label>
                        <select
                            name="subject"
                            onChange={formik.handleChange}
                            value={formik.values.subject}
                            className="w-full bg-gray-800 p-3 rounded border border-gray-700 focus:border-primary outline-none text-white"
                        >
                            <option>O-Level Math</option>
                            <option>O-Level CS</option>
                            <option>A-Level CS</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm mb-2 text-gray-400">Message</label>
                        <textarea
                            name="message"
                            rows="4"
                            onChange={formik.handleChange}
                            value={formik.values.message}
                            className="w-full bg-gray-800 p-3 rounded border border-gray-700 focus:border-primary outline-none resize-none text-white"
                        ></textarea>
                        {formik.errors.message && formik.touched.message && <div className="text-red-500 text-xs mt-1">{formik.errors.message}</div>}
                    </div>

                    <button type="submit" className="w-full py-4 bg-primary text-black font-bold font-heading rounded hover:bg-cyan-400 transition-all transform hover:scale-105">
                        {t("Send Message", "Send It")}
                    </button>
                </form>

                {/* Calendly Link Button */}
                <div className="mt-8 text-center flex flex-col gap-4 justify-center items-center">
                    <div>
                        <p className="text-gray-400 mb-4">{t("Or book directly:", "Or just pull up:")}</p>
                        <a
                            href="https://calendly.com"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block px-8 py-3 border border-secondary text-secondary font-bold rounded hover:bg-secondary/10 transition-all hover:text-white"
                        >
                            {t("Schedule a Call", "Book the Sesh")}
                        </a>
                    </div>

                    <div>
                        <p className="text-gray-400 mb-4">{t("Connect on Insta:", "Stalk the Gram:")}</p>
                        <a
                            href="https://instagram.com/razashub"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-3 border border-pink-500 text-pink-500 font-bold rounded hover:bg-pink-500/10 transition-all hover:text-white"
                        >
                            <Instagram className="w-5 h-5" />
                            <span>@razashub</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
