import { AutoComplete, Input } from 'antd';
import React, { ReactEventHandler, useState } from 'react';

export interface IBookListHeader {
  handleSearch: (value: string) => void;
}

const BookListHeader: React.FC<IBookListHeader> = (props) => {
  const handleClick = (e: any) => {
    props.handleSearch(e.target.value);
  };
  return (
    <>
      <Input.Search
        size="large"
        placeholder="input here"
        enterButton
        onPressEnter={handleClick}
      />
    </>
  );
};
export default BookListHeader;
