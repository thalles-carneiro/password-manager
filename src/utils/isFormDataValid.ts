import { FormDataType } from '../types';

export const isFormDataValid = (formData: FormDataType) => {
  const { service, login, password } = formData;
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W)(?!.* ).{8,16}$/g;
  return (
    service.length > 0
    && login.length > 0
    && passwordRegex.test(password)
  );
};
