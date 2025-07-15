"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/famipage.module.css";
import useTheme from "../../hook/useTheme"; // Ajuste o caminho conforme seu projeto
import ConfigLayout from "../layouts/ConfigLayout";

const calcularIdade = (dataNasc) => {
  if (!dataNasc) return "Não informado";
  const nascimento = new Date(dataNasc);
  const hoje = new Date();
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const m = hoje.getMonth() - nascimento.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade;
};

const FamiliaPage = () => {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const verificaRes = await fetch("https://amaviapi.dev.vilhena.ifro.edu.br/api/auth/verificar-login", {
          method: "GET",
          credentials: "include",
        });

        if (!verificaRes.ok) {
          router.push("/login");
          return;
        }

        const verificaData = await verificaRes.json();
        const nomeUsuario = verificaData.nome;

        const usuarioRes = await fetch(
          `https://amaviapi.dev.vilhena.ifro.edu.br/api/usuarios/Usuarios?nome=${encodeURIComponent(nomeUsuario)}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!usuarioRes.ok) {
          const erroTexto = await usuarioRes.text();
          console.error("Erro ao buscar usuário:", usuarioRes.status, erroTexto);
          throw new Error("Erro ao buscar dados do usuário");
        }

        const usuarios = await usuarioRes.json();
        const usuarioEncontrado = usuarios[0];

        if (!usuarioEncontrado) {
          throw new Error("Usuário não encontrado.");
        }

        setUsuario(usuarioEncontrado);

        // Buscar histórico
        const historicoRes = await fetch(
          `https://amaviapi.dev.vilhena.ifro.edu.br/api/historico/usuario/${usuarioEncontrado.id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (historicoRes.ok) {
          const historicoData = await historicoRes.json();
          setHistorico(historicoData);
        } else {
          setHistorico([]);
        }
      } catch (error) {
        console.error("Erro:", error.message);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [router]);

  const handleHistoricoClick = () => {
    router.push("/Solicitar-Atendimento/historico-atendimentos");
  };

  const handleDeleteAccount = async () => {
    try {
      // Step 1: Delete the login
      const loginResponse = await fetch(
        `https://amaviapi.dev.vilhena.ifro.edu.br/api/auth/deletar-login/${usuario.cpf}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        throw new Error(errorData.error || "Erro ao excluir conta de login");
      }

      // Step 2: Delete the user data
      const userResponse = await fetch(
        `https://amaviapi.dev.vilhena.ifro.edu.br/api/usuarios/Usuarios/${usuario.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!userResponse.ok) {
        const errorData = await userResponse.json();
        throw new Error(errorData.error || "Erro ao excluir dados do usuário");
      }

      // Clear cookies or local storage
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setShowModal(false);
      router.push("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  const openDeleteModal = () => {
    setShowModal(true);
    setError(null);
  };

  const closeDeleteModal = () => {
    setShowModal(false);
    setError(null);
  };

  if (loading) {
    return <div className={styles.loading}>Carregando informações do usuário...</div>;
  }

  if (!usuario) {
    return <div className={styles.error}>Usuário não encontrado ou não autenticado.</div>;
  }

  const fotoUrl = usuario?.foto_blob?.data
    ? `data:image/jpeg;base64,${btoa(
        new Uint8Array(usuario.foto_blob.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
      )}`
    : null;

  return (
    <ConfigLayout>
      <div className={`${styles.pageContainer} ${isDarkMode ? styles.darkTheme : styles.lightTheme}`}>
        {/* Coluna de Dados */}
        <div className={styles.dataColumn}>
          <div className={styles.profileHeader}>
            <div className={styles.profileImage}>
              {fotoUrl ? (
                <img src={fotoUrl} alt="Foto de perfil" className={styles.imgPerfil} />
              ) : (
                <span>👤</span>
              )}
            </div>
            <h1 className={styles.profileName}>{usuario.nome}</h1>
          </div>
          <p className={styles.profileInfo}>
            <strong>Idade:</strong> {calcularIdade(usuario.data_nascimento)}
          </p>
          <p className={styles.profileInfo}>
            <strong>Gênero:</strong> {usuario.sexo || "Não informado"}
          </p>
          <p className={styles.profileInfo}>
            <strong>Número SUS:</strong> {usuario.num_sus || "Não informado"}
          </p>
          <p className={styles.profileInfo}>
            <strong>CPF:</strong> {usuario.cpf || "Não informado"}
          </p>
          <p className={styles.profileInfo}>
            <strong>RG:</strong> {usuario.rg || "Não informado"}
          </p>
          <p className={styles.profileInfo}>
            <strong>Endereço:</strong> {usuario.endereco || "Não informado"}
          </p>
          <p className={styles.profileInfo}>
            <strong>Telefone:</strong> {usuario.telefone || "Não informado"}
          </p>
          <p className={styles.profileInfo}>
            <strong>Email:</strong> {usuario.email || "Não informado"}
          </p>
          <button
            className={`${styles.deleteButton} ${isDarkMode ? styles.deleteButtonDark : styles.deleteButtonLight}`}
            onClick={openDeleteModal}
          >
            Excluir Conta
          </button>
        </div>

        {/* Coluna de Histórico */}
        <div className={styles.historyColumn}>
          <h2 className={styles.sectionTitle}>Histórico Médico</h2>
          <ul className={styles.historyList}>
            {historico.length > 0 ? (
              historico.map((item, index) => (
                <li key={index} className={styles.historyItem} onClick={handleHistoricoClick}>
                  <strong>{item.data}:</strong> {item.descricao}
                </li>
              ))
            ) : (
              <li className={styles.historyItem}>Nenhum histórico encontrado.</li>
            )}
          </ul>
        </div>

        {/* Modal de Confirmação */}
        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={`${styles.modal} ${isDarkMode ? styles.modalDark : styles.modalLight}`}>
              <h2 className={styles.modalTitle}>Confirmar Exclusão de Conta</h2>
              <p className={styles.modalMessage}>
                Tem certeza que deseja excluir sua conta? Esta ação é irreversível e removerá todos os seus dados.
              </p>
              {error && <p className={styles.modalError}>{error}</p>}
              <div className={styles.modalButtons}>
                <button
                  className={`${styles.modalButton} ${styles.cancelButton}`}
                  onClick={closeDeleteModal}
                >
                  Cancelar
                </button>
                <button
                  className={`${styles.modalButton} ${styles.confirmButton}`}
                  onClick={handleDeleteAccount}
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ConfigLayout>
  );
};

export default FamiliaPage;