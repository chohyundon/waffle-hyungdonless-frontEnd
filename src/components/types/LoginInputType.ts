type LoginField = 'id' | 'password';

export interface LoginInputType {
  id: LoginField; // "id" 또는 "password"만 허용
  name: string;
  placeholder: string;
  ariaLabel: string;
  maxLength: number;
  type: string;
  formGuide: string;
}
