import { BookmarkProps } from '../utils/types';

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
      <div className='overflow-clip pt-2 text-gray-400 text-sm font-light'>
        <span className='font-bold'>Tags</span>: {bookmark.tags.join(', ')}
      </div>
    </div>
  );
};

export default BookmarkComp;
