import React, { useState, useEffect } from 'react';
import Filtro from '../../components/Filtro/Filtro';
import ListaClientes from '../../components/ListaClientes/ListaClientes';
import { useLocation } from 'react-router-dom';
import Box from '../../components/Box/Box';
import Envelope from '../../components/Envelope/envelope'; // Componente renomeado para Envelope
import Navbar from '../../components/Navbar/navbar';
import './mensagem.css';

function Mensagem() {
  const [termoBusca, setTermoBusca] = useState('');
  const [campoBusca, setCampoBusca] = useState('');
  const [selecionados, setSelecionados] = useState([]);
  const { state } = useLocation();  // Pegando o estado passado na navegação
  const [mensagem, setMensagem] = useState(state?.mensagem || '');  // Inicializando com o conteúdo recebido

  useEffect(() => {
    if (state?.mensagem) {
      setMensagem(state.mensagem);  // Atualizando o estado do conteúdo da mensagem
    }
  }, [state]);
  const handleFilter = (termo, campo) => {
    setTermoBusca(termo);
    setCampoBusca(campo);
  };

  const handleSelecionados = (clientesSelecionados) => {
    setSelecionados(clientesSelecionados);
  };

  const tratarMensagemEnvio = (cliente) => {
    return mensagem.replace(/{nome}/g, cliente.nome).replace(/{animal}/g, cliente.animal);
  };

  const enviarMensagem = async () => {
    if (!selecionados.length) {
      alert('Nenhum cliente selecionado.');
      return;
    }

    if (!mensagem.trim()) {
      alert('Digite uma mensagem.');
      return;
    }

    const contatos = selecionados.map(c => ({
      celular: c.celular,
      mensagem: tratarMensagemEnvio(c),
    }));

    try {
      const response = await fetch('http://localhost:5000/api/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contatos }),
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      console.log('Resposta do servidor:', await response.json());
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  const calcularTempoEstimado = (numeroContatos) => {
    const tempoEstimadoSegundos = numeroContatos * 15;
    const horas = Math.floor(tempoEstimadoSegundos / 3600);
    const minutos = Math.floor((tempoEstimadoSegundos % 3600) / 60);
    const segundos = tempoEstimadoSegundos % 60;
    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  };

  const handleMensagemClick = () => {
    const numeroContatos = selecionados.length;
    const tempoEstimado = calcularTempoEstimado(numeroContatos);
    if (window.confirm(`Você selecionou ${numeroContatos} contato(s). Tempo estimado: ${tempoEstimado}. Deseja prosseguir?`)) {
      enviarMensagem();
    }
  };


  return (
    <div className="container">
      <Navbar />
      <div className="main-content">
        <Filtro onFilter={handleFilter} />
        <ListaClientes termoBusca={termoBusca} campoBusca={campoBusca} onSelecionadosChange={handleSelecionados} />
        <Box setMensagem={setMensagem} mensagem={mensagem} />
        <Envelope onClick={handleMensagemClick} />
      </div>
    </div>
  );
}

export default Mensagem;
