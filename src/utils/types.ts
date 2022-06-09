export type BookmarkType = {
  id: string;
  title: string;
  tags: string[];
};

export type BookmarksListProps = {
  bookmarks: BookmarkType[];
  onBookmarkClick?: (bookmark: BookmarkType) => void;
};

export type BookmarkProps = {
  bookmark: BookmarkType;
  selected: boolean;
};

