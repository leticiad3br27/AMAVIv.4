"use client";

import styles from './Footer.module.css';
import { FaInstagram, FaFacebook, FaTwitter, FaHeart } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerRow}>
          <div className={styles.footerCol}>
            <p className={styles.copyright}>
              &copy; {new Date().getFullYear()} AMAVI - Todos os direitos reservados.
            </p>
            <p className={styles.madeWith}>
              Feito com <FaHeart className={styles.heartIcon} /> em Vilhena RO
            </p>
          </div>
          
          <div className={styles.footerCol}>
            <div className={styles.socialLinks}>
              <a 
                href="https://www.instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={styles.socialLink}
              >
                <FaInstagram />
              </a>
              <a 
                href="https://www.facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
                className={styles.socialLink}
              >
                <FaFacebook />
              </a>
              <a 
                href="https://www.twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Twitter"
                className={styles.socialLink}
              >
                <FaTwitter />
              </a>
            </div>
          </div>
          
          <div className={styles.footerCol}>
            <a 
              href="https://sobre-amavi.vercel.app/" 
              className={styles.footerLink}
              aria-label="Sobre nós"
            >
              Sobre Nós
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}