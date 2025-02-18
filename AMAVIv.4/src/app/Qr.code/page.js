import React from 'react';
import Image from 'next/image';
import imagem from '../../../public/assets/img/doacao.jpeg';
import styles from './page.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainLayout from '../layouts/MainLayout'

export default function qrCodePage(){
    return(
        <MainLayout>
    <div className={styles.container}>
        <Image src= {imagem} alt="html5"/>
        <a href=''><button className="btn btn-primary">Concluído</button></a>
    </div>
        </MainLayout>
    )
}