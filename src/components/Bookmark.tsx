import { Link } from 'react-router-dom';
import { BookmarkProps } from '../utils/types';

// TODO: add hover effect to component. Maybe make it popup a bit

  const goToBookmarkPage = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    navigate(`/bookmarks/${id}`, { replace: false });
  };

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
        <i
          className={`fa-solid fa-gear text-gray-200 transition-all duration-300 ${
            !isHovered ? 'invisible opacity-0' : 'visible opacity-100'
          }`}
          onClick={(e) => goToBookmarkPage(e, bookmark.id)}
        ></i>
      </div>
    </div>
  );
};

export default BookmarkComp;
