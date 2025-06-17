'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

export default function CadastrarCooperador() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    cpf: '',
    matricula: '',
    role: 'Colaborador', // Default para evitar campo vazio
    idade: '',
    email: '',
    telefone: '',
    cargo: '',
    foto_url: '', // Para URL manual, opcional
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'foto_url' && value.length > 255) {
      setError('A URL da foto não pode exceder 255 caracteres.');
      return;
    }
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Por favor, selecione um arquivo de imagem válido.');
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validações básicas
    if (!form.name || !form.cpf || !form.matricula || !form.role || !form.idade) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      setLoading(false);
      return;
    }
    if (form.cpf.length !== 11 || !/^\d{11}$/.test(form.cpf)) {
      setError('CPF deve conter exatamente 11 dígitos numéricos.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    // Campos obrigatórios e opcionais
    formData.append('name', form.name);
    formData.append('cpf', form.cpf);
    formData.append('matricula', form.matricula);
    formData.append('role', form.role);
    formData.append('idade', form.idade);
    if (form.email) formData.append('email', form.email);
    if (form.telefone) formData.append('telefone', form.telefone);
    if (form.cargo) formData.append('cargo', form.cargo);
    if (form.foto_url) formData.append('foto_url', form.foto_url);
    
    // Adiciona a imagem, se selecionada
    if (file) {
      formData.append('foto', file); // Envia como 'foto' em vez de 'foto_url'
    }

    try {
      const response = await fetch('https://amaviapi.dev.vilhena.ifro.edu.br/api/colaborador/colaboradores', {
        method: 'POST',
        body: formData,
      });

      let responseData;
      try {
        responseData = await response.json();
      } catch (jsonError) {
        throw new Error('Resposta inválida da API.');
      }

      if (!response.ok) {
        throw new Error(responseData.detalhes || `Erro ao cadastrar colaborador: ${response.status} ${response.statusText}`);
      }

      alert('Colaborador cadastrado com sucesso!');
      setForm({
        name: '',
        cpf: '',
        matricula: '',
        role: 'Colaborador',
        idade: '',
        email: '',
        telefone: '',
        cargo: '',
        foto_url: '',
      });
      setFile(null);
      if (form.role === 'Administrador') {
        router.push('/cadastrar-senha');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setError(error.message);
      alert(`Erro ao cadastrar: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Link href="/ConfigAdm" className={styles.voltarBtn}>
        ← Voltar para Configuração
      </Link>

      <h1 className={styles.titulo}>Cadastrar Cooperador</h1>

      {error && <p className={styles.error}>Erro: {error}</p>}
      {loading && <p className={styles.loading}>Carregando...</p>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.column}>
          <label htmlFor="name" className={styles.label}>Nome completo:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            aria-required="true"
            className={styles.input}
          />

          <label htmlFor="cpf" className={styles.label}>CPF:</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={form.cpf}
            onChange={handleChange}
            required
            aria-required="true"
            pattern="\d{11}"
            title="CPF deve conter 11 dígitos"
            className={styles.input}
          />

          <label htmlFor="role" className={styles.label}>Função:</label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
            required
            aria-required="true"
            className={styles.input}
          >
            <option value="Colaborador">Colaborador</option>
            <option value="Administrador">Administrador</option>
            <option value="Outro">Outro</option>
          </select>

          <label htmlFor="email" className={styles.label}>Email (opcional):</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={styles.input}
          />

          <label htmlFor="telefone" className={styles.label}>Telefone (opcional):</label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
            className={styles.input}
          />

          <label htmlFor="cargo" className={styles.label}>Cargo (opcional):</label>
          <input
            type="text"
            id="cargo"
            name="cargo"
            value={form.cargo}
            onChange={handleChange}
            className={styles.input}
          />

          <label htmlFor="foto_url" className={styles.label}>URL da Foto (opcional):</label>
          <input
            type="url"
            id="foto_url"
            name="foto_url"
            value={form.foto_url}
            onChange={handleChange}
            placeholder="https://exemplo.com/foto.jpg"
            maxLength={255}
            aria-describedby="foto_url_help"
            className={styles.input}
          />
          <p id="foto_url_help" className={styles.helpText}>
            Insira uma URL válida para a foto (máximo 255 caracteres).
          </p>

          <label htmlFor="foto" className={styles.label}>Selecionar Imagem (opcional):</label>
          <input
            type="file"
            id="foto"
            name="foto"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.input}
          />

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? 'Cadastrando...' : 'Finalizar Cadastro'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}