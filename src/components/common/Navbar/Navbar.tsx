// src/components/common/Navbar/Navbar.tsx (Versi Final yang Sadar Halaman)

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // DIUBAH: Impor Link dan useLocation
import styles from './Navbar.module.css';
import logo from '../../../assets/icons/logo.png';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const location = useLocation(); // BARU: Hook untuk mendapatkan info halaman saat ini

  const toggleMenu = () => { setIsOpen(prev => !prev); };
  const closeMenu = () => { setIsOpen(false); };
  
  // Fungsi untuk scroll smooth, dipanggil oleh link
  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    // Hanya jalankan scroll-to-view jika kita di halaman utama
    if (location.pathname === '/') {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      closeMenu();
    }
    // Jika di halaman lain dan klik link #home, biarkan Link dari react-router yang bekerja
  };

  // Efek untuk background navbar saat scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // DIUBAH: EFEK UNTUK INTERSECTION OBSERVER YANG SADAR HALAMAN
  useEffect(() => {
    // Jika kita tidak di halaman utama, reset activeSection dan hentikan proses
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const sections = document.querySelectorAll('section[id]');
    if (sections.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -70% 0px', // Sedikit diubah agar lebih responsif di tengah
      threshold: 0,
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

    // Cleanup function akan berjalan saat pindah halaman
    return () => {
      sections.forEach(sec => observer.unobserve(sec));
    };
  }, [location.pathname]); // DIUBAH: Jalankan ulang efek ini setiap kali URL berubah

  const menuVariants = { hidden: { opacity: 0, y: "-100%" }, visible: { opacity: 1, y: 0, transition: { when: "beforeChildren", staggerChildren: 0.1, delayChildren: 0.2, }, }, };
  const linkVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }, };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navContent}`}>
        {/* -- BAGIAN KIRI -- */}
        <div className={styles.navLeft}>
          {/* DIUBAH: Gunakan Link untuk navigasi SPA */}
          <Link to="/#home" onClick={(e) => handleScrollTo(e, 'home')}>
            <img src={logo} alt="My Portfolio Logo" className={styles.logoImage} />
          </Link>
        </div>

        {/* -- BAGIAN TENGAH -- */}
        <div className={styles.navCenter}>
          <ul className={styles.navLinks}>
            <li><Link to="/#home" onClick={(e) => handleScrollTo(e, 'home')} className={activeSection === 'home' ? styles.activeLink : ''}>Home</Link></li>
            <li><Link to="/#about" onClick={(e) => handleScrollTo(e, 'about')} className={activeSection === 'about' ? styles.activeLink : ''}>About</Link></li>
            <li><Link to="/#skills" onClick={(e) => handleScrollTo(e, 'skills')} className={activeSection === 'skills' ? styles.activeLink : ''}>Skills</Link></li>
            <li><Link to="/#projects" onClick={(e) => handleScrollTo(e, 'projects')} className={activeSection === 'projects' ? styles.activeLink : ''}>Projects</Link></li>
            {/* BARU: Menambahkan kembali link Arcade */}
            <li><Link to="/games" className={location.pathname === '/games' ? styles.activeLink : ''}>Arcade</Link></li>
          </ul>
        </div>

        {/* -- BAGIAN KANAN -- */}
        <div className={styles.navRight}>
          <div className={styles.contactButtonContainer}>
             <Link to="/#contact" onClick={(e) => handleScrollTo(e, 'contact')} className={styles.contactLink}>Contact</Link>
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
              <motion.li variants={linkVariants}><Link to="/#home" onClick={(e) => handleScrollTo(e, 'home')}>Home</Link></motion.li>
              <motion.li variants={linkVariants}><Link to="/#about" onClick={(e) => handleScrollTo(e, 'about')}>About</Link></motion.li>
              <motion.li variants={linkVariants}><Link to="/#skills" onClick={(e) => handleScrollTo(e, 'skills')}>Skills</Link></motion.li>
              <motion.li variants={linkVariants}><Link to="/#projects" onClick={(e) => handleScrollTo(e, 'projects')}>Projects</Link></motion.li>
              {/* BARU: Menambahkan kembali link Arcade di mobile */}
              <motion.li variants={linkVariants}><Link to="/games" onClick={closeMenu}>Arcade</Link></motion.li>
            </motion.ul>
            <motion.div variants={linkVariants} className={styles.mobileContactButton}>
              <Link to="/#contact" onClick={(e) => handleScrollTo(e, 'contact')} className={styles.contactLink}>Contact</Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;