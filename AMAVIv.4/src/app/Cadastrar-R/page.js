"use client";  
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from './responsavel.module.css';

const validateCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let sum = 0;
    let weight = 10;
    for (let i = 0; i < 9; i++) {
        sum += cpf[i] * weight--;
    }
    let firstVerifier = 11 - (sum % 11);
    firstVerifier = firstVerifier >= 10 ? 0 : firstVerifier;

    sum = 0;
    weight = 11;
    for (let i = 0; i < 10; i++) {
        sum += cpf[i] * weight--;
    }
    let secondVerifier = 11 - (sum % 11);
    secondVerifier = secondVerifier >= 10 ? 0 : secondVerifier;

    return cpf[9] == firstVerifier && cpf[10] == secondVerifier;
};

const formatCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length <= 3) return cpf;
    if (cpf.length <= 6) return `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
    if (cpf.length <= 9) return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;
    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`;
};

export default function Responsavel() {
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        telefone: '',
        email: '',
    });
    const [cpfError, setCpfError] = useState("");
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "cpf") {
            const formattedCPF = formatCPF(value);
            setFormData({ ...formData, cpf: formattedCPF });

            if (formattedCPF && !validateCPF(formattedCPF.replace(/[^\d]+/g, ''))) {
                setCpfError("CPF inválido!");
            } else {
                setCpfError("");
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const rawCPF = formData.cpf.replace(/[^\d]+/g, '');
        if (!validateCPF(rawCPF)) {
            setCpfError("CPF inválido! Por favor, insira um CPF válido.");
            return;
        }

        // Se CPF válido, redireciona para a próxima página
        router.push("/definir-senha");
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Cadastro do Responsável</h1>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <h2 className={styles.sectionTitle}>INFORMAÇÕES </h2>
                <div className={styles.gridContainer}>
                    <label>Nome: <input type="text" name="nome" value={formData.nome} onChange={handleChange} className={styles.inputField} required /></label>
                    <label>CPF: 
                        <input 
                            type="text" 
                            name="cpf" 
                            value={formData.cpf} 
                            onChange={handleChange} 
                            className={styles.inputField} 
                            required 
                        />
                        {cpfError && <span className={styles.error}>{cpfError}</span>}
                    </label>
                    <label>Telefone: <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} className={styles.inputField} required /></label>
                    <label>E-MAIL: <input type="email" name="email" value={formData.email} onChange={handleChange} className={styles.inputField} required /></label>
                </div>
                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.buttonEnviar}>ENVIAR</button>
                </div>
            </form>
        </div>
    );
}
