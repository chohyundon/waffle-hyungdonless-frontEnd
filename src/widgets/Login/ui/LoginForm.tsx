import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import styles from './LoginForm.module.css';
import eyeIcon from '../../../shared/assets/icons/openEye.svg';
import closeEye from '../../../shared/assets/icons/closeEye.svg';
import { LoginInputType } from '../../../shared/types/LoginInputType';

interface StatusProps {
  status: string;
  message: string;
}

export function LoginForm() {
  const [click, setClick] = useState(false);
  const [status, setStatus] = useState<StatusProps>();
  const [user, setUser] = useState<any[]>([]);
  const [userData, setUserData] = useState<LoginInputType | null>(null);
  const [realUserData, setRealUserData] = useState<any | null>(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<LoginInputType>();

  const loginInput = async (data: LoginInputType) => {
    setUserData(data);

    await fetch('https://api.sabujak.life/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => setStatus(data));
  };

  useEffect(() => {
    if (status?.message === '로그인 성공') {
      fetch('https://api.sabujak.life/users')
        .then((res) => res.json())
        .then((data) => setUser(data.data))
        .catch((error) => console.error('유저 데이터 가져오기 실패:', error));
    }
  }, [status]);

  useEffect(() => {
    if (userData && user.length > 0) {
      const matchedUser = user.find((item) => item.email === userData.email);
      setRealUserData(matchedUser || null);

      if (matchedUser) {
        localStorage.setItem('user', JSON.stringify(matchedUser));
        console.log('로컬 스토리지에 저장된 데이터:', matchedUser);
      }
    }
  }, [user, userData]);

  useEffect(() => {
    // 로컬 스토리지와 realUserData가 일치하면 이동
    const storedUser = localStorage.getItem('user');
    if (storedUser && realUserData) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.email === realUserData.email) {
        navigate('/'); // 페이지 이동
      }
    }
  }, [realUserData, navigate]);

  const showPassword = () => setClick((prev) => !prev);

  return (
    <div>
      <form
        className={styles.loginFormContainer}
        onSubmit={handleSubmit(loginInput)}
      >
        <input
          type='text'
          placeholder='이메일'
          className={styles.inputText}
          aria-invalid={
            isSubmitted ? (errors.email ? 'true' : 'false') : undefined
          }
          {...register('email', {
            required: '이메일 입력은 필수 입니다.',
            pattern: {
              value:
                /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i,
              message: '이메일 형식에 맞게 입력해주세요.',
            },
          })}
        />
        {errors.email && (
          <span className={styles.errorMailFont}>{errors.email.message}</span>
        )}

        <input
          type={click ? 'text' : 'password'}
          placeholder='비밀번호'
          className={styles.inputText}
          aria-invalid={
            isSubmitted ? (errors.password ? 'true' : 'false') : undefined
          }
          {...register('password', {
            required: '비밀번호 입력은 필수 입니다.',
            minLength: {
              value: 8,
              message: '비밀번호 길이를 8자리 이상 입력해주세요.',
            },
          })}
        />
        <img
          src={click ? eyeIcon : closeEye}
          alt='비밀번호 확인'
          className={styles.icon}
          onClick={showPassword}
        />
        {errors.password && (
          <span className={styles.errorFont}>{errors.password.message}</span>
        )}

        <button className={styles.formButton}>로그인</button>
      </form>
    </div>
  );
}