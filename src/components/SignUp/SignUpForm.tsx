import styles from "./SignUpForm.module.css";
import { SignUpData } from "../data/SignUpData";
import { useState } from "react";
import closeEyeIcon from "../../assets/closEye.svg";
import eyeIcon from "../../assets/openEye.svg";
import { GoogleLogin } from "../Login/GoogleLogin";

export function SignUpForm() {
  const [click, setIsClick] = useState(false);
  const [error, setError] = useState({
    email: false,
    password: false,
    passwordCheck: false,
  });
  const [signUpValue, setSignUpValue] = useState({
    email: "",
    password: "",
    passwordCheck: "",
  });

  const handleClick = () => {
    setIsClick((prev) => !prev);
  };

  const signUpInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setSignUpValue({ ...signUpValue, [name]: e.target.value });
  };

  const sendSignUpInputValue = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (
      !signUpValue.email.trim() ||
      !signUpValue.password.trim() ||
      !signUpValue.passwordCheck.trim()
    ) {
      setError({ email: true, password: true, passwordCheck: true });
    }
  };

  return (
    <form className={styles.mainContainer} onSubmit={sendSignUpInputValue}>
      <h1 className={styles.title}>회원가입</h1>
      <main className={styles.formContainer}>
        {SignUpData.map((data) => (
          <div className={styles.inputContainer} key={data.id}>
            <label className={styles.placeholderText}>{data.data}</label>
            <div style={{ position: "relative", width: "100%" }}>
              <input
                id={data.id}
                type={data.type === "password" && click ? "text" : data.type}
                name={data.name}
                placeholder={data.placeholder}
                className={error[data.name] ? styles.error : styles.inputText}
                value={signUpValue[data.id]}
                onChange={signUpInputValue}
                // required
              />
              {error.email && error.passwordCheck && (
                <span
                  className={
                    error[data.name] ? styles.errorFont : styles.formGuideText
                  }
                >
                  {data.formGuide}
                </span>
              )}
              <span
                className={
                  error[data.name] ? styles.errorFont : styles.formGuideText
                }
              >
                {data.defaultGuide}
              </span>
              {data.type === "password" && (
                <img
                  src={click ? eyeIcon : closeEyeIcon}
                  className={styles.icon}
                  onClick={handleClick}
                  alt="비밀번호 보기 전환"
                />
              )}
            </div>
          </div>
        ))}
        <button className={styles.buttonContainer}>다음</button>
        <div className={styles.orContainer}>
          <span className={styles.orBorder}></span>
          <span className={styles.orFont}>또는</span>
          <span className={styles.orBorder}></span>
        </div>
        <div className={styles.googleContainer}>
          <GoogleLogin />
        </div>
      </main>
    </form>
  );
}
