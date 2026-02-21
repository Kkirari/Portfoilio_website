'use client'

import Image from 'next/image'
import { motion, Variants } from 'framer-motion'

export default function AboutSection() {
    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    }

    const slideInLeft: Variants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
    }

    const slideInRight: Variants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
    }

    return (
        <section className="about section" id="about">
            <div className="about__container container grid">
                <h2 className="section__title-1">
                    <span>About Me.</span>
                </h2>

                <motion.div
                    className="about__perfil"
                    variants={slideInLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <div className="about__image">
                        <Image
                            src="/imgs/IMG_18321.JPG"
                            alt="About Kissanaphong"
                            className="about__img"
                            width={350}
                            height={450}
                            style={{ objectFit: 'cover' }}
                        />
                        <div className="about__shadow"></div>
                    </div>
                </motion.div>

                <motion.div
                    className="about__info"
                    variants={slideInRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <p className="about__description">
                        <b>A Computer Science student passionate about all realms of computing,</b>
                        <br />with a deep-rooted focus on AI and Data.
                        <br />Aspiring to build a career as a Data Engineer or AI Engineer.
                        <br />What sets me apart is my ability to bridge the gap between technical execution and business vision.
                        <br />Beyond coding, I am an effective Project Manager and a confident frontman for pitching,
                        <br />capable of translating complex technical solutions into compelling stories.
                        <br /><br />
                    </p>

                    <ul className="about__list space-y-4 text-gray-700">
                        <li className="about__item">
                            <b className="text-terra-500">Being Perfaction failing fast and learning faster.</b>
                        </li>

                        <li className="about__item">
                            <b className="text-terra-500">Hobby : </b>
                            Novel Reader ,Figtion Enjoyner ,RPG DND Player ,
                        </li>


                    </ul>
                </motion.div>
            </div>
        </section>
    )
}
