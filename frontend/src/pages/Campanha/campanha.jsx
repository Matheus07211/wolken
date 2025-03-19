import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Importando o hook de navegação
import './campanha.css';
import Navbar from "../../components/Navbar/navbar";

function Mensagens() {
  const [conteudo, setConteudo] = useState("");
  const [mensagens, setMensagens] = useState([]);
  const [usuarioId, setUsuarioId] = useState(1);
  const navigate = useNavigate();  // Usando o hook de navegação

  useEffect(() => {
    const fetchMensagens = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/obter_mensagens");
        const data = await response.json();
        setMensagens(data);
      } catch (error) {
        console.error("Erro ao carregar mensagens:", error);
      }
    };
    fetchMensagens();
  }, []);

  const handleSalvarMensagem = async () => {
    if (!conteudo) {
      alert("Por favor, insira o conteúdo da mensagem.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/salvar_mensagem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ conteudo, usuario_id: usuarioId }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        setConteudo("");
        const updatedMensagens = await fetch("http://localhost:5000/api/obter_mensagens");
        const data = await updatedMensagens.json();
        setMensagens(data);
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Erro ao salvar mensagem:", error);
    }
  };

  const handleAçãoClick = (conteudoMensagem) => {
    navigate('/mensagem', { state: { mensagem: conteudoMensagem } });  // Navegar e passar o conteúdo
  };

  return (
    <div className="container">
      <Navbar />
      <div className="mensagens-container">
        <h1>Campanha</h1>
        <div className="input-group">
          <textarea
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            placeholder="Digite sua mensagem"
          />
          <button onClick={handleSalvarMensagem}>Salvar campanha</button>
        </div>

        <h2>Mensagens Salvas</h2>
        <table>
          <thead>
            <tr>
              <th>Conteúdo</th>
              <th>Horário</th>
              <th>Usuário</th>
              <th>Ação</th>  {/* Nova coluna "Ação" */}
            </tr>
          </thead>
          <tbody>
            {mensagens.map((mensagem, index) => (
              <tr key={index}>
                <td>{mensagem.conteudo}</td>
                <td>{mensagem.horario}</td>
                <td>{mensagem.usuario}</td>
                <td>
                  <button onClick={() => handleAçãoClick(mensagem.conteudo)}> 
                    {/* Ícone da seta (pode ser alterado por um ícone de sua escolha) */}
                    ➡️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Mensagens;
