'use client'

import { useState, useEffect } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [shadowHeader, setShadowHeader] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShadowHeader(window.scrollY >= 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`header${shadowHeader ? ' shadow-header' : ''}`} id="header">
      <nav className="nav container">
        <a href="#" className="nav__logo">
          <span className="nav__logo-circle">K</span>
          <span className="nav__logo-name">My Portfolio.</span>
        </a>

        <div className={`nav__menu${menuOpen ? ' show-menu' : ''}`} id="nav-menu">
          <span className="nav__title">Menu</span>
          <h3 className="nav__name">Kissanapong Yaset</h3>
          <ul className="nav__list">
            <li className="nav__item">
              <a href="#home" className="nav__link" onClick={closeMenu}>Home</a>
            </li>
            <li className="nav__item">
              <a href="#about" className="nav__link" onClick={closeMenu}>About Me</a>
            </li>
            <li className="nav__item">
              <a href="#skills" className="nav__link" onClick={closeMenu}>Technical Skills</a>
            </li>
            <li className="nav__item">
              <a href="#projects" className="nav__link" onClick={closeMenu}>Projects</a>
            </li>
            <li className="nav__item">
              <a href="#contact" className="nav__link" onClick={closeMenu}>Contact</a>
            </li>
          </ul>

          <div className="nav__close" id="nav-close" onClick={closeMenu}>
            <i className="ri-close-line"></i>
          </div>
        </div>

        <div className="nav__buttons">
          <div className="nav__toggle" id="nav-toggle" onClick={() => setMenuOpen(true)}>
            <i className="ri-menu-4-line"></i>
          </div>
        </div>
      </nav>
    </header>
  )
}
