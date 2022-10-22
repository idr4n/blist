import { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKeyPress } from '../hooks/useKeyPress';
import { openUrl } from '../utils/helpers';
import { BookmarksListProps } from '../utils/types';
import BookmarkComp from './Bookmark';

// types of actions to use in reducer
enum ActionType {
    UP = 'arrowUp',
    DOWN = 'arrowDown',
    SELECT = 'select',
    LENGTH = 'setListLength',
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

        default:
            return state;
    }
}

const BookmarksList: React.FC<BookmarksListProps> = ({ bookmarks }) => {
    const navigate = useNavigate();
    const arrowUpKey = useKeyPress('ArrowUp');
    const arrowDownKey = useKeyPress('ArrowDown');
    const escKey = useKeyPress('Escape');
    const enterKey = useKeyPress('Enter');
    const editKey = useKeyPress('e');
    const [state, dispatch] = useReducer(listReducer, {
        selectedIndex: -1,
        listLength: bookmarks.length,
    });

    const dispatchKey = (
        key: {
            keyPressed: boolean;
            setKeyPressed: React.Dispatch<React.SetStateAction<boolean>>;
        },
        action: ListAction
    ) => {
        if (key.keyPressed) {
            dispatch(action);
            key.setKeyPressed(false);
        }
    };

    useEffect(() => {
        dispatchKey(arrowUpKey, { type: ActionType.UP });
    }, [arrowUpKey.keyPressed]);

    useEffect(() => {
        dispatchKey(arrowDownKey, { type: ActionType.DOWN });
    }, [arrowDownKey.keyPressed]);

    useEffect(() => {
        dispatchKey(escKey, { type: ActionType.SELECT, payload: -1 });
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

    useEffect(() => {
        if (editKey.keyPressed && state.selectedIndex >= 0) {
            navigate(`/bookmarks/${bookmarks[state.selectedIndex].id}`, {
                replace: false,
            });
            editKey.setKeyPressed(false);
        }
    }, [editKey.keyPressed]);

    const handleHover = (
        e: React.MouseEvent<HTMLElement, MouseEvent>,
        idx: number
    ) => {
        if (e.type === 'mouseenter') {
            dispatch({ type: ActionType.SELECT, payload: idx });
        } else {
            dispatch({ type: ActionType.SELECT, payload: -1 });
        }
    };

    return (
        <div>
            <ul>
                {bookmarks.map((bookmark, idx) => (
                    <li
                        key={bookmark.id}
                        onMouseEnter={(e) => handleHover(e, idx)}
                        onMouseLeave={(e) => handleHover(e, idx)}
                    >
                        <BookmarkComp
                            bookmark={bookmark}
                            selected={
                                idx === state.selectedIndex ? true : false
                            }
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
