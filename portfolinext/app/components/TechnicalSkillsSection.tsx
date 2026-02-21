'use client'

import { motion, Variants } from 'framer-motion'

export default function TechnicalSkillsSection() {
    const fadeUpVariant: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    }

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    }
    const skillGroups = [
        {
            category: 'AI & Data Engineering',
            icon: 'ri-brain-line',
            skills: [
                'Machine Learning',
                'Data Pipelines',
                'Data Analysis',
                'LLM Integration',
                'RAG Systems',
            ],
        },
        {
            category: 'Software Architecture',
            icon: 'ri-server-line',
            skills: ['Python', 'Golang', 'TypeScript', 'API Design'],
        },
        {
            category: 'Leadership & Soft Skills',
            icon: 'ri-team-line',
            skills: [
                'Project Management',
                'Technical Pitching',
                'Cross-functional Communication',
            ],
        },
        {
            category: 'Tools & Technologies',
            icon: 'ri-tools-fill',
            skills: ['Git', 'Cloud Basics (AWS/GCP)', 'SQL/NoSQL'],
        },
    ]

    return (
        <section className="skills section" id="skills">
            <h2 className="section__title-1">
                <span>Technical Skills.</span>
            </h2>

            <motion.div
                className="skills__container container"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {skillGroups.map((group, gi) => (
                    <motion.div variants={fadeUpVariant} className="skills__group" key={gi}>
                        <div className="skills__group-header">
                            <i className={group.icon}></i>
                            <h3 className="skills__group-title">{group.category}</h3>
                        </div>
                        <div className="skills__list">
                            {group.skills.map((skill, si) => (
                                <div className="skills__item" key={si}>
                                    <div className="skills__item-header">
                                        <i className="ri-checkbox-circle-line"></i>
                                        <span className="skills__name">{skill}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    )
}
