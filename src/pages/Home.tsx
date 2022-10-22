import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
    return (
        <div className='flex flex-col max-w-[90%] xl:max-w-screen-lg mx-auto'>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default Home;
