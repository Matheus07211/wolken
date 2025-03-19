import React from 'react';
import { FaEnvelope } from 'react-icons/fa';
import styles from './envelope.module.css';

function Envelope({onClick}) {
  return (
    <button className={styles.mensagemButton} onClick={onClick}>
      <FaEnvelope className={styles.mensagemIcon} />
    </button>
  );
}

export default Envelope;