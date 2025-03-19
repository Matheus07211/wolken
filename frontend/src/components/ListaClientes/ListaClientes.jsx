import React from 'react';
import styles from './ListaClientes.module.css';



function ListaClientes({ clientes, selecionados, setSelecionados }) {
  

  // Lógica para alternar a seleção de todos os checkboxes
  const selecionarTodos = (checked) => {
    if (checked) {
      setSelecionados([...clientes]); // Seleciona todos
    } else {
      setSelecionados([]); // Limpa a seleção
    }
  };

  // Lógica para alternar a seleção individual
  const toggleSelecionado = (clienteSelecionado) => {
    console.log(clienteSelecionado);
    if (selecionados.some((c) => c.id === clienteSelecionado.id)) {
      setSelecionados(selecionados.filter((c) => c.id !== clienteSelecionado.id));
    } else {
      setSelecionados([...selecionados, clienteSelecionado]);
    }
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.headerRow}>
          <th>
            <input
              type="checkbox"
              onChange={(e) => selecionarTodos(e.target.checked)}
              checked={selecionados.length === clientes.length && clientes.length > 0}
            />
          </th>
          <th className={styles.headerCell}>Nome</th>
          <th className={styles.headerCell}>Email</th>
          <th className={styles.headerCell}>Animal</th>
          <th className={styles.headerCell}>Celular</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((cliente) => (
          <tr
            key={cliente.id}
            className={styles.row}
          >
            <td>
              <input
                type="checkbox"
                checked={selecionados.some((c) => c.id === cliente.id)}
                onChange={(e) => {
                  e.stopPropagation(); // Evita que o clique na checkbox dispare o `onClick` da linha
                  toggleSelecionado(cliente);
                }}
              />
            </td>
            <td className={styles.cell}>{cliente.nome}</td>
            <td className={styles.cell}>{cliente.email}</td>
            <td className={styles.cell}>{cliente.animal}</td>
            <td className={styles.cell}>{cliente.celular}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ListaClientes;
