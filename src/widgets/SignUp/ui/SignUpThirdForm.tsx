import styles from './SignUpThirdForm.module.css';
import { useForm } from 'react-hook-form';
import { SignUpStepName } from '../../../shared/types/SignUpType.ts';
import { getSession, removeSession } from '../../../shared/lib/useSession.ts';
import { Delay } from '../../../shared/lib/Delay.ts';
import { useNavigate } from 'react-router';

export const SignUpThirdForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpStepName>({ mode: 'onChange' });

  const getData = getSession('step1Data');
  const signUpData = getData && JSON.parse(getData);
  const navigate = useNavigate();
  console.log(signUpData);

  const sendNickName = async (data: SignUpStepName) => {
    const signUpSendData = {
      email: signUpData?.email,
      password: signUpData?.password,
      name: signUpData?.name,
      birth: signUpData?.birth,
      number: signUpData?.number,
      nickname: data.nickname,
    };

    const response = await fetch('https://api.sabujak.life/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signUpSendData),
    });

    if (response.status === 200) {
      await Delay(2000);
      removeSession('step1Data');
      navigate('/signUp/step4');
    }
  };

  return (
    <form
      className={styles.formContainer}
      onSubmit={handleSubmit(sendNickName)}
    >
      <label className={styles.titleName}>닉네임</label>
      <input
        type='text'
        placeholder='홍준표'
        className={styles.inputBox}
        aria-invalid={
          errors.nickname
            ? 'true'
            : isValid && !errors.nickname
              ? 'false'
              : undefined
        }
        {...register('nickname', {
          required: '닉네임값은 필수 입력 입니다.',
          minLength: {
            value: 2,
            message: '닉네임은 최소 2글자 이상 작성해주세요.',
          },
          maxLength: {
            value: 10,
            message: '닉네임은 10자 이내로 가능합니다.',
          },
        })}
      />
      {!errors.nickname && (
        <span className={styles.defaultFont}>10자 이내로 가능합니다.</span>
      )}
      {errors.nickname && (
        <span className={styles.errorFont}>{errors.nickname.message}</span>
      )}
      <button className={styles.buttonContainer} disabled={!isValid}>
        가입완료
      </button>
    </form>
  );
};
