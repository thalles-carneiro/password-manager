export type PasswordInfoType = {
  id: number,
  service: string,
  login: string,
  password: string,
  url: string,
};

export type FormDataType = Omit<PasswordInfoType, 'id'>;
