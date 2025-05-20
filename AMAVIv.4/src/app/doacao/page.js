"use client"
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import qrCode from '../../../public/assets/img/doacao.jpeg'; // Substitua pela sua imagem de QR Code
import styles from '../styles/DoacaoPage.module.css';
import MainLayout from '../layouts/MainLayout';
export default function DoacaoPage() {
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Chave copiada para a área de transferência!');
        }).catch(err => {
            console.error('Erro ao copiar: ', err);
        });
    };
    return (
        <MainLayout>
            <section className={`${styles.container} container mt-5 p-4 bg-light rounded`}>
                <div className="text-center">
                    <h1 className="mb-4">Ajude a Transformar Vidas</h1>
                    <p className="lead">
                        Sua contribuição é essencial para continuarmos promovendo inclusão, apoio e desenvolvimento
                        de pessoas autistas e suas famílias. Qualquer valor faz a diferença!
                    </p>
                </div>
                <div className="text-center" id="qrCode">
                    <h4 className={styles.subTitle}>Doação via QR Code</h4>
                    <div className={styles.qrWrapper}>
                        <Image
                            src={qrCode}
                            alt="QR Code para doação via Pix"
                            layout="responsive"
                            width={300}
                            height={300}
                            className={styles.qrImage}
                            priority
                        />
                    </div>
                    <p className="mt-3">Aponte a câmera do seu celular para o QR Code acima e doe via Pix.</p>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h4 className="mb-3 text-center">Chaves Pix disponíveis</h4>
                        <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                E-mail: 
                                <span className="fw-bold">doacoes@instituicao.org</span>
                                <button className="btn btn-outline-secondary btn-sm" onClick={() => copyToClipboard('doacoes@instituicao.org')}>Copiar</button>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                CNPJ: 
                                <span className="fw-bold">12.345.678/0001-90</span>
                                <button className="btn btn-outline-secondary btn-sm" onClick={() => copyToClipboard('12.345.678/0001-90')}>Copiar</button>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Telefone: 
                                <span className="fw-bold">(69) 99999-9999</span>
                                <button className="btn btn-outline-secondary btn-sm" onClick={() => copyToClipboard('(69) 99999-9999')}>Copiar</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="text-center mt-5">
                    <h5>Histórias de Impacto</h5>
                    <p className="text-muted">"Graças à sua doação, meu filho teve acesso a terapias que mudaram a vida dele!" - Maria, mãe de um autista</p>
                    <p className="text-muted">Obrigado por fazer parte dessa causa com a gente! 💙</p>
                </div>
            </section>
        </MainLayout>
    );
}