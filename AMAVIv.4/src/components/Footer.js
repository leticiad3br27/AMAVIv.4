"use client";

import styles from './Footer.module.css';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className={styles.addressCard}>
          <h3><FaMapMarkerAlt /> Endereço</h3>
          <hr />
          <p>
            Rua Jardim América, 3455, Sala 3 - Centro (S-01)<br />
            Vilhena - RO, Brasil<br />
            CEP 76980-102
          </p>
        </div>

        <div className={styles.logoSection}>
          <img src="/assets/img/AMAVILOGO1.png" alt="Logo da AMAVI" className={styles.logo} />
          <h2 className={styles.brand}>AMAVI</h2>
          <div className={styles.socials}>
            <a href="https://www.facebook.com" target="_blank" aria-label="Facebook"><FaFacebook /></a>
            <a href="https://www.linkedin.com" target="_blank" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="https://www.instagram.com" target="_blank" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://www.twitter.com" target="_blank" aria-label="Twitter"><FaTwitter /></a>
          </div>
        </div>

        <div className={styles.linksSection}>
          <div>
            <h4>Funcionalidades</h4>
            <ul>
              <li>Atendimentos</li>
              <li>Doações</li>
              <li>Eventos</li>
              <li>Agendamentos</li>
              <li>Voluntariado</li>
            </ul>
          </div>
          <div>
            <h4>Sobre a AMAVI</h4>
            <ul>
              <li><a href="https://sobre-amavi.vercel.app/">Quem somos</a></li>
              <li><a href="https://sobre-amavi.vercel.app/">Contato</a></li>
              <li><a href="https://sobre-amavi.vercel.app/">Nossa equipe</a></li>
              <li><a href="https://sobre-amavi.vercel.app/">Histórico</a></li>
            </ul>
          </div>
          <div>
            <h4>Suporte</h4>
            <a href="mailto:suporte.amavi@gmail.com" className={styles.supportButton}>
              Enviar e-mail para o suporte
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>AMAVI &copy; {new Date().getFullYear()} – Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
