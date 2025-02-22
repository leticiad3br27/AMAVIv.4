'use client';
import { useState } from "react";
import Link from 'next/link';
import styles from '../responsavel.module.css';
import useTheme from "@/hook/useTheme";

export default function Responsável() {
    const { isDarkMode, toggleTheme } = useTheme();
    const [ativo, setAtivo] = useState("responsavel");
    return (
        <div className={styles.container}>
            <div className={styles.buttons}>
                <Link href="Cadastrar-F/Cadastrar-B">
                    <button
                        className={`${styles.button} ${ativo === "beneficiario" ? styles.bgBlue : styles.bgGray}`}
                        onClick={() => setAtivo("beneficiario")}>Beneficiário
                    </button>
                </Link>
                <Link href="/Cadastrar-F/Cadastrar-R">
                    <button
                        className={`${styles.button} ${ativo === "responsavel" ? styles.bgBlue : styles.bgGray}`}
                        onClick={() => setAtivo("responsavel")}>Responsável
                    </button>
                </Link>
            </div>
            <h1 className={styles.title}>Informações do Dependende</h1>
            
            <div className={styles.formContainer}>
                <h2 className={styles.sectionTitle1}>DADOS PESSOAIS</h2>
                <div className={styles.gridContainer}>
                    <label>Nome: <input type="text" className={styles.inputField} /></label>
                    <label>CPF: <input type="text" className={styles.inputField} /></label>
                    <label>Nascimento: <input type="date" className={styles.inputField} /></label>
                    <label>RG: <input type="text" className={styles.inputField} /></label>
                </div> 

                <h2 className={styles.sectionTitle2}>ADICIONAIS</h2>
                <div className={styles.gridContainer}>
                    <label>O Dependende vive com: 
                        <select className={styles.inputField}>
                            <option value="pai">Pai</option>
                            <option value="mãe">Mãe</option>
                            <option value="ambos">Pai e Mãe</option>
                            <option value="outros">Outro</option>
                        </select>
                    </label>
                    <label>Dignóstico: 
                        <input type="text" className={styles.inputField} />
                    </label>
                    <label>Faz Tratamento: 
                        <select className={styles.inputField}>
                            <option value="true">Sim</option>
                            <option value="false">Não</option>
                        </select>
                    </label>
                    <label>Renda Familiar: 
                        <select className={styles.inputField}>
                            <option value="baixa">Baixa</option>
                            <option value="media">Média</option>
                            <option value="alta">Alta</option>
                        </select>
                    </label>
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.buttonEnviar}>ENVIAR</button>
            </div>
        </div>
    );
}