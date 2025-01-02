import { LoginInputType } from "../types/LoginInputType";

export const LoginInputData: LoginInputType[] = [
  {
    id: "id",
    placeholder: "아이디를 입력해주세요",
    name: "id",
    ariaLabel: "아이디",
    maxLength: 12,
    formGuide: "6~12자 영문, 숫자로 입력 해주세요",
    type: "text",
  },
  {
    id: "password",
    placeholder: "비밀번호를 입력해주세요",
    name: "password",
    ariaLabel: "패스워드",
    maxLength: 15,
    formGuide:
      "영문, 숫자를 혼합하여 6~12자로 입력 해주세요. (특수문자는 .!@#$% 만 허용됩니다.)",
    type: "password",
  },
];
