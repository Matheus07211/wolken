import React from 'react';
import styles from './Box.module.css';

const Box = ({ setMensagem, mensagem }) => {

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
      <textarea
        id="message-input"
        placeholder="Insira a mensagem aqui"
        value={mensagem}
        onChange={handleInputChange}
        className={styles.textarea}
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
        <button onClick={() => insertText('{nome}')} className={styles.button}>
          Nome
        </button>
        <button onClick={() => insertText('{animal}')} className={styles.button}>
          Animal
        </button>
      </div>
    </div>
  );
};

export default Box;
