import GoogleButton from '../assets/btn_google_signin.png';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
    const { error, login } = useLogin();

    return (
        <div className='pt-20 flex flex-col items-center'>
            <div className='text-xl font-bold'>
                Login with your Google account
            </div>
            <div onClick={login} className='mx-auto py-10 cursor-pointer'>
                <img
                    src={GoogleButton}
                    alt='Google signin button'
                    className='w-56'
                />
            </div>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;
