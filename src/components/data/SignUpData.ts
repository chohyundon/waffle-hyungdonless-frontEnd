type ButtonType ={
  buttonText?: '다음' | '로그인' | '가입 완료' | '인증요청'
}

export interface UseInputData {
  type: 'text' | "password",
  name: "email" | 'password' | 'passwordCheck',
  label?: '이메일' | '비밀번호' | '이름' | '생년월일' | '휴대전화 인증' | '닉네임',
  errorMessage: '이메일 형식에 맞게 입력해주세요.' | '비밀번호가 일치하지 않습니다.' | '비밀번호는 8자리 이상 작성해주세요.' | '존재하는 이메일입니다.'
    | '인증번호가 일치하지 않습니다.' | '존재하는 닉네임입니다.',
  placeholder: 'example@email.com' | '비밀번호' | '비밀번호 확인' | '1999  /  06  /  01' | '‘-’없이 숫자만 입력' | '통신사' | '인증번호 입력' | '홍준표'
  id: "email" | 'password' | 'passwordCheck',
  required?: '이메일은 필수입니다' | '비밀번호는 필수입니다.'
}

export const SignUpInputData: UseInputData[] = [{
  type: 'text',
  name: 'email',
  label: '이메일',
  placeholder: 'example@email.com',
  errorMessage: '이메일 형식에 맞게 입력해주세요.',
  id: 'email',
  required: "이메일은 필수입니다",
}, {
  type: 'password',
  name: 'password',
  label: '비밀번호',
  placeholder: '비밀번호',
  errorMessage: '비밀번호는 8자리 이상 작성해주세요.',
  id: 'password',
  required: "비밀번호는 필수입니다.",
}, {
  type: 'password',
  name: 'passwordCheck',
  errorMessage: '비밀번호가 일치하지 않습니다.',
  placeholder: "비밀번호 확인",
  id: 'passwordCheck',
  required: "비밀번호는 필수입니다.",
}]

export const ButtonText:ButtonType = {
  buttonText: '다음',
}

export interface SignUpData  {
  email: string
  password: string
  passwordCheck: string
}