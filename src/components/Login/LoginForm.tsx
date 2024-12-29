import { LoginInputData } from "../data";
import styles from "./LoginForm.module.css";
import eyeIcon from "../../assets/eyeIcon.svg";
import closeEyeIcon from "../../assets/closeEyeIcon.svg";
import { useState } from "react";

export function LoginForm() {
  const [click, setClick] = useState(false);

  const handleMouseClick = () => {
    setClick((prev) => !prev);
  };

  return (
    <>
      <form className={styles.loginFormContainer}>
        {LoginInputData.map((data) => (
          <>
            <label htmlFor={data.id} className={styles.loginFormLabel}>
              {data.ariaLabel}
            </label>
            <div className={styles.inputWrapper}>
              <input
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
          </>
        ))}
        <button className={styles.formButton}>로그인 해주세요</button>
      </form>
    </>
  );
}
