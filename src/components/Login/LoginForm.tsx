import { LoginInputData } from "../data";
import styles from "./LoginForm.module.css";
import eyeIcon from "../../assets/eyeIcon.svg";
import closeEyeIcon from "../../assets/closeEyeIcon.svg";
import { useState } from "react";
import { useNavigate } from "react-router";

export function LoginForm() {
  const [click, setClick] = useState(false);
  const [inputData, setInputData] = useState<{ id: string; password: string }>({
    id: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleMouseClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setClick((prev) => !prev);
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
    <>
      <form className={styles.loginFormContainer} onSubmit={handleSubmit}>
        {LoginInputData.map((data) => (
          <div role="form" key={data.id} className={styles.inputWrapper}>
            <label htmlFor={data.id} className={styles.loginFormLabel}>
              {data.ariaLabel}
            </label>
            <>
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
            </>
          </div>
        ))}
        <button className={styles.formButton}>로그인 해주세요</button>
        <button className={styles.formButton} onClick={moveSignUpPage}>
          회원가입
        </button>
      </form>
    </>
  );
}
