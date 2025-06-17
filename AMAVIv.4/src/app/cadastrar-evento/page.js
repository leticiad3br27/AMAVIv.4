'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './CollaboratorRegistration.module.css';

export default function CadastrarColaborador() {
  const [form, setForm] = useState({
    name: '',
    cpf: '',
    matricula: '',
    role: '',
    idade: '',
    familiaRegistrada: false,
    responsavel: false,
    beneficiarioResponsavel: false,
    atendimentosRegistrados: false,
    ofereceAtendimentos: false,
    foto_url: '',
    cargo: '', // Novo campo para cargo
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'foto_url' && value.length > 255) {
      setError('A URL da foto não pode exceder 255 caracteres.');
      return;
    }
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = { ...form };
    if (!formData.foto_url) {
      formData.foto_url = null;
    }
    if (!formData.cargo) {
      formData.cargo = null; // Envia null se cargo não for preenchido
    }

    try {
      const response = await fetch('https://amaviapi.dev.vilhena.ifro.edu.br/api/colaborador/colaboradores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detalhes || `Erro ao cadastrar colaborador: ${response.status} ${response.statusText}`);
      }

      alert('Colaborador cadastrado com sucesso!');
      setForm({
        name: '',
        cpf: '',
        matricula: '',
        role: '',
        idade: '',
        familiaRegistrada: false,
        responsavel: false,
        beneficiarioResponsavel: false,
        atendimentosRegistrados: false,
        ofereceAtendimentos: false,
        foto_url: '',
        cargo: '',
      });
    } catch (error) {
      console.error('Erro:', error);
      setError(error.message);
      alert(`Erro ao cadastrar: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Link href="/ConfigAdm" className={styles.voltarBtn}>
        ← Retornar
      </Link>

      <h1 className={styles.titulo}>Cadastro de Colaborador</h1>

      {error && <p className={styles.error}>Erro: {error}</p>}
      {loading && <p className={styles.loading}>Carregando...</p>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.column}>
          <label htmlFor="name" className={styles.label}>Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            aria-required="true"
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
          />

          <label htmlFor="matricula" className={styles.label}>Matrícula:</label>
          <input
            type="text"
            id="matricula"
            name="matricula"
            value={form.matricula}
            onChange={handleChange}
            required
            aria-required="true"
          />

          <label htmlFor="role" className={styles.label}>Função:</label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
            required
            aria-required="true"
          >
            <option value="">Selecione</option>
            <option value="Colaborador">Colaborador</option>
            <option value="Administrador">Administrador</option>
            <option value="Outro">Outro</option>
          </select>

          <label htmlFor="idade" className={styles.label}>Idade:</label>
          <input
            type="number"
            id="idade"
            name="idade"
            value={form.idade}
            onChange={handleChange}
            min="0"
            required
            aria-required="true"
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
          />
          <p id="foto_url_help" className={styles.helpText}>
            Insira uma URL válida para a foto do colaborador (máximo 255 caracteres).
          </p>

          <label htmlFor="cargo" className={styles.label}>Cargo (opcional):</label>
          <input
            type="text"
            id="cargo"
            name="cargo"
            value={form.cargo}
            onChange={handleChange}
            aria-describedby="cargo_help"
          />
          <p id="cargo_help" className={styles.helpText}>
            Insira o cargo do colaborador, se aplicável.
          </p>

          <label className={styles.label}>
            <input
              type="checkbox"
              name="familiaRegistrada"
              checked={form.familiaRegistrada}
              onChange={handleChange}
            />
            Tem família registrada?
          </label>

          <label className={styles.label}>
            <input
              type="checkbox"
              name="responsavel"
              checked={form.responsavel}
              onChange={handleChange}
            />
            É responsável?
          </label>

          <label className={styles.label}>
            <input
              type="checkbox"
              name="beneficiarioResponsavel"
              checked={form.beneficiarioResponsavel}
              onChange={handleChange}
            />
            É beneficiário responsável?
          </label>

          <label className={styles.label}>
            <input
              type="checkbox"
              name="atendimentosRegistrados"
              checked={form.atendimentosRegistrados}
              onChange={handleChange}
            />
            Tem atendimentos registrados?
          </label>

          <label className={styles.label}>
            <input
              type="checkbox"
              name="ofereceAtendimentos"
              checked={form.ofereceAtendimentos}
              onChange={handleChange}
            />
            Oferece atendimentos?
          </label>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? 'Cadastrando...' : 'Cadastrar Colaborador'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}