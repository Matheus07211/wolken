import React, { useState } from 'react';
import styles from './Box.module.css';

const Box = ({ setMensagem, mensagem }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const applyStyle = (style) => {
    const input = document.getElementById('message-input');
    const start = input.selectionStart;
    const end = input.selectionEnd;

    if (start !== end) {
      const selectedText = input.value.substring(start, end);
      setMensagem((prevMessage) => 
        `${prevMessage.slice(0, start)}${style}${selectedText}${style}${prevMessage.slice(end)}`
      );
    } else {
      setMensagem((prevMessage) => `${style}${prevMessage}${style}`);
    }
  };

  const handleInputChange = (event) => {
    setMensagem(event.target.value);
  };

  const insertText = (text) => {
    const input = document.getElementById('message-input');
    const start = input.selectionStart;
    const end = input.selectionEnd;

    setMensagem((prevMessage) => 
      `${prevMessage.slice(0, start)}${text}${prevMessage.slice(end)}`
    );
  };

  return (
    <div className={styles.container}>
      <button onClick={() => setIsModalOpen(true)} className={styles.infoButton}>
        ℹ️
      </button>
      <input
        id="message-input"
        type="text"
        placeholder="Insira a mensagem aqui"
        value={mensagem}
        onChange={handleInputChange}
        className={styles.input}
      />
      <div className={styles.buttons}>
        <button onClick={() => applyStyle('*')} className={styles.button}>
          Negrito
        </button>
        <button onClick={() => applyStyle('_')} className={styles.button}>
          Itálico
        </button>
        <button onClick={() => applyStyle('~')} className={styles.button}>
          Tachado
        </button>
        {/* Novo botão "Nome" */}
        <button onClick={() => insertText('{nome}')} className={styles.button}>
          Nome
        </button>
        {/* Novo botão "Animal" */}
        <button onClick={() => insertText('{animal}')} className={styles.button}>
          Animal
        </button>
      </div>

      {isModalOpen && (
        <div className={styles.modalBackdrop} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Personalização de mensagens</h2>
            <p>
              - Para personalizar por nome do cliente, insira: <code>{'{nome}'}</code>.
            </p>
            <p>
              - Para personalizar por tipo do animal, insira: <code>{'{animal}'}</code>.
            </p>
            <button onClick={() => setIsModalOpen(false)} className={styles.closeButton}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Box;
