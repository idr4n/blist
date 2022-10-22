import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import Button from './Button';

const Navbar = () => {
    const { logout } = useLogout();

    return (
        // <nav className='w-full px-2 md:px-10 flex justify-between items-center h-16 py-10'>
        <nav className='w-full px-2 flex justify-between items-center h-16 py-10'>
            <Link to='/'>
                <h1>BMList</h1>
            </Link>
            <div className='flex'>
                <Link to='login'>
                    <Button text='Sign In' />
                </Link>
                <div onClick={logout} className='pl-5'>
                    <Button text='Logout' border={false} />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
