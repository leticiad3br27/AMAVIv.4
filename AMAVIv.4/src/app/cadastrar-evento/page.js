'use client';
import React, { useState } from 'react';
import styles from './EventRegistration.module.css';

const EventoCadastro = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    tipo_evento: '',
    data_evento: '',
    horario_evento: '',
    publico: '',
  });
  const [imagem, setImagem] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && ['image/jpeg', 'image/png'].includes(file.type)) {
      setImagem(file);
      setError(null);
    } else {
      setError('Por favor, selecione uma imagem JPEG ou PNG.');
      setImagem(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (imagem) {
      data.append('imagem', imagem);
    }

    try {
      const response = await fetch('https://amaviapi.dev.vilhena.ifro.edu.br/api/agenda', {
        method: 'POST',
        body: data,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao cadastrar evento. Tente novamente.');
      }

      setSuccess('Evento cadastrado com sucesso!');
      setFormData({
        titulo: '',
        descricao: '',
        tipo_evento: '',
        data_evento: '',
        horario_evento: '',
        publico: '',
      });
      setImagem(null);
    } catch (err) {
      setError(err.message || 'Erro ao cadastrar evento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <button
          type="button"
          onClick={handleBack}
          className={styles.backButton}
        >
          Voltar
        </button>
        <h2 className={styles.heading}>Cadastro de Evento</h2>
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="titulo" className={styles.label}>
              Título
            </label>
            <input
              id="titulo"
              name="titulo"
              type="text"
              required
              value={formData.titulo}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Título do evento"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="descricao" className={styles.label}>
              Descrição
            </label>
            <textarea
              id="descricao"
              name="descricao"
              required
              value={formData.descricao}
              onChange={handleInputChange}
              className={styles.textarea}
              placeholder="Descrição do evento"
              rows="4"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="tipo_evento" className={styles.label}>
              Tipo de Evento
            </label>
            <select
              id="tipo_evento"
              name="tipo_evento"
              required
              value={formData.tipo_evento}
              onChange={handleInputChange}
              className={styles.select}
            >
              <option value="" disabled>
                Selecione o tipo
              </option>
              <option value="palestra">Palestra</option>
              <option value="workshop">Workshop</option>
              <option value="seminario">Seminário</option>
              <option value="outro">Outro</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="data_evento" className={styles.label}>
              Data do Evento
            </label>
            <input
              id="data_evento"
              name="data_evento"
              type="date"
              required
              value={formData.data_evento}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="horario_evento" className={styles.label}>
              Horário do Evento
            </label>
            <input
              id="horario_evento"
              name="horario_evento"
              type="time"
              required
              value={formData.horario_evento}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="publico" className={styles.label}>
              Público
            </label>
            <input
              id="publico"
              name="publico"
              type="text"
              required
              value={formData.publico}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Público-alvo do evento"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="imagem" className={styles.label}>
              Imagem do Evento (JPEG/PNG, máx. 10MB)
            </label>
            <input
              id="imagem"
              name="imagem"
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleFileChange}
              className={styles.input}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? 'Cadastrando...' : 'Cadastrar Evento'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventoCadastro;