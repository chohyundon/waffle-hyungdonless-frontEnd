import { SignUpTypes } from "../types/SignUpTypes";

export const SignUpData: SignUpTypes[] = [
  {
    id: "email",
    placeholder: "example@gmail.com",
    name: "email",
    type: "text",
    data: "이메일",
    formGuide: "이메일 형식에 맞게 입력해주세요.",
  },
  {
    id: "password",
    placeholder: "비밀번호",
    name: "password",
    type: "password",
    data: "비밀번호",
    defaultGuide: "영문 대·소문자/숫자/특수문자 중 2가지 이상 조합, 8자~32자",
  },
  {
    id: "passwordCheck",
    placeholder: "비밀번호 확인",
    name: "passwordCheck",
    type: "password",
    formGuide: "비밀번호가 일치하지 않습니다. ",
  },
];
