import { useState } from 'react';
import Swal from 'sweetalert2';

import { isCheckValid } from '../utils/isCheckValid';
import { isFormDataValid } from '../utils/isFormDataValid';

import eyeClosed from '../images/eye-closed.svg';
import eyeOpen from '../images/eye-open.svg';

import { FormDataType, PasswordInfoType } from '../types';

type FormProps = {
  onSetFormVisible: React.Dispatch<React.SetStateAction<boolean>>,
  onSetPasswordsList: React.Dispatch<React.SetStateAction<PasswordInfoType[]>>,
};

type ChangeEventType = React.ChangeEvent<HTMLInputElement>;
type SubmitEventType = React.FormEvent<HTMLFormElement>;

const initialFormData: FormDataType = {
  service: '',
  login: '',
  password: '',
  url: '',
};

function Form({ onSetFormVisible, onSetPasswordsList }: FormProps) {
  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = ({ target }: ChangeEventType) => {
    const { name, value } = target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: SubmitEventType) => {
    event.preventDefault();
    onSetPasswordsList((prevState) => {
      const prevId = prevState[prevState.length - 1]?.id;
      const newId = prevId ? prevId + 1 : 1;
      const newData = { id: newId, ...formData };
      return ([...prevState, newData]);
    });
    onSetFormVisible(false);

    Swal.fire({
      icon: 'success',
      text: 'Serviço cadastrado com sucesso',
      timer: 1500,
    });
  };

  const handleClick = () => {
    onSetFormVisible(false);
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const renderPasswordChecks = () => {
    const checks = [
      { text: 'Possuir 8 ou mais caracteres', className: '' },
      { text: 'Possuir letras e números', className: '' },
      { text: 'Possuir algum caractere especial', className: '' },
      { text: 'Possuir até 16 caracteres', className: '' },
    ];
    const { password } = formData;
    checks[0].className = isCheckValid(password.length > 8);
    checks[1].className = isCheckValid(/(?=.*\d)(?=.*[a-zA-Z])/g.test(password));
    checks[2].className = isCheckValid(/(?=.*\W)/g.test(password));
    checks[3].className = isCheckValid(password.length <= 16);
    return checks
      .map(({ text, className }) => <p key={ text } className={ className }>{ text }</p>);
  };

  return (
    <section>
      <form onSubmit={ handleSubmit } autoComplete="off">
        <div>
          <label htmlFor="service">Nome do Serviço</label>
          <input
            type="text"
            name="service"
            id="service"
            value={ formData.service }
            onChange={ handleChange }
          />
        </div>
        <div>
          <label htmlFor="login">
            Login
            {' '}
            <span>*</span>
          </label>
          <input
            type="text"
            name="login"
            id="login"
            value={ formData.login }
            onChange={ handleChange }
          />
          <label htmlFor="password">
            Senha
            {' '}
            <span>*</span>
          </label>
          <input
            type={ showPassword ? 'text' : 'password' }
            name="password"
            id="password"
            value={ formData.password }
            onChange={ handleChange }
          />
          <button
            data-testid="show-hide-form-password"
            type="button"
            onClick={ handleShowPasswordClick }
          >
            <img src={ showPassword ? eyeOpen : eyeClosed } alt="Eye icon" />
          </button>
        </div>
        <div>
          <label htmlFor="url">URL</label>
          <input
            type="text"
            name="url"
            id="url"
            value={ formData.url }
            onChange={ handleChange }
          />
        </div>
        <p>
          <span>*</span>
          {' '}
          Campos obrigatórios
        </p>
        <div>
          <button
            type="button"
            onClick={ handleClick }
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={ !isFormDataValid(formData) }
          >
            Cadastrar
          </button>
        </div>
      </form>
      <div>
        { renderPasswordChecks() }
      </div>
    </section>
  );
}

export default Form;
