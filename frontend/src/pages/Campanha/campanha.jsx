import React, { useState } from "react";
import Navbar from "../../components/Navbar/navbar";
import "./campanha.css";


function Campanha() {
  const [message, setMessage] = useState(""); // Estado para armazenar a mensagem inserida
  const [messagesList, setMessagesList] = useState([]); // Estado para armazenar a lista de mensagens

  const handleMessageChange = (event) => {
    setMessage(event.target.value); // Atualiza a mensagem conforme o usuário digita
  };

  const handleSaveMessage = () => {
    if (message.trim()) {
      setMessagesList([...messagesList, message]); // Adiciona a nova mensagem à lista
      setMessage(""); // Limpa o campo de mensagem após salvar
    }
  };

  return (
    <div> <Navbar></Navbar>
    <div className="campanha-container">
      <h1>Campanha - Enviar Mensagem</h1>
      <p>Insira sua mensagem abaixo e clique em "Salvar".</p>

      <div className="message-input">
        <textarea
          value={message}
          onChange={handleMessageChange}
          placeholder="Digite sua mensagem aqui..."
          rows="4"
        />
      </div>

      <button onClick={handleSaveMessage}>Salvar Mensagem</button>

      <div className="messages-list">
        <h2>Mensagens salvas:</h2>
        <ul>
          {messagesList.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
}

export default Campanha;
