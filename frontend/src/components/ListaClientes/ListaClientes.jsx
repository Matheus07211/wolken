import React, { useEffect, useState } from "react";

const ListaClientes = ({ termoBusca, campoBusca, onSelecionadosChange }) => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selecionados, setSelecionados] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/clientesvet_todas_linhas")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados.");
        }
        return await response.json();
      })
      .then((data) => {
        const clientesComAnimais = data.filter(
          (cliente) => cliente.animais && cliente.animais.length > 0
        );
        setClientes(clientesComAnimais);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar os dados: ", error);
        setLoading(false);
      });
  }, []);

  // Filtragem dos clientes conforme o termo de busca
  const clientesFiltrados = clientes.filter((cliente) => {
    if (!termoBusca) return true;
    if (campoBusca === "nome") {
      return cliente.nome.toLowerCase().includes(termoBusca.toLowerCase());
    } else if (campoBusca === "animal") {
      return cliente.animais.some((animal) =>
        animal.especie.toLowerCase().includes(termoBusca.toLowerCase())
      );
    }
    return true;
  });

  // Obtém todas as combinações cliente-animal para seleção
  const todasAsLinhas = clientesFiltrados.flatMap((cliente) =>
    cliente.animais.map((animal) => ({
      key: `${cliente.id}-${animal.id}`,
      idCliente: cliente.id,
      nomeCliente: cliente.nome,
      cpf: cliente.cpf,
      sexoCliente: cliente.sexo,
      telefones: cliente.telefones,
      dataInclusaoCliente: cliente.data_inclusao,
      ticketMedio: cliente.ticket_medio,
      ultimaVenda: cliente.ultima_venda,
      nomeAnimal: animal.nome,
      especie: animal.especie,
      raca: animal.raca,
      esterilizacao: animal.esterilizacao,
      nascimento: animal.nascimento,
      idade: animal.idade,
      sexoAnimal: animal.sexo,
      status: animal.status,
      dataInclusaoAnimal: animal.data_inclusao,
      vivoMorto: animal.vivo_morto,
    }))
  );

  // Verifica se todos os clientes estão selecionados
  const todosSelecionados =
    selecionados.length === todasAsLinhas.length && todasAsLinhas.length > 0;

  const toggleSelecionado = (linha) => {
    let novosSelecionados;
    if (selecionados.some((sel) => sel.key === linha.key)) {
      novosSelecionados = selecionados.filter((sel) => sel.key !== linha.key);
    } else {
      novosSelecionados = [...selecionados, linha];
    }
    setSelecionados(novosSelecionados);
    onSelecionadosChange(novosSelecionados);
  };

  const toggleSelecionarTodos = () => {
    const novosSelecionados = todosSelecionados ? [] : [...todasAsLinhas];
    setSelecionados(novosSelecionados);
    onSelecionadosChange(novosSelecionados);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Lista de Clientes com Animais</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-center">
                <input type="checkbox" checked={todosSelecionados} onChange={toggleSelecionarTodos} />
              </th>
              <th className="border px-4 py-2">Nome Cliente</th>
              <th className="border px-4 py-2">CPF</th>
              <th className="border px-4 py-2">Sexo Cliente</th>
              <th className="border px-4 py-2">Telefones</th>
              <th className="border px-4 py-2">Data Inclusão Cliente</th>
              <th className="border px-4 py-2">Ticket Médio</th>
              <th className="border px-4 py-2">Última Venda</th>
              <th className="border px-4 py-2">Nome Animal</th>
              <th className="border px-4 py-2">Espécie</th>
              <th className="border px-4 py-2">Raça</th>
              <th className="border px-4 py-2">Esterilização</th>
              <th className="border px-4 py-2">Nascimento</th>
              <th className="border px-4 py-2">Idade</th>
              <th className="border px-4 py-2">Sexo Animal</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Data Inclusão Animal</th>
              <th className="border px-4 py-2">Vivo/Morto</th>
            </tr>
          </thead>
          <tbody>
            {todasAsLinhas.map((linha) => (
              <tr key={linha.key}>
                <td className="border px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={selecionados.some((sel) => sel.key === linha.key)}
                    onChange={() => toggleSelecionado(linha)}
                  />
                </td>
                <td className="border px-4 py-2">{linha.nomeCliente}</td>
                <td className="border px-4 py-2">{linha.cpf}</td>
                <td className="border px-4 py-2">{linha.sexoCliente}</td>
                <td className="border px-4 py-2">{linha.telefones}</td>
                <td className="border px-4 py-2">{linha.dataInclusaoCliente}</td>
                <td className="border px-4 py-2">{linha.ticketMedio}</td>
                <td className="border px-4 py-2">{linha.ultimaVenda}</td>
                <td className="border px-4 py-2">{linha.nomeAnimal}</td>
                <td className="border px-4 py-2">{linha.especie}</td>
                <td className="border px-4 py-2">{linha.raca}</td>
                <td className="border px-4 py-2">{linha.esterilizacao}</td>
                <td className="border px-4 py-2">{linha.nascimento}</td>
                <td className="border px-4 py-2">{linha.idade}</td>
                <td className="border px-4 py-2">{linha.sexoAnimal}</td>
                <td className="border px-4 py-2">{linha.status}</td>
                <td className="border px-4 py-2">{linha.dataInclusaoAnimal}</td>
                <td className="border px-4 py-2">{linha.vivoMorto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListaClientes;
