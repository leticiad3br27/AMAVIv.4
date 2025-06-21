'use client';

import React, { useState } from 'react';
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
    data_evento: '',
    horario_evento: '',
  });
  const [imagem, setImagem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file && file.size > 10 * 1024 * 1024) {
        setError('A imagem deve ter no máximo 10MB');
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
    formDataToSend.append('titulo', formData.titulo);
    formDataToSend.append('descricao', formData.descricao);
    formDataToSend.append('data_evento', formData.data_evento);
    formDataToSend.append('horario_evento', formData.horario_evento);
    if (imagem) {
      formDataToSend.append('imagem', imagem); // Campo 'imagem' conforme multer
    }

    try {
      const response = await fetch('https://amaviapi.dev.vilhena.ifro.edu.br/api/evento', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formDataToSend,
      });

      const text = await response.text();
      console.log('Status:', response.status, 'Resposta:', text);

      if (response.ok) {
        setSuccess('Evento cadastrado com sucesso!');
        setFormData({ titulo: '', descricao: '', tipo_evento: '', data_evento: '', horario_evento: '', publico: '' });
        setImagem(null);
        e.target.reset();
        router.push('/eventos');
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
      <Link href="/eventos" className={styles.voltarBtn}>
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
          <Form.Label>Imagem (JPEG/PNG, máx. 10MB):</Form.Label>
          <Form.Control
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
          />
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit" disabled={loading}>
            <CalendarPlus size={16} className="me-2" />
            {loading ? 'Cadastrando...' : 'Cadastrar Evento'}
          </Button>
        </div>
      </Form>
    </Container>
  );
}