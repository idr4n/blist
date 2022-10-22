import { useState } from 'react';
import BookmarksList from '../components/BookmarksList';
import { useFetch } from '../hooks/useFetch';
import { BookmarkType } from '../utils/types';

const Dashboard: React.FC = () => {
    const [url, setUrl] = useState('http://localhost:3001/bookmarks');
    const {
        data: bookmarks,
        isPending,
        error,
    } = useFetch<BookmarkType[]>(url, []);

    return (
        <div className='flex flex-col max-w-[90%] lg:max-w-screen-md mx-auto'>
            <h2 className='text-center py-5'>Bookmarks</h2>
            {isPending && <h3 className='text-center py-2'>Loading...</h3>}
            {/* TODO: format error to be displayed nicer*/}
            {error && <div>{error}</div>}
            <BookmarksList bookmarks={bookmarks} />
        </div>
    );
};

export default Dashboard;
