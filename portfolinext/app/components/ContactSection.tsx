'use client'

import { useState } from 'react'
import { motion, Variants } from 'framer-motion'

export default function ContactSection() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [status, setStatus] = useState<'' | 'sending'>('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('sending')

        try {
            const response = await fetch('https://formsubmit.co/ajax/kritsanaphong.ya@rmuti.ac.th', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                alert('Thank you! I will get back to you shortly 🙏')
                setFormData({ name: '', email: '', message: '' })
            } else {
                alert('Oops! Something went wrong, please try again.')
            }
        } catch (error) {
            alert('Oops! Something went wrong, please try again.')
        } finally {
            setStatus('')
        }
    }

    const slideInLeft: Variants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
    }

    const slideInRight: Variants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } }
    }

    return (
        <section className="contact section" id="contact">
            <h2 className="section__title-2">
                <span>Contact Me.</span>
            </h2>

            <div className="contact__container container grid">
                {/* Left: Info */}
                <motion.div
                    className="contact__info"
                    variants={slideInLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <p className="contact__description">
                        Interested in working together or just want to chat? Feel free to reach out!
                    </p>

                    <div className="contact__links">
                        <a href="mailto:kritsanaphong.ya@rmuti.ac.th" className="contact__link">
                            <div className="contact__link-icon">
                                <i className="ri-mail-line"></i>
                            </div>
                            <div>
                                <span className="contact__link-label">Email</span>
                                <span className="contact__link-value">kritsanaphong.ya@rmuti.ac.th</span>
                            </div>
                        </a>

                        <a href="https://github.com/Kkirari" target="_blank" className="contact__link">
                            <div className="contact__link-icon">
                                <i className="ri-github-line"></i>
                            </div>
                            <div>
                                <span className="contact__link-label">GitHub</span>
                                <span className="contact__link-value">github.com/Kkirari</span>
                            </div>
                        </a>

                        <a href="https://www.kaggle.com/kissanaphongyaset" target="_blank" className="contact__link">
                            <div className="contact__link-icon">
                                <i className="ri-bar-chart-box-line"></i>
                            </div>
                            <div>
                                <span className="contact__link-label">Kaggle</span>
                                <span className="contact__link-value">kaggle.com/kissanaphongyaset</span>
                            </div>
                        </a>

                        <div className="contact__link">
                            <div className="contact__link-icon">
                                <i className="ri-phone-line"></i>
                            </div>
                            <div>
                                <span className="contact__link-label">Phone</span>
                                <span className="contact__link-value">099-464-5859</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right: Form */}
                <motion.form
                    className="contact__form"
                    onSubmit={handleSubmit}
                    variants={slideInRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <div className="contact__form-group">
                        <label className="contact__label">Name</label>
                        <input
                            className="contact__input"
                            type="text"
                            name="name"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="contact__form-group">
                        <label className="contact__label">Email</label>
                        <input
                            className="contact__input"
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="contact__form-group">
                        <label className="contact__label">Message</label>
                        <textarea
                            className="contact__input contact__textarea"
                            name="message"
                            placeholder="Hello there..."
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="contact__btn"
                        disabled={status === 'sending'}
                    >
                        <i className="ri-send-plane-line"></i> {status === 'sending' ? 'Sending...' : 'Send Message'}
                    </motion.button>
                </motion.form>
            </div>
        </section>
    )
}
