import React, { useState } from "react";
import Input from "../../components/Input/input";
import Button from "../../components/Button/button";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./signin.css"; // Importando o arquivo CSS

const Signin = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !senha) {
      setError("Preencha todos os campos");
      return;
    }

    const res = signin(email, senha);

    if (res) {
      setError(res);
      return;
    }

    navigate("/home");
  };

  return (
    <div className="container">
      <label className="label">SISTEMA DE LOGIN</label>
      <div className="content">
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
        <label className="label-error">{error}</label>
        <Button Text="Entrar" onClick={handleLogin} />
        <label className="label-signup">
          Não tem uma conta?
          <strong className="strong">
            <Link to="/signup">&nbsp;Registre-se</Link>
          </strong>
        </label>
      </div>
    </div>
  );
};

export default Signin;
