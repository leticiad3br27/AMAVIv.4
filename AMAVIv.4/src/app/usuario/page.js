"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/usuarioPage.module.css";
import useTheme from "../../hook/useTheme";
import ConfigLayout from "../layouts/ConfigLayout";
import Image from "next/image";
import perfilDefault from "../../../public/assets/img/Usuarios.jpg";
import { Pencil } from "lucide-react";

const familia = [
  {
    nome: "João Silva",
    idade: 40,
    genero: "Masculino",
    numeroSUS: "1234567890",
    parentesco: "Usuário Principal",
    cpf: "111.111.111-11",
    rg: "MG-12.345.678",
    endereco: "Rua A, 123, Bairro X, Cidade Y, Estado Z",
    imagem: perfilDefault,
  },
  // outros membros...
];

const usuarioPrincipal = familia.find((membro) => membro.parentesco === "Usuário Principal");
const parentes = familia.filter((membro) => membro.parentesco !== "Usuário Principal");

const FamiliaPage = () => {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [fotoPreview, setFotoPreview] = useState(null);

  const handleFotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const abrirInputArquivo = () => {
    fileInputRef.current?.click();
  };

  return (
    <ConfigLayout>
      <div className={`${styles.configLayout} ${isDarkMode ? styles.darkTheme : styles.lightTheme}`}>
        <div className={styles.profileContainer}>
          <div className={styles.profileHeader}>
            <div className={styles.profileImage}>
              <Image
                src={fotoPreview || usuarioPrincipal?.imagem || perfilDefault}
                alt="Foto de perfil"
                width={120}
                height={120}
                className={styles.profilePic}
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFotoChange}
              />
              <button className={styles.editPhotoBtn} onClick={abrirInputArquivo}>
                Atualizar Foto
              </button>
            </div>
            <h1 className={styles.profileName}>{usuarioPrincipal?.nome}</h1>
            <p className={styles.profileText}><strong>Idade:</strong> {usuarioPrincipal?.idade}</p>
            <p className={styles.profileText}><strong>Gênero:</strong> {usuarioPrincipal?.genero}</p>
            <p className={styles.profileText}><strong>Número SUS:</strong> {usuarioPrincipal?.numeroSUS}</p>
            <p className={styles.profileText}><strong>CPF:</strong> {usuarioPrincipal?.cpf}</p>
            <p className={styles.profileText}><strong>RG:</strong> {usuarioPrincipal?.rg}</p>
            <p className={styles.profileText}><strong>Endereço:</strong> {usuarioPrincipal?.endereco}</p>

            <button className={styles.editIconBtn} onClick={() => router.push("/editar-usuario")}>
              <Pencil size={20} />
            </button>
          </div>

          <div className={styles.relationsContainer}>
            <h2 className={styles.relationsTitle}>Vinculados</h2>
            <ul className={styles.relationsList}>
              {parentes.map((membro) => (
                <li 
                  key={membro.cpf} 
                  className={styles.relationItem}
                  onClick={() => router.push("/login")}
                >
                  {membro.nome}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </ConfigLayout>
  );
};

export default UsuarioPage;
