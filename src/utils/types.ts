export type Bookmark = {
  id: string;
  title: string;
  tags: string[];
};

export type BookmarksListProps = {
  bookmarks: Bookmark[];
  onBookmarkClick?: (bookmark: Bookmark) => void;
};

export type BookmarkProps = {
  bookmark: Bookmark;
  selected: boolean;
};

