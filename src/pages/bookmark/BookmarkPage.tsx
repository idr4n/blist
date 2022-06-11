import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { BookmarkType } from '../../utils/types';

const BookmarkPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const url = `http://localhost:3001/bookmarks/${id}`;
  const {
    data: bookmark,
    isPending,
    error,
  } = useFetch<BookmarkType | null>(url, null);

  return (
    <div>
      {error && <p className='text-center'>{error}</p>}
      {isPending && <h3 className='text-center py-2'>Loading...</h3>}
      {bookmark && (
        <div>
          <p className='py-5'>Bookmark Title: {bookmark.title}</p>
        </div>
      )}
    </div>
  );
};

export default BookmarkPage;
