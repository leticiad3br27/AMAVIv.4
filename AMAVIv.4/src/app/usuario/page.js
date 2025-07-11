"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/famipage.module.css";
import useTheme from "../../hook/useTheme"; // ✅ ajuste o caminho conforme sua pasta real
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
  const { isDarkMode } = useTheme(); // ✅ tema funcionando
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);

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

        const usuarioRes = await fetch(`https://amaviapi.dev.vilhena.ifro.edu.br/api/usuarios/Usuarios?nome=${encodeURIComponent(nomeUsuario)}`, {
          method: "GET",
          credentials: "include",
        });

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
        const historicoRes = await fetch(`https://amaviapi.dev.vilhena.ifro.edu.br/api/historico/usuario/${usuarioEncontrado.id}`, {
          method: "GET",
          credentials: "include",
        });

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
    router.push("Solicitar-Atendimento/historico-atendimentos");
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
          <p className={styles.profileInfo}><strong>Idade:</strong> {calcularIdade(usuario.data_nascimento)}</p>
          <p className={styles.profileInfo}><strong>Gênero:</strong> {usuario.sexo || "Não informado"}</p>
          <p className={styles.profileInfo}><strong>Número SUS:</strong> {usuario.num_sus || "Não informado"}</p>
          <p className={styles.profileInfo}><strong>CPF:</strong> {usuario.cpf || "Não informado"}</p>
          <p className={styles.profileInfo}><strong>RG:</strong> {usuario.rg || "Não informado"}</p>
          <p className={styles.profileInfo}><strong>Endereço:</strong> {usuario.endereco || "Não informado"}</p>
          <p className={styles.profileInfo}><strong>Telefone:</strong> {usuario.telefone || "Não informado"}</p>
          <p className={styles.profileInfo}><strong>Email:</strong> {usuario.email || "Não informado"}</p>
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
      </div>
    </ConfigLayout>
  );
};

export default FamiliaPage;
