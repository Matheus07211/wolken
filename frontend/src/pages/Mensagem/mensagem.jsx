import React, { useState } from 'react';
import Filtro from '../../components/Filtro/Filtro';
import ListaClientes from '../../components/ListaClientes/ListaClientes';
import Box from '../../components/Box/Box';
import Envelope from '../../components/Envelope/envelope'; // Componente renomeado para Envelope
import Navbar from '../../components/Navbar/navbar';
import './mensagem.css';

function Mensagem() {
  const [clientes, setClientes] = useState([
    { id: 1, nome: 'Jean', email: 'jean@email.com', animal: 'cabrita', celular: '5518997282577' },
    { id: 2, nome: 'Estácio', email: 'mariaedu@email.com', animal: 'gato', celular: '5511989287078' },
    { id: 3, nome: 'Marcos', email: 'marcos@email.com', animal: 'gato', celular: '5512982465881' },
    { id: 4, nome: 'José', email: 'jose123@email.com', animal: 'cão', celular: '5512992087651' },
    { id: 5, nome: 'Pedro', email: 'pedrin@email.com', animal: 'coelho', celular: '5512997020189' },
  ]);

  const [termoBusca, setTermoBusca] = useState('');
  const [campoBusca, setCampoBusca] = useState('');
  const [selecionados, setSelecionados] = useState([]);
  const [mensagem, setMensagem] = useState('');

  const handleFilter = (termo, campo) => {
    setTermoBusca(termo);
    setCampoBusca(campo);
  };

  const clientesFiltrados = clientes.filter((cliente) => {
    if (campoBusca === 'nome') {
      return cliente.nome.toLowerCase().includes(termoBusca.toLowerCase());
    } else if (campoBusca === 'animal') {
      return cliente.animal.toLowerCase().includes(termoBusca.toLowerCase());
    } else {
      return true;
    }
  });

  const tratarMensagemEnvio = (cliente) => {
    return mensagem.replace(/{nome}/g, cliente.nome).replace(/{animal}/g, cliente.animal);
  };

  const enviarMensagem = async () => {
    if (!selecionados || selecionados.length === 0) {
      alert('Nenhum cliente selecionado.');
      return;
    }

    if (!mensagem || mensagem.trim() === '') {
      alert('Digite uma mensagem.');
      return;
    }

    const contatos = selecionados.map(c => ({
      celular: c.celular,
      mensagem: tratarMensagemEnvio(c),
    }));

    const data = { contatos };

    try {
      const response = await fetch('http://localhost:5000/api/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      const result = await response.json();
      console.log('Resposta do servidor:', result);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  const calcularTempoEstimado = (numeroContatos) => {
    const tempoEstimadoSegundos = numeroContatos * 15; // 15 segundos por contato
    const horas = Math.floor(tempoEstimadoSegundos / 3600);
    const minutos = Math.floor((tempoEstimadoSegundos % 3600) / 60);
    const segundos = tempoEstimadoSegundos % 60;

    // Formata o tempo em "hora:minutos:segundos"
    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  };

  const handleMensagemClick = () => {
    const numeroContatos = selecionados.length;
    const tempoEstimado = calcularTempoEstimado(numeroContatos);

    const confirmarEnvio = window.confirm(`Você selecionou ${numeroContatos} contato(s). \nO tempo estimado de execução é de ${tempoEstimado}. \nDeseja prosseguir?`);

    if (confirmarEnvio) {
      enviarMensagem();
    } else {
      console.log('Envio de mensagens cancelado.');
    }
  };

  return (
    <div className="container">
      <Navbar />
      <div className="main-content">
        <Filtro onFilter={handleFilter} />
        <ListaClientes clientes={clientesFiltrados} selecionados={selecionados} setSelecionados={setSelecionados} />
        <Box setMensagem={setMensagem} mensagem={mensagem} />
        <Envelope onClick={handleMensagemClick} />
      </div>
    </div>
  );
}

export default Mensagem;
