import React, { useState } from "react";
import Navbar from "../../components/Navbar/navbar";
import "./upload.css";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.name.endsWith(".xlsx")) {
      setFile(selectedFile);
      setError("");
    } else {
      setError("Por favor, selecione um arquivo .xlsx.");
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Por favor, selecione um arquivo para fazer o upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        setSuccess(responseData.message);
        setError("");
        setFile(null);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Erro ao enviar o arquivo.");
      }
    } catch (err) {
      console.error("Erro de conexão:", err);
      setError("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="container">
      <Navbar />
      <div className="upload-container">
        <h1>Upload de Arquivo XLSX</h1>

        <div className="file-upload">
          <input
            type="file"
            accept=".xlsx"
            onChange={handleFileChange}
          />
        </div>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        {file && <p>Arquivo selecionado: {file.name}</p>}

        <button onClick={handleUpload} disabled={!file}>
          Fazer Upload
        </button>
      </div>
    </div>
  );
};

export default Upload;
