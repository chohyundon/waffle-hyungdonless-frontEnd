import { useEffect, useState } from "react";
import { UserTypes } from "../types/googleUserTypes";

export function Home() {
  const [user, setUser] = useState<UserTypes | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData !== null) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("userData");
  };

  console.log(user);

  return (
    <>
      {user && (
        <>
          <p>{user?.userName}</p>
          <img src={user?.userImg} alt="User이미지" />
        </>
      )}
      <button onClick={handleLogOut}>{user ? "로그아웃" : "로그인"}</button>
    </>
  );
}
