// src/components/common/Navbar/Navbar.tsx
import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import logo from '../../../assets/icons/logo.png';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // BARU: State untuk melacak section yang aktif
  const [activeSection, setActiveSection] = useState<string>('home'); 

  const toggleMenu = () => { setIsOpen(prev => { const newState = !prev; if (newState) { document.body.classList.add('no-scroll'); } else { document.body.classList.remove('no-scroll'); } return newState; }); };
  const closeMenu = () => { setIsOpen(false); document.body.classList.remove('no-scroll'); };

  // EFEK UNTUK BACKGROUND NAVBAR SAAT SCROLL (TETAP SAMA)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // BARU: EFEK UNTUK INTERSECTION OBSERVER
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');

    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.6, // 60% dari section harus terlihat
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(sec => observer.observe(sec));

    // Cleanup function
    return () => {
      sections.forEach(sec => observer.unobserve(sec));
    };
  }, []); // Jalankan hanya sekali saat komponen dimuat

  // FUNGSI isLinkActive DIHAPUS, KARENA SUDAH TIDAK DIPERLUKAN

  const menuVariants = { hidden: { opacity: 0, y: "-100%" }, visible: { opacity: 1, y: 0, transition: { when: "beforeChildren", staggerChildren: 0.1, delayChildren: 0.2, }, }, };
  const linkVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }, };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navContent}`}>
        {/* -- BAGIAN KIRI -- */}
        <div className={styles.navLeft}>
          <a href="#home" onClick={(e) => { e.preventDefault(); document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); closeMenu(); }}>
            <img src={logo} alt="My Portfolio Logo" className={styles.logoImage} />
          </a>
        </div>

        {/* -- BAGIAN TENGAH (HANYA TAMPIL DI DESKTOP) -- */}
        <div className={styles.navCenter}>
          <ul className={styles.navLinks}>
            {/* DIUBAH: Menggunakan state 'activeSection' */}
            <li><a href="#home" className={activeSection === 'home' ? styles.activeLink : ''}>Home</a></li>
            <li><a href="#about" className={activeSection === 'about' ? styles.activeLink : ''}>About</a></li>
            <li><a href="#skills" className={activeSection === 'skills' ? styles.activeLink : ''}>Skills</a></li>
            <li><a href="#projects" className={activeSection === 'projects' ? styles.activeLink : ''}>Projects</a></li>
          </ul>
        </div>

        {/* -- BAGIAN KANAN -- */}
        <div className={styles.navRight}>
          <div className={styles.contactButtonContainer}>
            <a href="#contact" className={styles.contactLink}>Contact</a>
          </div>
        
          <div className={`${styles.hamburger} ${isOpen ? styles.open : ''}`} onClick={toggleMenu}>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
          </div>
        </div>
      </div>

      {/* -- MENU MOBILE -- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div className={styles.mobileNavWrapper} variants={menuVariants} initial="hidden" animate="visible" exit="hidden">
            <motion.ul className={styles.mobileNavLinks}>
              <motion.li variants={linkVariants}><a href="#home" onClick={closeMenu}>Home</a></motion.li>
              <motion.li variants={linkVariants}><a href="#about" onClick={closeMenu}>About</a></motion.li>
              <motion.li variants={linkVariants}><a href="#skills" onClick={closeMenu}>Skills</a></motion.li>
              <motion.li variants={linkVariants}><a href="#projects" onClick={closeMenu}>Projects</a></motion.li>
            </motion.ul>
            <motion.div variants={linkVariants} className={styles.mobileContactButton}>
              <a href="#contact" onClick={closeMenu} className={styles.contactLink}>Contact</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;