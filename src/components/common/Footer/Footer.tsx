// src/components/common/Footer/Footer.tsx
import React from 'react';
import styles from './Footer.module.css';
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import logo from '../../../assets/icons/logo.png';

const Footer: React.FC = () => {
const currentYear = new Date().getFullYear();
const quote = "The only way to do great work is to love what you do.";

return (
  <footer className={styles.footer}>
	<div className="container">
	  <div className={styles.footerContent}>

		{/* -- KOLOM KIRI: BRAND -- */}
		<div className={styles.footerBrand}>
		  <a href="#home">
			<img src={logo} alt="My Portfolio Logo" className={styles.footerLogo} />
		  </a>
		</div>

		{/* -- KOLOM TENGAH: QUOTE -- */}
		<div className={styles.footerQuoteContainer}>
		  <p className={styles.footerQuote}>"{quote}"</p>
		</div>

		{/* -- KOLOM KANAN: HANYA SOSIAL MEDIA -- */}
		<div className={styles.footerRightSection}>
		  <div className={styles.footerSocial}>
			<h3>Connect with me!</h3>
			<div className={styles.socialIcons}>
			  <a href="https://www.instagram.com/hilmybaihaaqi_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
			  <a href="https://www.facebook.com/hilmy.baihaqi.338?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
			  <a href="https://www.linkedin.com/in/hilmy-baihaqi-bb4619283/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
			  <a href="https://github.com/hilmybaihaqii" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
			</div>
		  </div>
		</div>

	  </div>
	  <div className={styles.footerBottom}>
		<p>&copy; {currentYear} Hilmy Baihaqi. All rights reserved. | Built with ❤️ and Coffee</p>
	  </div>
	</div>
  </footer>
);
};

export default Footer;