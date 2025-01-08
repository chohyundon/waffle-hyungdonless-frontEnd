import { LoginInputData } from "../data";
import styles from "./LoginForm.module.css";
import eyeIcon from "../../assets/openEye.svg";
import closeEyeIcon from "../../assets/closEye.svg";
import { useState } from "react";
import { useNavigate } from "react-router";
import { GoogleLogin } from "../index";
import checkCircle from "../../assets/CheckCircle.svg";
import nonCheckCircle from "../../assets/NonCheckCircle.svg";
import rightBar from "../../assets/rightBar.svg";

export function LoginForm() {
  const [click, setClick] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [inputData, setInputData] = useState<{ id: string; password: string }>({
    id: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleMouseClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setClick((prev) => !prev);
  };

  const handleLoginStatus = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLogin((prev) => !prev);
  };

  const moveSearchId = () => {
    navigate("/search");
  };

  const moveSignUpPage = () => {
    navigate("/signup");
  };

  const inputDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setInputData({ ...inputData, [name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setInputData(inputData);
  };

  return (
    <form className={styles.loginFormContainer} onSubmit={handleSubmit}>
      {LoginInputData.map((data) => (
        <div role="form" key={data.id} className={styles.inputWrapper}>
          <label htmlFor={data.id} className={styles.loginFormLabel}>
            {data.ariaLabel}
          </label>
          <input
            value={inputData[data.id]}
            onChange={inputDataChange}
            className={styles.inputText}
            id={data.id}
            placeholder={data.placeholder}
            name={data.name}
            required
            maxLength={data.maxLength}
            type={
              data.type === "password"
                ? click
                  ? "text"
                  : "password"
                : data.type
            }
          />
          {/* <span>{data.formGuide}</span> */}
          {data.id === "password" && (
            <img
              src={click ? eyeIcon : closeEyeIcon}
              alt="Toggle visibility"
              className={styles.icon}
              onClick={handleMouseClick}
            />
          )}
        </div>
      ))}
      <div className={styles.loginStatus}>
        <div className={styles.loginRemain} onClick={handleLoginStatus}>
          <img
            alt="로그인 상태 유지체크"
            src={isLogin ? checkCircle : nonCheckCircle}
            className={styles.checkIcon}
          />
          <p className={styles.fontStyle}>로그인 상태 유지하기</p>
        </div>
        <div className={styles.loginSearch} onClick={moveSearchId}>
          <p className={styles.fontStyle}>아이디/비밀번호 찾기</p>
          <img alt="아이디 비밀번호 찾기 바로가기" src={rightBar} />
        </div>
      </div>
      <button className={styles.formButton}>로그인</button>
      <div className={styles.orContainer}>
        <span className={styles.orStyle} />
        <p className={styles.orFont}>또는</p>
        <span className={styles.orStyle} />
      </div>
      <GoogleLogin />
      <div className={styles.signUp}>
        <p className={styles.Text}>아직 ‘사부작 사부작’에 처음이세요?</p>
        <p onClick={moveSignUpPage} className={styles.signUpText}>
          회원가입하기
        </p>
      </div>
    </form>
  );
}
