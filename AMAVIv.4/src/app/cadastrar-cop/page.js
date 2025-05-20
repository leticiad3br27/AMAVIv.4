"use client"; 
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css"; 
function CadastrarCooperador() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    foto_url: "", // URL da imagem
    cargo: "",
    isAdmin: false,
  });
  const [file, setFile] = useState(null); // Estado para armazenar o arquivo
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile); // Armazena o arquivo selecionado
    // Cria um URL de dados para a imagem
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, foto_url: reader.result }); // Atualiza a URL da foto no estado
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile); // Lê o arquivo como uma URL de dados
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Dados cadastrados:", formData);
    alert("Cadastro realizado com sucesso!");
    // Redirecionar para a página de cadastrar senha se for administrador
    if (formData.isAdmin) {
      router.push("/cadastrar-senha"); // Altere para o caminho correto da sua página de cadastrar senha
    }
  };
  return (
    <div className={styles.container}>
      <h1>CADASTRAR COOPERADOR</h1>
      <button type="button" className={styles.buttonVoltar} onClick={() => router.push("/ConfigAdm")}>Voltar para Configuração</button>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label} htmlFor="nome">Nome completo:</label>
        <input className={styles.input} type="text" id="nome" name="nome" required value={formData.nome} onChange={handleChange} />
        
        <label className={styles.label} htmlFor="email">Email:</label>
        <input className={styles.input} type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
        
        <label className={styles.label} htmlFor="telefone">Telefone:</label>
        <input className={styles.input} type="tel" id="telefone" name="telefone" required value={formData.telefone} onChange={handleChange} />
        
        <label className={styles.label} htmlFor="foto_url">URL da Foto:</label>
        <input className={styles.input} type="text" id="foto_url" name="foto_url" value={formData.foto_url} readOnly />
        <label className={styles.label} htmlFor="file">Selecionar Imagem:</label>
        <input className={styles.input} type="file" id="file" accept="image/*" onChange={handleFileChange} required />
        <label className={styles.label} htmlFor="cargo">Cargo:</label>
        <input className={styles.input} type="text" id="cargo" name="cargo" required value={formData.cargo} onChange={handleChange} />
        <label className={styles.label}>
          <input 
            type="checkbox" 
            name="isAdmin" 
            checked={formData.isAdmin} 
            onChange={handleChange} 
          />
          É Administrador?
        </label>
        <button type="submit" className={styles.button}>Finalizar Cadastro</button>
      </form>
    </div>
  );
}
export default CadastrarCooperador;