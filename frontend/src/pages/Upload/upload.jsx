import React, { useState } from "react";
import "./upload.css";
import Navbar from "../../components/Navbar/navbar";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      setError("");
    } else {
      setError("Por favor, selecione um arquivo .csv.");
      setFile(null);
    }
  };

  const handleUpload = () => {
    if (!file) {
      setError("Por favor, selecione um arquivo para fazer o upload.");
      return;
    }
    // Aqui você pode fazer o envio do arquivo para o servidor, por exemplo.
    console.log("Arquivo selecionado:", file.name);
    // Reset após envio (opcional)
    setFile(null);
  };

  return (
    <div> <Navbar/>
        <div className="upload-container">
            <h1>Upload de Arquivo CSV</h1>
            <p>Escolha um arquivo CSV para fazer o upload.</p>
      
        <div className="file-upload">
            <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
            />
        </div>

        {error && <p className="error">{error}</p>}
        {file && <p>Arquivo selecionado: {file.name}</p>}

        <button onClick={handleUpload}>Fazer Upload</button>
        </div>
    </div>
  );
}

export default Upload;
