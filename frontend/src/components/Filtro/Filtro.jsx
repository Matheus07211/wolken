import React, { useState } from 'react';
import styles from './Filtro.module.css';

function Filtro({ onFilter }) {
  const [termoBusca, setTermoBusca] = useState('');
  const [campoBusca, setCampoBusca] = useState('nome'); // Estado para controlar o campo de busca

  const handleFilterChange = (event) => {
    setTermoBusca(event.target.value);
    onFilter(event.target.value, campoBusca); // Passa o campo de busca para a função onFilter
  };

  const handleCampoBuscaChange = (event) => {
    setCampoBusca(event.target.value);
    // Limpar o termo de busca quando o campo de busca é alterado
    setTermoBusca(''); 
  };

  return (
    <div className={styles.container}>
      <select 
        value={campoBusca} 
        onChange={handleCampoBuscaChange} 
        className={styles.select}
      >
        <option value="nome">Nome</option>
        <option value="animal">Animal</option>
      </select>
      <input
        type="text"
        placeholder={`Pesquisar por ${campoBusca}`} 
        value={termoBusca}
        onChange={handleFilterChange}
        className={styles.input}
      />
    </div>
  );
}

export default Filtro;