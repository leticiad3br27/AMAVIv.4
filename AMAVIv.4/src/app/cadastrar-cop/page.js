'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { UserPlus } from 'lucide-react';
import styles from './page.module.css';

export default function CadastrarCooperador() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cargo: '',
    isAdmin: false,
    senha: '',
  });
  const [imagem, setImagem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setError('A imagem deve ter no máximo 5MB');
        return;
      }
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setError('Apenas imagens JPEG ou PNG são permitidas');
        return;
      }
      setImagem(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    if (imagem) {
      formDataToSend.append('foto_url', imagem); // Use sempre 'foto_url'
    }

    try {
      const response = await fetch('https://amaviapi.dev.vilhena.ifro.edu.br/api/colaborador/colaboradores', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formDataToSend,
      });

      const text = await response.text();
      if (response.ok) {
        setSuccess('Colaborador cadastrado com sucesso!');
        setFormData({ nome: '', email: '', telefone: '', cargo: '', isAdmin: false, senha: '' });
        setImagem(null);
        e.target.reset();
        router.push('/consultar-cop');
      } else {
        setError(`Erro ao cadastrar: ${text}`);
      }
    } catch (err) {
      setError('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Link href="/ConfigAdm" className={styles.buttonVoltar}>
        ← Voltar para Configuração
      </Link>

      <h1 className={styles.title}>Cadastrar Colaborador</h1>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      {loading && <p className={styles.loading}>Carregando...</p>}

      <Form onSubmit={handleSubmit} className={styles.form}>
        <Form.Group className="mb-3">
          <Form.Label className={styles.label}>Nome completo:</Form.Label>
          <Form.Control className={styles.input} type="text" name="nome" value={formData.nome} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className={styles.label}>Email:</Form.Label>
          <Form.Control className={styles.input} type="email" name="email" value={formData.email} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className={styles.label}>Telefone:</Form.Label>
          <Form.Control className={styles.input} type="tel" name="telefone" value={formData.telefone} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className={styles.label}>Cargo:</Form.Label>
          <Form.Control className={styles.input} type="text" name="cargo" value={formData.cargo} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className={styles.label}>Imagem (JPEG/PNG, máx. 5MB):</Form.Label>
          <Form.Control className={styles.input} type="file" accept="image/jpeg,image/png" onChange={handleFileChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="É administrador?" name="isAdmin" checked={formData.isAdmin} onChange={handleChange} className={styles.label} />
        </Form.Group>

        {formData.isAdmin && (
          <Form.Group className="mb-3">
            <Form.Label className={styles.label}>Senha:</Form.Label>
            <Form.Control className={styles.input} type="password" name="senha" value={formData.senha} onChange={handleChange} required />
          </Form.Group>
        )}

        <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit" disabled={loading} className={styles.button}>
            <UserPlus size={16} className="me-2" />
            {loading ? 'Cadastrando...' : 'Finalizar Cadastro'}
          </Button>
        </div>
      </Form>
    </div>
  );
}
