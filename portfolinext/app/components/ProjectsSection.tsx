'use client'

import Image from 'next/image'
import { motion, Variants } from 'framer-motion'

export default function ProjectsSection() {
    const projects = [
        {
            image: '/imgs/new/tornado.png',
            subtitle: 'Data Engineering, API & Project Management',
            title: 'Tornado: Campus Mobility Analytics',
            description: 'Developed a comprehensive data analytics dashboard leveraging campus Wi-Fi logs to predict mobility patterns. Served as Project Manager, Data Engineer, and API Developer to integrate open data and deliver actionable insights.',
            github: '',
        },
        {
            image: '/imgs/new/growtalk.png',
            subtitle: 'AI Engineering & Project Management',
            title: 'GrowTalk: AI Land Management Chatbot',
            description: 'An AI-powered mobile application that utilizes satellite imagery and public open data to advise landowners on crop selection and land management strategies. Acted as Project Manager and AI Engineer.',
            github: '',
        },
        {
            image: '/imgs/new/etc.png',
            subtitle: 'LLM Integration & Automation',
            title: 'Applied LLM & Workflow Automation',
            description: 'Implemented various LLM-based services, including an intelligent calorie-tracking application and complex automated business workflows using n8n, demonstrating practical AI solutions for real-world tasks.',
            github: '',
        },
    ]

    const fadeUpVariant: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
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

    return (
        <section className="projects section" id="projects">
            <h2 className="section__title-1">
                <span>Projects.</span>
            </h2>

            <motion.div
                className="projects__container container grid"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {projects.map((project, index) => (
                    <motion.article
                        className="projects__card"
                        key={index}
                        variants={fadeUpVariant}
                        whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    >
                        <div className="projects__image">
                            <Image
                                src={project.image}
                                alt={project.title}
                                className="projects__img"
                                width={400}
                                height={250}
                                style={{ objectFit: 'cover', width: '100%' }}
                            />
                        </div>

                        <div className="projects__content">
                            <h3 className="projects__subtitle">{project.subtitle}</h3>
                            <h2 className="projects__title">{project.title}</h2>
                            <p className="projects__description">{project.description}</p>
                        </div>

                        {project.github && (
                            <div className="projects__buttons">
                                <a href={project.github} target="_blank" className="projects__links">
                                    <i className="ri-github-fill"></i> View
                                </a>
                            </div>
                        )}
                    </motion.article>
                ))}
            </motion.div>
        </section>
    )
}
