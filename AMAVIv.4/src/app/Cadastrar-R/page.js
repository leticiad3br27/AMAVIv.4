"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation"; // Importando useRouter
import styles from "./CadastrarR.module.css";

const validateCPF = (cpf) => {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  return rev === parseInt(cpf.charAt(10));
};

const formatCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length <= 3) return cpf;
  if (cpf.length <= 6) return `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
  if (cpf.length <= 9) return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;
  return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`;
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export default function CadastrarResponsavel() {
  const router = useRouter(); // Inicializando o roteador
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    rg: "",
    profissao: "",
    dataNascimento: "",
    estadoCivil: "",
    rendaMensal: "",
    endereco: "",
    email: "",
    telefone: "",
  });

  const [cpfError, setCpfError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const filledFields = Object.values(formData).filter((val) => val !== "").length;
    const totalFields = Object.keys(formData).length;
    setProgress((filledFields / totalFields) * 100);
  }, [formData]);

  const handleChange = useCallback((field, value) => {
    let newValue = value;

    if (field === "cpf") {
      newValue = formatCPF(newValue);
      setFormData((prev) => ({ ...prev, cpf: newValue }));
      setCpfError(newValue.replace(/\D/g, "").length === 11 && !validateCPF(newValue) ? "CPF inválido" : "");
    } else if (field === "telefone") {
      newValue = newValue
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .slice(0, 15);
    } else if (field === "email") {
      setEmailError(
        newValue.length > 0 && !validateEmail(newValue) ? "Email inválido" : ""
      );
    } else if (field === "rendaMensal") {
      newValue = newValue
        .replace(/[^\d,\.]/g, "")
        .replace(/,/g, ".");
    }
    setFormData((prev) => ({ ...prev, [field]: newValue }));
  }, []);

  const allFieldsFilled = Object.values(formData).every((val) => val !== "");
  const hasErrors = cpfError || emailError;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hasErrors || !allFieldsFilled) {
      alert("Por favor, corrija os erros e preencha todos os campos antes de continuar.");
      return;
    }
    console.log("Dados enviados:", formData);
    router.push("/definir-senha"); // Redirecionando para a página de definição de senha
  };

  return (
    <div className={styles.container} role="form" aria-labelledby="form-title">
      <h2 id="form-title" className={styles.title}>Dados do Responsável</h2>

      <div className={styles.progressContainer} aria-label="Progresso do formulário">
        <div
          className={styles.progressBar}
          style={{ width: `${progress}%` }}
        />
      </div>

      <form className={styles.formContainer} onSubmit={handleSubmit} noValidate>
        <div className={styles.gridContainer}>
          <label className={styles.label}>
            Nome Completo
            <input
              type="text"
              className={styles.inputField}
              value={formData.nome}
              onChange={(e) => handleChange("nome", e.target.value)}
              aria-required="true"
              aria-label="Nome Completo"
            />
          </label>

          <label className={styles.label}>
            CPF
            <input
              type="text"
              className={styles.inputField}
              value={formData.cpf}
              onChange={(e) => handleChange("cpf", e.target.value)}
              aria-required="true"
              aria-invalid={cpfError ? "true" : "false"}
              aria-describedby="cpfError"
              style={{ borderColor: cpfError ? "red" : undefined }}
            />
            {cpfError && (
              <p id="cpfError" className={styles.errorMessage} role="alert">
                {cpfError}
              </p>
            )}
          </label>

          <label className={styles.label}>
            RG
            <input
              type="text"
              className={styles.inputField}
              value={formData.rg}
              onChange={(e) => handleChange("rg", e.target.value)}
              aria-required="true"
              aria-label="RG"
            />
          </label>

          <label className={styles.label}>
            Profissão
            <input
              type="text"
              className={styles.inputField}
              value={formData.profissao}
              onChange={(e) => handleChange("profissao", e.target.value)}
              aria-required="true"
              aria-label="Profissão"
            />
          </label>

          <label className={styles.label}>
            Data de Nascimento
            <input
              type="date"
              className={styles.inputField}
              value={formData.dataNascimento}
              onChange={(e) => handleChange("dataNascimento", e.target.value)}
              aria-required="true"
              aria-label="Data de Nascimento"
            />
          </label>

          <label className={styles.label}>
            Estado Civil
            <select
              className={styles.inputField}
              value={formData.estadoCivil}
              onChange={(e) => handleChange("estadoCivil", e.target.value)}
              aria-required="true"
              aria-label="Estado Civil"
            >
              <option value="">Selecione</option>
              <option value="solteiro">Solteiro(a)</option>
              <option value="casado">Casado(a)</option>
              <option value="divorciado">Divorciado(a)</option>
              <option value="viuvo">Viúvo(a)</option>
              <option value="outro">Outro</option>
            </select>
          </label>

          <label className={styles.label}>
            Renda Mensal (R$)
            <input
              type="text"
              className={styles.inputField}
              value={formData.rendaMensal}
              onChange={(e) => handleChange("rendaMensal", e.target.value)}
              aria-required="true"
              aria-label="Renda Mensal"
            />
          </label>

          <label className={styles.label}>
            Endereço Completo
            <textarea
              className={styles.inputField}
              value={formData.endereco}
              onChange={(e) => handleChange("endereco", e.target.value)}
              rows={3}
              aria-required="true"
              aria-label="Endereço Completo"
            />
          </label>

          <label className={styles.label}>
            Email
            <input
              type="email"
              className={styles.inputField}
              value={formData.email}
              onChange={( e) => handleChange("email", e.target.value)}
              aria-required="true"
              aria-invalid={emailError ? "true" : "false"}
              aria-describedby="emailError"
              style={{ borderColor: emailError ? "red" : undefined }}
            />
            {emailError && (
              <p id="emailError" className={styles.errorMessage} role="alert">
                {emailError}
              </p>
            )}
          </label>

          <label className={styles.label}>
            Telefone
            <input
              type="text"
              className={styles.inputField}
              value={formData.telefone}
              onChange={(e) => handleChange("telefone", e.target.value)}
              aria-required="true"
              aria-label="Telefone"
            />
          </label>
        </div>

        <div className={styles.buttonContainer}>
          <button
            type="submit"
            className={styles.buttonEnviar}
            disabled={hasErrors || !allFieldsFilled}
            aria-disabled={hasErrors || !allFieldsFilled}
          >
            Próximo
          </button>
        </div>
      </form>
    </div>
  );
}