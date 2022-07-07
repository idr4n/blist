import { useNavigate } from 'react-router-dom';
import { BookmarkProps } from '../utils/types';
import { openUrl } from '../utils/helpers';

const BookmarkComp: React.FC<BookmarkProps> = ({ bookmark, selected }) => {
  const navigate = useNavigate();

  const handleBookmarkClick = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    bookmarkTitle: string
  ) => {
    e.stopPropagation();
    openUrl(bookmarkTitle);
  };

  const goToBookmarkPage = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    navigate(`/bookmarks/${id}`, { replace: false });
  };

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
        'shadow-gray-200',
        'border',
        'bordergray-100',
        'cursor-pointer',
        'transition-all',
        'duration-200',
        `${selected ? 'bg-gray-50 shadow-gray-400' : ''}`,
      ].join(' ')}
      onClick={(e) => handleBookmarkClick(e, bookmark.title)}
    >
      <div className='whitespace-pre-line line-clamp-2 lg:line-clamp-1 text-ellipsis leading-snug text-gray-500 font-light'>
        {bookmark.title}
      </div>
      <div className='flex justify-between pt-2 text-sm font-light'>
        <div className='overflow-clip text-gray-400'>
          <span className='font-bold'>Tags</span>: {bookmark.tags.join(', ')}
        </div>
        {/* TODO: add tooltip on hover icon*/}
        <i
          className={`fa-solid fa-gear text-gray-200 transition-all duration-200 ${
            !selected ? 'invisible opacity-0' : 'visible opacity-100'
          }`}
          onClick={(e) => goToBookmarkPage(e, bookmark.id)}
        ></i>
      </div>
    </div>
  );
};

export default BookmarkComp;
