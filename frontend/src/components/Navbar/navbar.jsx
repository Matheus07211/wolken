import React from "react";
import {
  FaHome,
  FaUpload,
  FaBullhorn,
  FaEnvelope,
  FaSignOutAlt,
} from "react-icons/fa";
import styles from "./navbar.module.css";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { handleLogout } = useAuth(); // Obtém a função de logout do contexto
  const navigate = useNavigate(); // Hook de navegação

  // Função para redirecionar para diferentes páginas
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className={styles.sidebar}>
      <ul className={styles.menu}>
        <li onClick={() => handleNavigation("/home")}>
          <FaHome className={styles.icon} /> Home
        </li>
        <li onClick={() => handleNavigation("/upload")}>
          <FaUpload className={styles.icon} /> Upload
        </li>
        <li onClick={() => handleNavigation("/campanha")}>
          <FaBullhorn className={styles.icon} /> Campanha
        </li>
        <li onClick={() => handleNavigation("/mensagem")}>
          <FaEnvelope className={styles.icon} /> Mensagem
        </li>
        <li className={styles.logout} onClick={handleLogout}>
          <FaSignOutAlt className={styles.icon} /> Sair
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
