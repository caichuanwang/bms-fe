import React from 'react';
import BorrowTableManager from './components/borrow';
import BorrowModalManager from './components/borrow/components/Modal';
const BorrowManager = () => {
  return (
    <>
      <BorrowTableManager />
      <BorrowModalManager />
    </>
  );
};
export default BorrowManager;
