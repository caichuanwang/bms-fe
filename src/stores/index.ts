import { configureStore } from '@reduxjs/toolkit';
import user from './user';
import bookType from './book';
import bookInfo from './bookInfo';
import borrow from './borrow';

const stores = configureStore({
  reducer: { user, bookType, bookInfo, borrow },
});
export type RootState = ReturnType<typeof stores.getState>;
export default stores;
