import { useState } from 'react';

import Form from './components/Form';
import PasswordsList from './components/PasswordsList';
import { PasswordInfoType } from './types';

import './App.css';

function App() {
  const [passwordsList, setPasswordsList] = useState<PasswordInfoType[]>([]);
  const [formVisible, setFormVisible] = useState(false);

  const renderNewPasswordBtn = () => (
    <button
      type="button"
      onClick={ () => setFormVisible(true) }
    >
      Cadastrar Nova Senha
    </button>
  );

  return (
    <>
      <header>
        <h1>Gerenciador de senhas</h1>
        {
          formVisible
            ? (
              <Form
                onSetFormVisible={ setFormVisible }
                onSetPasswordsList={ setPasswordsList }
              />)
            : renderNewPasswordBtn()
        }
        <br />
      </header>
      <main>
        <PasswordsList
          passwordsList={ passwordsList }
          onSetPasswordsList={ setPasswordsList }
        />
      </main>
    </>
  );
}

export default App;
