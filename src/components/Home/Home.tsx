import { useEffect, useState } from 'react';
import { UserTypes } from '../types/googleUserTypes';
import { useNavigate } from 'react-router';
import { signOut } from 'firebase/auth';
import { auth } from '../util/firebaseconfig';

export function Home() {
  const [user, setUser] = useState<UserTypes | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData !== null) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogOut = async () => {
    if (user) {
      await signOut(auth);
      localStorage.removeItem('userData');
      setUser(null);
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      {user && (
        <>
          <p>{user?.userName}</p>
          <img src={user?.userImg} alt='UserImg' />
        </>
      )}
      <button onClick={handleLogOut}>{user ? '로그아웃' : '로그인'}</button>
    </>
  );
}
