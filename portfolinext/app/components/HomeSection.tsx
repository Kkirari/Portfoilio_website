'use client'

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { motion, Variants } from 'framer-motion'
import ReactMarkdown from 'react-markdown'

type Message = {
    from: 'user' | 'bot'
    text: string
}

const sampleMessages: Message[] = [
    { from: 'bot', text: "Hi! I'm Kissanaphong's AI 👋 Ask me anything about him!" },

]

export default function HomeSection() {
    const [messages, setMessages] = useState<Message[]>(sampleMessages)
    const [input, setInput] = useState('')
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, [messages, isLoading])

    const handleSend = async (textToSend?: string) => {
        const messageText = typeof textToSend === 'string' ? textToSend : input
        if (!messageText.trim() || isLoading) return

        const newUserMessage: Message = { from: 'user', text: messageText }
        const updatedMessages = [...messages, newUserMessage]

        setMessages(updatedMessages)
        if (typeof textToSend !== 'string') setInput('')
        setIsLoading(true)

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: updatedMessages })
            })

            const data = await response.json()

            if (response.ok && data.response) {
                setMessages(prev => [...prev, { from: 'bot', text: data.response }])
            } else {
                setMessages(prev => [...prev, { from: 'bot', text: 'Error: Cannot connect to AI.' }])
            }
        } catch (error) {
            setMessages(prev => [...prev, { from: 'bot', text: 'Error: Cannot connect to AI.' }])
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend()
    }

    const handleQuickPrompt = (promptText: string) => {
        handleSend(promptText)
    }

    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    }

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const scaleIn: Variants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
    }

    const slideInRight: Variants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
    }

    return (
        <section className="home section" id="home">
            <div className="home__v2-container container">

                {/* ===== TOP: Greeting Text ===== */}
                <motion.div
                    className="home__top"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <motion.p variants={fadeInUp} className="home__hello">Hello, I&apos;m</motion.p>
                    <motion.h1 variants={fadeInUp} className="home__name">Kissanaphong Yaset</motion.h1>
                    <motion.p variants={fadeInUp} className="home__role">
                        <span className="home__role-dot"></span>
                        AI Engineer · Data Engineer
                    </motion.p>
                </motion.div>

                {/* ===== MIDDLE: Photo + Chatbot ===== */}
                <div className="home__middle">
                    <motion.div
                        className="home__photo-wrap"
                        variants={scaleIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        <Image
                            src="/imgs/Cover_copy.jpg"
                            alt="Kissanaphong Yaset"
                            className="home__photo"
                            width={420}
                            height={520}
                            priority
                            style={{ objectFit: 'cover' }}
                        />
                    </motion.div>

                    <motion.div
                        className="chatbot"
                        variants={slideInRight}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <div className="chatbot__header">
                            <div className="chatbot__avatar">
                                <i className="ri-robot-2-line"></i>
                            </div>
                            <div className="chatbot__header-info">
                                <span className="chatbot__name">Kissanaphong AI</span>
                                <span className="chatbot__status">
                                    <span className="chatbot__dot"></span> Online
                                </span>
                            </div>
                            <span className="chatbot__badge">Chat with me</span>
                        </div>

                        <div className="chatbot__messages">
                            {messages.map((msg, i) => (
                                <div key={i} className={`chatbot__bubble chatbot__bubble--${msg.from}`}>
                                    {msg.from === 'bot' && (
                                        <div className="chatbot__bubble-avatar">
                                            <i className="ri-robot-2-line"></i>
                                        </div>
                                    )}
                                    <div className="chatbot__bubble-text">
                                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="chatbot__bubble chatbot__bubble--bot">
                                    <div className="chatbot__bubble-avatar">
                                        <i className="ri-robot-2-line"></i>
                                    </div>
                                    <div className="chatbot__bubble-text">
                                        <span className="chatbot__typing">...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {messages.length === 1 && !isLoading && (
                            <motion.div
                                className="chatbot__quick-prompts"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                            >
                                <button className="chatbot__prompt-chip" onClick={() => handleQuickPrompt("ทักษะเด่นๆ ของคุณกานต์มีอะไรบ้าง?")}>
                                    ✨ ทักษะของคุณ
                                </button>
                                <button className="chatbot__prompt-chip" onClick={() => handleQuickPrompt("ช่วยเล่าเกี่ยวกับโปรเจกต์ Tornado ให้ฟังหน่อย")}>
                                    🌪️ โปรเจกต์ Tornado
                                </button>
                                <button className="chatbot__prompt-chip" onClick={() => handleQuickPrompt("มีช่องทางติดต่อเขายังไงบ้าง?")}>
                                    📞 ช่องทางติดต่อ
                                </button>
                            </motion.div>
                        )}

                        <div className="chatbot__input-row">
                            <input
                                className="chatbot__input"
                                type="text"
                                placeholder="Ask me anything..."
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                disabled={isLoading}
                            />
                            <button
                                className="chatbot__send"
                                onClick={() => handleSend()}
                                aria-label="Send"
                                disabled={isLoading}
                            >
                                <i className="ri-send-plane-fill"></i>
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* ===== BOTTOM: Social Links ===== */}
                <motion.div
                    className="home__bottom"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.a variants={scaleIn} whileHover={{ scale: 1.1 }} href="https://github.com/Kkirari" target="_blank" className="home__social-icon" title="GitHub">
                        <i className="ri-github-fill"></i>
                    </motion.a>
                    <motion.a variants={scaleIn} whileHover={{ scale: 1.1 }} href="mailto:kritsanaphong.ya@rmuti.ac.th" className="home__social-icon" title="Email">
                        <i className="ri-mail-fill"></i>
                    </motion.a>
                    <motion.a variants={scaleIn} whileHover={{ scale: 1.1 }} href="#" className="home__social-icon" title="YouTube">
                        <i className="ri-youtube-fill"></i>
                    </motion.a>
                    <motion.a variants={scaleIn} whileHover={{ scale: 1.1 }} href="https://www.kaggle.com/kissanaphongyaset" target="_blank" className="home__social-icon" title="Kaggle">
                        <i className="ri-bar-chart-box-line"></i>
                    </motion.a>
                    <motion.a variants={fadeInUp} href="#about" className="home__scroll-link">
                        <i className="ri-arrow-down-line"></i>
                    </motion.a>
                </motion.div>

            </div>
        </section>
    )
}
