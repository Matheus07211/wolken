import { useState, useEffect } from "react";

const useAuth = () => {
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setSigned(!!token); // Se existir token, signed será true
  }, []);

  // Função de logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove o token do localStorage
    setSigned(false); // Atualiza o estado para deslogado
    window.location.href = "/"; // Redireciona para a página inicial
  };

  return { signed, handleLogout };
};

export default useAuth;
