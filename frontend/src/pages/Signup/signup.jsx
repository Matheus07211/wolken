import React, { useState } from "react";
import Input from "../../components/Input/input";
import Button from "../../components/Button/button";
import { Link, useNavigate } from "react-router-dom";
import styles from "./signup.module.css";

const Signup = () => {
  const [username, setUsername] = useState(""); // Novo estado para nome de usuário
  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!username || !email || !emailConf || !senha) {
      setError("Preencha todos os campos");
      return;
    } else if (email !== emailConf) {
      setError("Os e-mails não são iguais");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          senha: senha,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erro ao cadastrar o usuário");
        return;
      }

      alert("Usuário cadastrado com sucesso!");
      navigate("/");
    } catch (error) {
      setError("Erro de conexão com o servidor");
    }
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>SISTEMA DE CADASTRO</label>
      <div className={styles.content}>
        <Input
          type="text"
          placeholder="Digite seu Nome de Usuário"
          value={username}
          onChange={(e) => [setUsername(e.target.value), setError("")]}
        />
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="email"
          placeholder="Confirme seu E-mail"
          value={emailConf}
          onChange={(e) => [setEmailConf(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <label className={styles["label-error"]}>{error}</label>
        <Button Text="Inscrever-se" onClick={handleSignup} />
        <label className={styles["label-signin"]}>
          Já tem uma conta?
          <strong className={styles.strong}>
            <Link to="/">&nbsp;Entre</Link>
          </strong>
        </label>
      </div>
    </div>
  );
};

export default Signup;
