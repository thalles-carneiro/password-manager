import lockerImg from '../images/locker-img.svg';
import linkImg from '../images/link-img.svg';
import trashImg from '../images/trash-img.svg';

import { PasswordInfoType } from '../types';

type PasswordCardProps = PasswordInfoType & {
  isPasswordHidden: boolean,
  onSetPasswordsList: React.Dispatch<React.SetStateAction<PasswordInfoType[]>>,
};

function PasswordCard(props: PasswordCardProps) {
  const { id, service, login, password, url,
    isPasswordHidden, onSetPasswordsList } = props;

  const handleClick = () => {
    onSetPasswordsList((prevState) => prevState
      .filter((passwordInfo) => passwordInfo.id !== id));
  };

  return (
    <div>
      <div>
        <img src={ lockerImg } alt="Locker icon" />
        <a href={ url }>
          { service }
          <img src={ linkImg } alt="Link icon" />
        </a>
      </div>
      <div>
        <p>Login</p>
        <p>{ login }</p>
      </div>
      <div>
        <p>Senha</p>
        <p hidden={ isPasswordHidden }>{ password }</p>
        <p hidden={ !isPasswordHidden }>******</p>
      </div>
      <div>
        <button data-testid="remove-btn" type="button" onClick={ handleClick }>
          <img src={ trashImg } alt="Trash icon" />
        </button>
      </div>
    </div>
  );
}

export default PasswordCard;
