import React, { useState } from "react";
import Navbar from "../../components/Navbar/navbar";
import "./cadastro.css";

function Cadastro() {
  const [clientName, setClientName] = useState(""); // Nome do cliente
  const [clientEmail, setClientEmail] = useState(""); // E-mail do cliente
  const [animals, setAnimals] = useState([{ name: "", species: "" }]); // Lista de animais

  const handleClientNameChange = (e) => {
    setClientName(e.target.value);
  };

  const handleClientEmailChange = (e) => {
    setClientEmail(e.target.value);
  };

  const handleAnimalChange = (index, field, value) => {
    const newAnimals = [...animals];
    newAnimals[index][field] = value;
    setAnimals(newAnimals);
  };

  const handleAddAnimal = () => {
    setAnimals([...animals, { name: "", species: "" }]); // Adiciona um novo animal à lista
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar os dados para o servidor ou processar os dados localmente
    console.log("Cliente:", clientName, clientEmail);
    console.log("Animais:", animals);
    // Resetando os campos
    setClientName("");
    setClientEmail("");
    setAnimals([{ name: "", species: "" }]);
  };

  return (

    <div>  <Navbar></Navbar> 
    <div className="cadastro-container">
      <h1>Cadastro de Cliente e Animais</h1>
      <p>Preencha as informações do cliente e dos animais.</p>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="clientName">Nome do Cliente</label>
          <input
            type="text"
            id="clientName"
            value={clientName}
            onChange={handleClientNameChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="clientEmail">E-mail do Cliente</label>
          <input
            type="email"
            id="clientEmail"
            value={clientEmail}
            onChange={handleClientEmailChange}
            required
          />
        </div>

        <div className="animals-section">
          <h2>Animais do Cliente</h2>
          {animals.map((animal, index) => (
            <div className="animal-group" key={index}>
              <div className="input-group">
                <label htmlFor={`animalName-${index}`}>Nome do Animal</label>
                <input
                  type="text"
                  id={`animalName-${index}`}
                  value={animal.name}
                  onChange={(e) =>
                    handleAnimalChange(index, "name", e.target.value)
                  }
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor={`animalSpecies-${index}`}>Espécie do Animal</label>
                <input
                  type="text"
                  id={`animalSpecies-${index}`}
                  value={animal.species}
                  onChange={(e) =>
                    handleAnimalChange(index, "species", e.target.value)
                  }
                  required
                />
              </div>
            </div>
          ))}
          <button type="button" onClick={handleAddAnimal}>
            Adicionar Outro Animal
          </button>
        </div>

        <button type="submit">Salvar Cadastro</button>
      </form>
    </div>
    </div>
  );
  
}

export default Cadastro;
