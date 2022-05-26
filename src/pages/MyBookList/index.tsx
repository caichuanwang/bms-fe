import { Button } from 'antd';
import React from 'react';
import { useLocale } from '../../locales';
import AddList, { addMyBookList } from './components/AddList';
import BookListTable from './components/Table';
import useModalStateHooks from './index.redux';
const MyBookList = () => {
  const { fm } = useLocale();

  return (
    <>
      <AddList />
      <BookListTable />
    </>
  );
};
export default MyBookList;
