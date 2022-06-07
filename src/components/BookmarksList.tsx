import { useEffect, useReducer } from 'react';
import { useKeyPress } from '../hooks/useKeyPress';
import { openUrl } from '../utils/helpers';
import { BookmarksListProps } from '../utils/types';
import BookmarkComp from './Bookmark';

// types of actions to use in reducer
enum ActionType {
  UP = 'arrowUp',
  DOWN = 'arrowDown',
  ESC = 'escape',
  SELECT = 'select',
  LENGTH = 'setListLength',
  GOTOURL = 'go_to_url',
}

// bookmarks list actions type
type ListAction = {
  type: ActionType;
  payload?: number;
};

// bookmarks list state type
type ListState = {
  selectedIndex: number;
  listLength: number;
};

function listReducer(state: ListState, action: ListAction) {
  const { type, payload = 1 } = action;

  switch (type) {
    case ActionType.UP:
      return {
        ...state,
        selectedIndex: !(state.selectedIndex <= 0)
          ? state.selectedIndex - 1
          : state.listLength - 1,
      };

    case ActionType.DOWN:
      return {
        ...state,
        selectedIndex:
          state.selectedIndex !== state.listLength - 1
            ? state.selectedIndex + 1
            : 0,
      };
    case ActionType.SELECT:
      return { ...state, selectedIndex: payload };

    case ActionType.LENGTH:
      return { ...state, listLength: payload };

    case ActionType.ESC:
      return {
        ...state,
        selectedIndex: state.selectedIndex >= 0 ? -1 : state.selectedIndex,
      };

    default:
      return state;
  }
}

const BookmarksList: React.FC<BookmarksListProps> = ({ bookmarks }) => {
  const arrowUpKey = useKeyPress('ArrowUp');
  const arrowDownKey = useKeyPress('ArrowDown');
  const escKey = useKeyPress('Escape');
  const enterKey = useKeyPress('Enter');
  const [state, dispatch] = useReducer(listReducer, {
    selectedIndex: -1,
    listLength: bookmarks.length,
  });

  useEffect(() => {
    if (arrowUpKey.keyPressed) {
      dispatch({ type: ActionType.UP });
      arrowUpKey.setKeyPressed(false)
    }
  }, [arrowUpKey.keyPressed]);

  useEffect(() => {
    if (arrowDownKey.keyPressed) {
      dispatch({ type: ActionType.DOWN });
      arrowDownKey.setKeyPressed(false)
    }
  }, [arrowDownKey.keyPressed]);

  useEffect(() => {
    if (escKey.keyPressed) {
      dispatch({ type: ActionType.ESC });
      escKey.setKeyPressed(false)
    }
  }, [escKey.keyPressed]);

  useEffect(() => {
    if (enterKey.keyPressed && state.selectedIndex >= 0) {
      openUrl(bookmarks[state.selectedIndex].title);
      enterKey.setKeyPressed(false);
    }
  }, [enterKey.keyPressed]);

  useEffect(() => {
    dispatch({ type: ActionType.LENGTH, payload: bookmarks.length });
  }, [bookmarks]);

  const handleClick = (
    _: React.MouseEvent<HTMLLIElement, MouseEvent>,
    idx: number
  ) => {
    dispatch({ type: ActionType.SELECT, payload: idx });
    openUrl(bookmarks[idx].title);
  };

  return (
    <div>
      <ul>
        {bookmarks.map((bookmark, idx) => (
          <li
            key={bookmark.id}
            onClick={(e) => handleClick(e, idx)}
          >
            <BookmarkComp
              bookmark={bookmark}
              selected={idx === state.selectedIndex ? true : false}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookmarksList;

// References:
// https://dev.to/craigaholliday/using-the-usereducer-hook-in-react-with-typescript-27m1
// https://blog.whereisthemouse.com/create-a-list-component-with-keyboard-navigation-in-react
