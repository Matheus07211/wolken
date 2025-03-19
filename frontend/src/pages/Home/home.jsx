import React from "react";
import Navbar from "../../components/Navbar/navbar";
import "./home.css";

const Home = () => {
  return (
    <div className="container">
      <Navbar />
      <div className="home-container">
        <h1>Bem-vindo ao Sistema de Gerenciamento da Veterinária</h1>
        <p>
          Este sistema foi desenvolvido para facilitar o cadastro e gerenciamento de clientes e seus animais de
          estimação. Aqui, você pode:
        </p>
        <ul>
          <li>Cadastrar novos clientes e seus respectivos animais.</li>
          <li>Gerenciar e pesquisar clientes de forma rápida e eficiente.</li>
          <li>Elaborar campanhas personalizadas para envio em massa.</li>
          <li>Enviar mensagens diretamente aos clientes cadastrados.</li>
        </ul>
        <p>
          Utilize o menu lateral para navegar entre as funcionalidades. Se precisar de ajuda, consulte a
          documentação ou entre em contato com o suporte.
        </p>
      </div>
    </div>
  );
};

export default Home;
