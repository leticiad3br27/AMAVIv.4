'use client';
import { useState, useEffect } from "react";
import Link from 'next/link';
import styles from './beneficiario.module.css';
import useTheme from '../../hook/useTheme';
export default function Beneficiario() {
    const { isDarkMode, toggleTheme } = useTheme();
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        telefone: '',
        email: '',
        nascimento: '',
        rg: '',
        profissao: 'estudante', // Opção padrão
        rua: '',
        numero: '',
        cidade: '',
        estado: '',
        cep: ''
    });
    const [profissoes, setProfissoes] = useState([]);
    const [progress, setProgress] = useState(0);
    const [isUnderage, setIsUnderage] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const calculateAge = (birthDate) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };
    const fetchAddress = async (cep) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            if (!data.erro) {
                setFormData(prevState => ({
                    ...prevState,
                    rua: data.logradouro,
                    cidade: data.localidade,
                    estado: data.uf
                }));
            } else {
                alert('CEP não encontrado.');
            }
        } catch (error) {
            console.error('Erro ao buscar endereço:', error);
            alert('Erro ao buscar endereço. Tente novamente.');
        }
    };
    useEffect(() => {
        const filledFields = Object.values(formData).filter(value => value).length;
        const totalFields = Object.keys(formData).length;
        setProgress((filledFields / totalFields) * 100);
        if (formData.nascimento) {
            const age = calculateAge(formData.nascimento);
            setIsUnderage(age < 18);
        }
    }, [formData]);
    useEffect(() => {
        // Fetch professions from an external API
        const fetchProfessions = async () => {
            try {
                const response = await fetch('https://api.profissoes.com.br/profissoes'); // Exemplo de API
                const data = await response.json();
                setProfissoes(data.profissoes || []); // Ajustar conforme a estrutura da API
            } catch (error) {
                console.error('Erro ao buscar profissões:', error);
                alert('Erro ao buscar profissões. Tente novamente.');
            }
        };
        fetchProfessions();
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isUnderage) {
            console.log("Redirecionar para o cadastro de responsável");
            // Aqui você pode redirecionar para a página de cadastro de responsável
            // Exemplo: window.location.href = '/responsavel';
        } else {
            console.log("Dados enviados:", formData);
            // Aqui você pode adicionar a lógica para enviar os dados para o banco
        }
    };
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Informações Pessoais</h1>
            <div className={styles.progressContainer}>
                <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
            </div>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <h2 className={styles.sectionTitle1}>DADOS PESSOAIS</h2>
                <div className={styles.gridContainer}>
                    <label>Nome: <input type="text" name="nome" value={formData.nome} onChange={handleChange} className={styles.inputField} required /></label>
                    <label>CPF: <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} className={styles.inputField} required /></label>
                    <label>Telefone: <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} className={styles.inputField} required /></label>
                    <label>E-MAIL: <input type="email" name="email" value={formData.email} onChange={handleChange} className={styles.inputField} required /></label>
                    <label>Nascimento: <input type="date" name="nascimento" value={formData.nascimento} onChange={handleChange} className={styles.inputField} required /></label>
                    <label>RG: <input type="text" name="rg" value={formData.rg} onChange={handleChange} className={styles.inputField} required /></label>
                    <label>Profissão: 
                        <select name="profissao" value={formData.profissao} onChange={handleChange} className={styles.inputField} required>
                            {profissoes.map((profissao) => (
                                <option key={profissao.id} value={profissao.nome}>{profissao.nome}</option>
                            ))}
                            <option value="estudante">Estudante</option>
                        </select>
                    </label>
                </div>
                <h2 className={styles.sectionTitle2}>ENDEREÇO</h2>
                <div className={styles.gridContainer}>
                    <label>CEP: <input type="text" name="cep" value={formData.cep} onChange={handleChange} className={styles.inputField} required onBlur={() => fetchAddress(formData.cep)} /></label>
                    <label>Rua: <input type="text" name="rua" value={formData.rua} onChange={handleChange} className={styles.inputField} required /></label>
                    <label>Número: <input type="text" name="numero" value={formData.numero} onChange={handleChange} className={`${styles.inputFieldSmall}`} required /></label>
                    <label>Cidade: <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} className={styles.inputField} required /></label>
                    <label>Estado: <input type="text" name="estado" value={formData.estado} onChange={handleChange} className={styles.inputField} required /></label>
                </div>
                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.buttonEnviar}>ENVIAR</button>
                </div>
            </form>
        </div>
    );
}