import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://avatars1.githubusercontent.com/u/13399271?s=460&u=47d4f4179d6288c5dced72c96849c9caf54a5fb1&v=4" alt="Marcelo" />
        <div>
          <strong>Marcelo Lopes</strong>
          <span>Física</span>
        </div>
      </header>

      <p>
        Graduado em Analise e Desenvolvimento de Sistemas; programador júnior apaixonando por NodeJS, React e React Native.
          <br /><br />
        Pronto para levar sua física para outro mundo.
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 80,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  )
}

export default TeacherItem;