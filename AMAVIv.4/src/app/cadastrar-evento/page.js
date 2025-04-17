"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import styles from "./EventRegistration.module.css";

export default function CadastrarEvento() {
  const [imagem, setImagem] = useState(null);
  const [previewImagem, setPreviewImagem] = useState(null);
  const dropRef = useRef(null);

  const [form, setForm] = useState({
    nome: "",
    data: "",
    hora: "",
    local: "",
    descricao: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImagem = (file) => {
    setImagem(file);
    setPreviewImagem(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImagem(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleImagemInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleImagem(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (imagem) {
      formData.append("imagem", imagem);
    }

    try {
      const response = await fetch("/api/eventos", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Evento cadastrado com sucesso!");
        setForm({
          nome: "",
          data: "",
          hora: "",
          local: "",
          descricao: "",
        });
        setImagem(null);
        setPreviewImagem(null);
      } else {
        alert("Erro ao cadastrar o evento.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className={styles.container}>
      <Link href="/ConfigAdm" className={styles.voltarBtn}>← Retornar</Link>

      <h1 className={styles.titulo}>Cadastro de Evento</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.leftColumn}>
          <label>Nome do Evento:</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />

          <label>Data:</label>
          <input
            type="date"
            name="data"
            value={form.data}
            onChange={handleChange}
            required
          />

          <label>Hora:</label>
          <input
            type="time"
            name="hora"
            value={form.hora}
            onChange={handleChange}
            required
          />

          <label>Local (endereço):</label>
          <input
            type="text"
            name="local"
            value={form.local}
            onChange={handleChange}
            required
          />

          <label>Descrição do Local:</label>
          <textarea
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        <div className={styles.rightColumn}>
          <label>Imagem do Evento:</label>
          <div
            ref={dropRef}
            className={styles.dropzone}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => dropRef.current.querySelector("input").click()}
          >
            {previewImagem ? (
              <img
                src={previewImagem}
                alt="Preview"
                className={styles.thumbnail}
              />
            ) : (
              <p>Arraste e solte a imagem aqui ou clique para selecionar</p>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImagemInput}
              style={{ display: "none" }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button type="submit" className={styles.button}>
              Cadastrar Evento
            </button>
          </div>

          {form.local && (
            <div className={styles.mapsLink}>
              <h3>Ver no Google Maps:</h3>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  form.local
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {form.local}
              </a>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
