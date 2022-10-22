import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';

export const useLogin = () => {
    const [error, setError] = useState('');

    let navigate = useNavigate();

    const provider = new GoogleAuthProvider();

    const login = async () => {
        setError('');
        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result.user.displayName);
            navigate('/dashboard', { replace: true });

            if (!result) {
                throw new Error('Could not sign in');
            }
        } catch (err: any) {
            console.log(err.message);
            setError(err.message);
        }
    };

    return { error, login };
};
