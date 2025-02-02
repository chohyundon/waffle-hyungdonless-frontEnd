import styles from './SignUpSecondForm.module.css';
import Select from '../../assets/select.svg';
import React, { useState } from 'react';
import { useSession, getSession } from '../util/useSession.ts';
import { useTimer } from '../util/useTimer.ts';
import { Delay } from '../util/Delay.ts';
import { useNavigate } from 'react-router';

export const SignUpSecondForm = () => {
  const [inputValue, setInputValue] = useState({
    name: '',
    birth: '',
    number: '',
    checkNumber: '',
  });

  const [resultData, setResultData] = useState({
    status: '',
    verificationCode: ''
  })

  const navigate = useNavigate();

  const {count, startTimer, stopTimer} = useTimer()

  const [nameValid, setNameValid] = useState(false);
  const [dateValid, setDateValid] = useState(false);
  const [numberValid, setNumberValid] = useState(false);
  const [checkNumberValid, setCheckNumberValid] = useState(false);

  const userData = getSession('step1Data');

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputValue({
      ...inputValue,
      [name]: value,
    });

    if( name === 'name') {
      const nameRex = /^[ㄱ-ㅎ가-힣	]{3,5}$/
      setNameValid(nameRex.test(value))
    }

    if(name === 'birth') {
      if(value.trim() === '') {
        setDateValid(true);
      } else {
        setDateValid(false);
      }
    }

    if(name==='number') {
      const numberRex = /^(010)\d{8}$/
      setNumberValid(numberRex.test(value));
    }

    if(name === 'checkNumber') {
      if (value.trim() === '' && value !== resultData.verificationCode) {
        setCheckNumberValid(false);
      } else {
        setCheckNumberValid(value === resultData.verificationCode);
      }
    }
  };
  console.log(resultData)


  const sendSMSApi = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const sendBodyData = {
      email: userData && JSON.parse(userData).email,
      name: inputValue.name,
      number: inputValue.number,
    }

    if(inputValue.number && inputValue.number && userData && JSON.parse(userData)) {
      const response = await fetch('https://api.sabujak.life/sms/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendBodyData),
      });

      const result = await response.json();
      setResultData(result);
      startTimer(30);
    }
  };

  const isFormValid =
    nameValid &&
    numberValid &&
    checkNumberValid;

  const postData = {
    email: userData && JSON.parse(userData).email,
    password: userData && JSON.parse(userData).password,
    name: inputValue.name,
    birth: inputValue.birth,
    number: inputValue.number,
  }

  const sendSignupData = async (e: React.FormEvent<HTMLFormElement>) =>  {
    e.preventDefault();

    if(isFormValid) {
      stopTimer();
      useSession('step1Data', postData);
      await Delay(2000);
      navigate('/signUp/step3');
    }
  }

  return (
    <form className={styles.formContainer} onSubmit={sendSignupData}>
      <label className={styles.labelText}>이름</label>
      <input
        type='text'
        className={styles.inputBox}
        placeholder='조현돈'
        name='name'
        value={inputValue.name}
        onChange={inputChange}
        disabled={nameValid}
      />
      <span className={styles.errorFont}>
        {!nameValid && inputValue.name.length > 0 && `이름은 공백 제외 3글자 이상 7글자 미만으로 작성해주새요`}
      </span>
      <div className={styles.inputBoxContainer}>
        <label className={styles.labelText}>생년월일</label>
        <input
          type='date'
          className={styles.dateInputBox}
          name='birth'
          value={inputValue.birth}
          onChange={inputChange}
        />
      </div>
      <span className={styles.errorFont1}>
        {dateValid && `생년월일은 필수 입력 값 입니다.`}
      </span>
      <div className={styles.inputAuthContainer}>
        <label className={styles.labelTitle}>휴대전화 인증</label>
        <select className={styles.select}>
          <option>통신사</option>
        </select>
        <img src={Select} alt='select' className={styles.selectIcon} />
        <div className={styles.numberContainer}>
          <input
            type='text'
            placeholder='-없이 숫자만 입력'
            className={styles.writeNumber}
            name='number'
            value={inputValue.number}
            onChange={inputChange}
            disabled={numberValid}
          />
          <span className={styles.errorFont2}>
            {!numberValid && inputValue.number.length > 0 && '휴대폰 번호는 -를 제외하고 입력해주세요'}
          </span>
          <button
            className={styles.numberButton}
            disabled={count > 0 || checkNumberValid}
            onClick={sendSMSApi}
          >
            {count > 0 ? `00 : ${String(count).padStart(2, '0')}` : '인증요청'}
          </button>
        </div>
      </div>
      <input
        type='text'
        className={styles.inputBoxExample}
        placeholder='인증번호 입력'
        name='checkNumber'
        value={inputValue.checkNumber}
        onChange={inputChange}
        disabled={resultData.verificationCode === '' || checkNumberValid}
      />
      <span className={styles.goodFont}>{checkNumberValid && `인증번호가 확인 되었습니다`}</span>
      <span className={styles.errorFont3}>
        {!checkNumberValid && inputValue.checkNumber.length > 0 && '인증번호를 다시 입력해주세요'}
      </span>
      <button className={styles.subButton} disabled={!isFormValid}>다음</button>
    </form>
  );
};
