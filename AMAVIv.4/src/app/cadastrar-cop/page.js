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
    if (e.target.files) {
      const file = e.target.files[0];
      if (file && file.size > 5 * 1024 * 1024) {
        setError('A imagem deve ter no máximo 5MB');
        return;
      }
      if (file && !['image/jpeg', 'image/png'].includes(file.type)) {
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
    formDataToSend.append('nome', formData.nome);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('telefone', formData.telefone);
    formDataToSend.append('cargo', formData.cargo);
    formDataToSend.append('isAdmin', formData.isAdmin.toString());
    if (imagem) {
      formDataToSend.append('imagem', imagem);
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/colaboradores`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formDataToSend,
      });

      const text = await response.text();
      console.log('Status:', response.status, 'Resposta:', text);

      if (response.ok) {
        setSuccess('Colaborador cadastrado com sucesso!');
        setFormData({ nome: '', email: '', telefone: '', cargo: '', isAdmin: false });
        setImagem(null);
        e.target.reset();
        if (formData.isAdmin) {
          router.push('/cadastrar-senha');
        } else {
          router.push('/colaboradores');
        }
      } else {
        setError(`Erro ao cadastrar: ${text}`);
      }
    } catch (err) {
      console.error('Erro na requisição:', err);
      setError('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className={styles.container}>
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
          <Form.Control
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className={styles.label}>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className={styles.label}>Telefone:</Form.Label>
          <Form.Control
            type="tel"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className={styles.label}>Cargo:</Form.Label>
          <Form.Control
            type="text"
            name="cargo"
            value={formData.cargo}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className={styles.label}>Imagem (JPEG/PNG, máx. 5MB):</Form.Label>
          <Form.Control
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
            className={styles.input}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="É administrador?"
            name="isAdmin"
            checked={formData.isAdmin}
            onChange={handleChange}
            className={styles.label}
          />
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit" disabled={loading} className={styles.button}>
            <UserPlus size={16} className="me-2" />
            {loading ? 'Cadastrando...' : 'Finalizar Cadastro'}
          </Button>
        </div>
      </Form>
    </Container>
  );
}