import { Link } from 'react-router-dom';
import { BookmarkProps } from '../utils/types';

// TODO: add hover effect to component. Maybe make it popup a bit

const BookmarkComp: React.FC<BookmarkProps> = ({ bookmark, selected }) => {
  return (
    <div
      className={[
        'flex',
        'flex-col',
        'justify-around',
        'px-4',
        'py-2',
        'my-2',
        'h-24',
        'lg:h-20',
        'rounded-xl',
        'shadow-sm',
        'shadow-gry-200',
        'border',
        'bordergray-100',
        'cursor-pointer',
        `${selected ? 'bg-gray-100' : ''}`,
      ].join(' ')}
    >
      <div className='whitespace-pre-line line-clamp-2 lg:line-clamp-1 text-ellipsis leading-snug text-gray-500 font-light'>
        {bookmark.title}
      </div>
      <div className='flex justify-between pt-2 text-sm font-light'>
        <div className='overflow-clip text-gray-400'>
          <span className='font-bold'>Tags</span>: {bookmark.tags.join(', ')}
        </div>
        <div className='text-gray-300'>
          {/* TODO: change Edit for a favicon */}
          <Link to={`/bookmarks/${bookmark.id}`}>Edit</Link>
        </div>
      </div>
    </div>
  );
};

export default BookmarkComp;
