import React, { useState } from 'react';
import useModalStatus from '../../../index.redux';
import { useLocale } from '../../../../../locales';
import ProForm, { ModalForm, ProFormCheckbox } from '@ant-design/pro-form';
import { message, Row } from 'antd';
import { useCreate, useGet } from '../../../../../api/request';

export const AddBookList = 'add-book-list';
const AddBookListModal = () => {
  const { fm } = useLocale();
  const { visible, selectData, selectBookList, setModalStatus, refreshTable } =
    useModalStatus(AddBookList);
  const formRef = React.useRef();
  const addMu = useCreate('/v1/bookList/set2BookList');
  const handleCancel = () => {
    setModalStatus(false);
  };
  const onFinish = async (formData: Record<string, any>) => {
    const res = await addMu.mutateAsync({
      ...formData,
      isbn: selectData?.isbn,
    });
    if (res) {
      message.success(fm('borrow.collectSuccess'));
      handleCancel();
      refreshTable();
      return true;
    }
  };

  const { data: optionsData } = useGet<{
    data: { label: string; value: string }[];
  }>('bookListQuery', '/v1/bookList/options');

  return (
    <>
      <ModalForm
        visible={visible}
        title={fm('borrow.selectBookList')}
        modalProps={{
          onCancel: () => handleCancel(),
        }}
        onFinish={onFinish}
        formRef={formRef}
      >
        <ProForm.Group>
          <ProFormCheckbox.Group
            initialValue={selectBookList}
            name="bookLists"
            layout="vertical"
            label=""
            options={optionsData?.data}
          ></ProFormCheckbox.Group>
        </ProForm.Group>
      </ModalForm>
    </>
  );
};
export default AddBookListModal;
