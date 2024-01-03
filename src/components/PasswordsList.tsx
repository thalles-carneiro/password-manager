import { useState } from 'react';

import PasswordCard from './PasswordCard';

import lockerImg from '../images/locker-img.svg';
import { PasswordInfoType } from '../types';

type PasswordsListProps = {
  passwordsList: PasswordInfoType[],
  onSetPasswordsList: React.Dispatch<React.SetStateAction<PasswordInfoType[]>>,
};

function PasswordsList(props: PasswordsListProps) {
  const { passwordsList, onSetPasswordsList } = props;

  const [isPasswordHidden, setIsPasswordHidden] = useState(false);

  const handleChange = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  const renderPasswordList = () => (
    <>
      <div>
        <label htmlFor="hide-password">Esconder senhas</label>
        <input
          type="checkbox"
          name="hide-password"
          id="hide-password"
          checked={ isPasswordHidden }
          onChange={ handleChange }
        />
      </div>
      <div>
        { passwordsList
          .map((password) => (
            <PasswordCard
              key={ password.id }
              { ...password }
              isPasswordHidden={ isPasswordHidden }
              onSetPasswordsList={ onSetPasswordsList }
            />
          )) }
      </div>
    </>
  );

  const renderNoPasswordsList = () => (
    <div>
      <p>Não há nenhuma senha cadastrada...</p>
      <img src={ lockerImg } alt="Locker" />
    </div>
  );

  return (
    <section>
      {
        passwordsList.length > 0
          ? renderPasswordList()
          : renderNoPasswordsList()
      }
    </section>
  );
}

export default PasswordsList;
