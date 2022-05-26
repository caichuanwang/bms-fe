import { configureStore } from '@reduxjs/toolkit';
import user from './user';
import bookType from './book';
import bookInfo from './bookInfo';
import borrow from './borrow';
import bookList from './bookList';
import MyBookList from './MyBookList';

const stores = configureStore({
  reducer: { user, bookType, bookInfo, borrow, bookList, MyBookList },
});
export type RootState = ReturnType<typeof stores.getState>;
export default stores;
