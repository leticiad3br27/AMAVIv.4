"use client";
import { useState } from "react";
import styles from "./EventRegistration.module.css";
import useTheme from "../../hook/useTheme";

export default function EventRegistration() {
  const { isDarkMode, toggleTheme } = useTheme(); // Agora está no lugar correto

  const [dadosEvento, setDadosEvento] = useState({
    titulo: "",
    descricao: "",
    data: "",
    horario: "",
    localizacao: "",
    imagens: [],
    imagensPreview: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDadosEvento({ ...dadosEvento, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setDadosEvento((prevState) => ({
      ...prevState,
      imagens: [...prevState.imagens, ...files],
      imagensPreview: [...prevState.imagensPreview, ...previewUrls],
    }));
  };

  const handleRemoveImage = (index) => {
    setDadosEvento((prevState) => {
      const novasImagens = [...prevState.imagens];
      const novasImagensPreview = [...prevState.imagensPreview];
      novasImagens.splice(index, 1);
      novasImagensPreview.splice(index, 1);
      return { ...prevState, imagens: novasImagens, imagensPreview: novasImagensPreview };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Evento cadastrado:", dadosEvento);
  };

return (
    <div className={`${styles.container} ${isDarkMode ? styles.darkMode : ""}`}>
        <h2 className={styles.title}>EVENTOS</h2>
        
        <div className={styles.div_box}>
            <div className={styles.cartaoImagem}>
                <label htmlFor="imagemUpload" className={styles.botaoAdicionarImagem}>
                    <div className={styles.botaoConteudo}>+
                        <span>Adicionar Imagem</span>
                    </div>
                </label>
                <input id="imagemUpload" type="file" multiple onChange={handleImageChange} className={styles.inputFile} />
                <div className={styles.imagensPreviewContainer}>
                    {dadosEvento.imagensPreview.map((src, index) => (
                        <div key={index} className={styles.imagemWrapper}>
                            <img src={src} alt={`Preview ${index}`} className={styles.imagemPreview} />
                            <button type="button" onClick={() => handleRemoveImage(index)} className={styles.botaoRemover}>X</button>
                        </div>
                    ))}
                </div>
            </div>
            <form onSubmit={handleSubmit} className={styles.formulario}>
                <label className={styles.label}>Título:</label>
                <input type="text" name="titulo" value={dadosEvento.titulo} onChange={handleChange} className={styles.input} required />
                <label className={styles.label}>Descrição:</label>
                <textarea name="descricao" value={dadosEvento.descricao} onChange={handleChange} className={styles.textarea} required />
                <label className={styles.label}>Data:</label>
                <input type="date" name="data" value={dadosEvento.data} onChange={handleChange} className={styles.input} required />
                <label className={styles.label}>Local:</label>
                <input type="text" name="localizacao" value={dadosEvento.localizacao} onChange={handleChange} className={styles.input} required />
                <label className={styles.label}>Horário:</label>
                <input type="time" name="horario" value={dadosEvento.horario} onChange={handleChange} className={styles.input} required />
                <button type="submit" className={styles.button}>Salvar</button>
            </form>
        </div>
        <button className={styles.voltar} onClick={() => window.location.href = '/ConfigAdm'}>Voltar</button>
    </div>
);
}
