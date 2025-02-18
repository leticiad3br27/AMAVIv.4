import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import imagem from '../../../public/assets/img/Coracao.jpeg';
import styles from './page.module.css';
import MainLayout from '../layouts/MainLayout';
import Link from 'next/link'; 

export default function DoacaoPage() {
    return (
        <MainLayout>
            <div className={styles.container}>
                <Image src={imagem} alt="Imagem de um coração para doação" width={500} height={500} /> {}
                <Link href="/qr-code"> {}
                    <button className="btn btn-primary">Gerar Qr Code</button>
                </Link>
            </div>
        </MainLayout>
    );
}