type idField = "email" | "password" | "passwordCheck";
type typeField = "text" | "password";

export interface SignUpTypes {
  id: idField;
  type: typeField;
  placeholder: string;
  name: idField;
  data?: string;
  formGuide?: string;
  defaultGuide?: string;
  passwordCheckGuide?: string
}
