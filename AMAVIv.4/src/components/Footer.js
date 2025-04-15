"use client";

import styles from './Footer.module.css';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; {new Date().getFullYear()} AMAVI todos os direitos reservados.</p>
        <div className={styles.socialLinks}>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
        </div>
        <a href="https://sobre-amavi.vercel.app/" className={styles.footerLink}>Sobre Nós</a>
      </div>
    </footer>
  );
}
