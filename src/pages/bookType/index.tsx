import React from 'react';
import BookType from './components/bookType';
import BookTypeModalManager from './components/bookType/components/Modal';
const bookManager = () => {
  return (
    <>
      <BookType />
      <BookTypeModalManager />
    </>
  );
};
export default bookManager;
