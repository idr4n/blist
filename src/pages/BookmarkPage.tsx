import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { useKeyPress } from '../hooks/useKeyPress';
import { getURL, openUrl } from '../utils/helpers';
import { BookmarkType } from '../utils/types';

const BookmarkPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const enterKey = useKeyPress('Enter');
    // TODO: add keyboard shortcut 'e' to edit the bookmark's info
    const url = `http://localhost:3001/bookmarks/${id}`;
    const {
        data: bookmark,
        isPending,
        error,
    } = useFetch<BookmarkType | null>(url, null);

    useEffect(() => {
        if (enterKey.keyPressed) {
            bookmark && openUrl(bookmark.title);
            enterKey.setKeyPressed(false);
        }
    }, [enterKey.keyPressed]);

    return (
        <div>
            {error && <p className='text-center'>{error}</p>}
            {isPending && <h3 className='text-center py-2'>Loading...</h3>}
            {bookmark && (
                <div className='flex flex-col max-w-[90%] lg:max-w-screen-md mx-auto'>
                    <h3 className='text-center py-5'>
                        Bookmark URL: {getURL(bookmark.title)}
                    </h3>
                    <div className='py-3 font-light text-gray-600'>
                        <p className='py-1'>
                            <span className='font-bold'>Title</span>:{' '}
                            {bookmark.title}
                        </p>
                        <p className='py-1'>
                            <span className='font-bold'>Tags</span>:{' '}
                            {bookmark.tags}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookmarkPage;
