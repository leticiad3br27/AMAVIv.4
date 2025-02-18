import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import imagem from '../../../public/assets/img/coracao.jpg';
import styles from '../styles/DoacaoPage.module.css';
import MainLayout from '../layouts/MainLayout';
import Link from 'next/link'; 

export default function DoacaoPage() {
    return (
        <MainLayout>
            <section className={`${styles.container} mt-5`}>
                <Image 
                    src={imagem} 
                    alt="Coração vermelho representando doação" 
                    margin-top={90}
                    width={300} 
                    height={300} 
                    priority
                />
                <Link href="/Qr.code">
                    <button className="btn btn-primary mt-3" aria-label="Gerar QR Code para doação">
                        Gerar QR Code
                    </button>
                </Link>
            </section>
        </MainLayout>
    );
}
