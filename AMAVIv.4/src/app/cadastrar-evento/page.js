'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { CalendarPlus } from 'lucide-react';
import styles from './EventRegistration.module.css';

export default function CadastrarEvento() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    tipo_evento: '',
    data_evento: '',
    horario_evento: '',
    publico: 'geral',
  });
  const [imagem, setImagem] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setError('A imagem deve ter no máximo 10MB');
      setImagem(null);
      setPreviewUrl(null);
      return;
    }

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setError('Apenas imagens JPEG ou PNG são permitidas');
      setImagem(null);
      setPreviewUrl(null);
      return;
    }

    setError(null);
    setImagem(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (new Date(formData.data_evento) < new Date()) {
      setError('A data do evento não pode estar no passado.');
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    if (imagem) formDataToSend.append('foto_blob', imagem); // CORRIGIDO

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Você precisa estar logado para cadastrar um evento.');
        router.push('/login');
        return;
      }

      const apiUrl =
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/api/evento'
          : 'https://amaviapi.dev.vilhena.ifro.edu.br/api/evento';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const text = await response.text();
      console.log('Status:', response.status, 'Resposta:', text);

      if (response.ok) {
        setSuccess('Evento cadastrado com sucesso!');
        setFormData({
          titulo: '',
          descricao: '',
          tipo_evento: '',
          data_evento: '',
          horario_evento: '',
          publico: 'geral',
        });
        setImagem(null);
        setPreviewUrl(null);
        e.target.reset();
        setTimeout(() => router.push('/eventos'), 1000);
      } else {
        throw new Error(`Erro ${response.status}: ${text}`);
      }
    } catch (err) {
      console.error('Erro na requisição:', err);
      setError(`Falha na requisição: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className={styles.container}>
      <Link href="/evento" className={styles.voltarBtn}>
        ← Voltar para Eventos
      </Link>

      <h1 className={styles.titulo}>Cadastrar Evento</h1>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      {loading && <p className={styles.loading}>Carregando...</p>}

      <Form onSubmit={handleSubmit} className={styles.form}>
        <Form.Group className="mb-3">
          <Form.Label>Título:</Form.Label>
          <Form.Control
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descrição:</Form.Label>
          <Form.Control
            as="textarea"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tipo de Evento:</Form.Label>
          <Form.Control
            type="text"
            name="tipo_evento"
            value={formData.tipo_evento}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Data:</Form.Label>
          <Form.Control
            type="date"
            name="data_evento"
            value={formData.data_evento}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Horário:</Form.Label>
          <Form.Control
            type="time"
            name="horario_evento"
            value={formData.horario_evento}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Público:</Form.Label>
          <Form.Select
            name="publico"
            value={formData.publico}
            onChange={handleChange}
            required
          >
            <option value="geral">Geral</option>
            <option value="colaboradores">Colaboradores</option>
            <option value="usuarios">Usuários</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Imagem (JPEG/PNG, máx. 10MB):</Form.Label>
          <Form.Control
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
          />
          {previewUrl && (
            <div className={styles.previewContainer}>
              <img
                src={previewUrl}
                alt="Pré-visualização da imagem"
                className={styles.previewImage}
              />
            </div>
          )}
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button
            variant="primary"
            type="submit"
            disabled={loading}
            className={styles.submitButton}
          >
            <CalendarPlus size={16} className="me-2" />
            {loading ? 'Cadastrando...' : 'Cadastrar Evento'}
          </Button>
        </div>
      </Form>
    </Container>
  );
}
