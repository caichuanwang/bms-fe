import React from 'react';
import BookInfoManager from './components/bookInfo';
import BookInfoModalManager from './components/bookInfo/components/Modal';
const bookManager = () => {
  return (
    <>
      <BookInfoManager />
      <BookInfoModalManager />
    </>
  );
};
export default bookManager;
