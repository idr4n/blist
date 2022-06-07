import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const navigate = useNavigate();
  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log('finished logging out...');
        navigate('/', { replace: false });
      })
      .catch((err: Error) => console.log(err.message));
  };

  return { logout };
};
