'use client';
import { useState } from "react";
import Link from 'next/link';
import styles from './beneficiario.module.css';
import useTheme from '../../hook/useTheme';

export default function Beneficiario() {
    const { isDarkMode, toggleTheme } = useTheme();
    const [ativo, setAtivo] = useState("beneficiario");
    return (
        <div className={styles.container}>
            <div className={styles.buttons}>
                <Link href="/Cadastrar-F/Cadastrar-B">
                    <button
                        className={`${styles.button} ${ativo === "beneficiario" ? styles.bgBlue : styles.bgGray}`}
                        onClick={() => setAtivo("beneficiario")}>Beneficiário
                    </button>
                </Link>
                <Link href="Cadastrar-F/Cadastrar-R">
                    <button
                        className={`${styles.button} ${ativo === "responsavel" ? styles.bgBlue : styles.bgGray}`}
                        onClick={() => setAtivo("responsavel")}>Responsável
                    </button>
                </Link>
            </div>
            <h1 className={styles.title}>Informações Pessoais</h1>
            
            <div className={styles.formContainer}>
                <h2 className={styles.sectionTitle1}>DADOS PESSOAIS</h2>
                <div className={styles.gridContainer}>
                    <label>Nome: <input type="text" className={styles.inputField} /></label>
                    <label>CPF: <input type="text" className={styles.inputField} /></label>
                    <label>Telefone: <input type="text" className={styles.inputField} /></label>
                    <label>E-MAIL: <input type="email" className={styles.inputField} /></label>
                    <label>Nascimento: <input type="date" className={styles.inputField} /></label>
                    <label>RG: <input type="text" className={styles.inputField} /></label>
                    <label>Profissão: <input type="text" className={styles.inputField} /></label>
                </div>
                
                <h2 className={styles.sectionTitle2}>ENDEREÇO</h2>
                <div className={styles.gridContainer}>
                    <label>Rua: <input type="text" className={styles.inputField} /></label>
                    <label>Número: <input type="text" className={`${styles.inputFieldSmall}`} /></label>
                    <label>Cidade: <input type="text" className={styles.inputField} /></label>
                    <label>Estado: <input type="text" className={styles.inputField} /></label>
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.buttonEnviar}>ENVIAR</button>
            </div>
        </div>
    );
}