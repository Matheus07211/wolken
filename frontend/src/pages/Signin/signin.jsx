import React, { useState } from "react";
import Input from "../../components/Input/input";
import Button from "../../components/Button/button";
import { Link, useNavigate } from "react-router-dom";
import styles from "./signin.module.css";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignin = async () => {
    if (!email || !senha) {
      setError("Preencha todos os campos");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erro ao realizar login");
        return;
      }

      // Salva o token no localStorage para autenticação futura
      localStorage.setItem("token", data.token);
      navigate("/home"); // Redireciona para uma página protegida
    } catch (error) {
      setError("Erro de conexão com o servidor");
    }
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>SISTEMA DE LOGIN</label>
      <div className={styles.content}>
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <label className={styles["label-error"]}>{error}</label>
        <Button Text="Entrar" onClick={handleSignin} />
        <label className={styles["label-signup"]}>
          Não tem uma conta?
          <strong className={styles.strong}>
            <Link to="/signup">&nbsp;Cadastre-se</Link>
          </strong>
        </label>
      </div>
    </div>
  );
};

export default Signin;
