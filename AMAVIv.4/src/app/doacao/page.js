import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import qrCode from '../../../public/assets/img/image.png'; // Substitua pela sua imagem de QR Code
import styles from '../styles/DoacaoPage.module.css';
import MainLayout from '../layouts/MainLayout';

export default function DoacaoPage() {
    return (
        <MainLayout>
            <section className={`${styles.container} container mt-5`}>
                <div className="text-center">
                    <h1 className="mb-4">Ajude a Transformar Vidas</h1>
                    <p className="lead">
                        Sua contribuição é essencial para continuarmos promovendo inclusão, apoio e desenvolvimento
                        de pessoas autistas e suas famílias. Qualquer valor faz a diferença!
                    </p>
                </div>

                <div className="text-center">
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
                                E-mail: <span className="fw-bold">doacoes@instituicao.org</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                CNPJ: <span className="fw-bold">12.345.678/0001-90</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Telefone: <span className="fw-bold">(69) 99999-9999</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="text-center mt-5">
                    <p className="text-muted">Obrigado por fazer parte dessa causa com a gente! 💙</p>
                </div>
            </section>
        </MainLayout>
    );
}
