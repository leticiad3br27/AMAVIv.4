"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import MainLayout from "../layouts/MainLayout"; 

export default function InscricaoVaga() {
    const [formData, setFormData] = useState({ nome: "", dependente: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Inscrição realizada com sucesso!");
    };

    return (
        <MainLayout>
            <div className={`${styles.flex} ${styles.flexCol} ${styles.itemsCenter} ${styles.justifyCenter} ${styles.minHScreen} ${styles.p4}`}>
                <div className={`${styles.wFull} ${styles.maxWmd} ${styles.bgWhite} ${styles.shadowLg} ${styles.roundedLg} ${styles.p6} ${styles.textCenter}`}>
                    <img
                        src="/assets/img/Criança brincando com um ábaco de madeira colorido _ Foto Grátis.jpg" // Substitua pelo caminho correto da imagem
                        alt="Atividade com criança"
                        className={`${styles.wFull} ${styles.roundedLg} ${styles.mb4}`}
                    />
                    <h2 className={`${styles.textLg} ${styles.fontBold} ${styles.mb2}`}>
                        Temos uma lista de vagas. Você gostaria de se candidatar?
                    </h2>
                    <p className={`${styles.textSm} ${styles.textGray500} ${styles.mb4}`}>N. inscrições: 0/100</p>
                    <form onSubmit={handleSubmit} className={`${styles.flex} ${styles.flexCol} ${styles.gap3}`}>
                        <input
                            type="text"
                            name="nome"
                            placeholder="Nome"
                            value={formData.nome}
                            onChange={handleChange}
                            className={`${styles.wFull} ${styles.p2} ${styles.border} ${styles.borderGray300} ${styles.rounded}`}
                            required
                        />
                        <input
                            type="text"
                            name="dependente"
                            placeholder="Dependente"
                            value={formData.dependente}
                            onChange={handleChange}
                            className={`${styles.wFull} ${styles.p2} ${styles.border} ${styles.borderGray300} ${styles.rounded}`}
                            required
                        />
                        <button
                            type="submit"
                            className={`${styles.wFull} ${styles.bgBlack} ${styles.textWhite} ${styles.py2} ${styles.rounded} ${styles.mt2} ${styles.hoverBgGray800} ${styles.transition}`}
                        >
                            Inscrever-se
                        </button>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}
