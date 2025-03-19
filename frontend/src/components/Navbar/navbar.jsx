import React from "react";
import { FaHome, FaUpload, FaUserPlus, FaBullhorn, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import styles from "./navbar.module.css";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

function Navbar() {
  const { signout } = useAuth(); // Pega a função de logout
  const navigate = useNavigate(); // Hook de navegação

  const handleLogout = () => {
    signout(); // Chama a função de logout
    navigate("/signin"); // Redireciona para a página de login
  };

  const handleHomeClick = () => {
    navigate("/home"); // Redireciona para a página de Home
  };

  const handleUploadClick = () => {
    navigate("/upload"); // Redireciona para a página de Upload
  };

  const handleCadastroClick = () => {
    navigate("/cadastrocliente"); // Redireciona para a página de Cadastro
  };

  const handleCampanhaClick = () => {
    navigate("/campanha"); // Redireciona para a página de Campanha
  };

  const handleMensagemClick = () => {
    navigate("/mensagem"); // Redireciona para a página de Mensagem
  };

  return (
    <nav className={styles.sidebar}>
      <ul className={styles.menu}>
        <li onClick={handleHomeClick}><FaHome className={styles.icon} />Home</li>
        <li onClick={handleUploadClick}><FaUpload className={styles.icon} /> Upload</li>
        <li onClick={handleCadastroClick}><FaUserPlus className={styles.icon} /> Cadastro</li>
        <li onClick={handleCampanhaClick}><FaBullhorn className={styles.icon} /> Campanha</li>
        <li onClick={handleMensagemClick}><FaEnvelope className={styles.icon} /> Mensagem</li>
        <li className={styles.logout} onClick={handleLogout}><FaSignOutAlt className={styles.icon} /> Sair</li>
      </ul>
    </nav>
  );
}

export default Navbar;
