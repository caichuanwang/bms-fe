import React, { useState } from 'react';
import useModalStatus from '../../../index.redux';
import { useLocale } from '../../../../../locales';
import ProForm, { ModalForm, ProFormDatePicker } from '@ant-design/pro-form';
import { message } from 'antd';
import { useCreate } from '../../../../../api/request';

export const BookListBorrow = 'book-list-borrow';
const BookListBorrowModal = () => {
  const { fm } = useLocale();
  const { visible, selectData, setModalStatus, refreshTable } =
    useModalStatus(BookListBorrow);
  const formRef = React.useRef();
  const addMu = useCreate('/v1/borrow/add');
  const handleCancel = () => {
    setModalStatus(false);
  };
  const onFinish = async (formData: Record<string, any>) => {
    const res = await addMu.mutateAsync({
      borrow_reader_id: Number(localStorage.getItem('userId')),
      borrow_book_isbn: selectData?.isbn,
      should_return_time: formData.should_return_time,
    });
    if (res) {
      message.success(fm('borrow.tipSuccess'));
      handleCancel();
      refreshTable();
      return true;
    }
  };

  return (
    <>
      <ModalForm
        visible={visible}
        title={fm('borrow.addBorrowTitle')}
        modalProps={{
          onCancel: () => handleCancel(),
        }}
        onFinish={onFinish}
        formRef={formRef}
      >
        <ProForm.Group>
          <ProFormDatePicker
            width="sm"
            name="should_return_time"
            label={fm('borrow.should_return_time')}
            placeholder={
              fm('global.placeholderInp') + fm('borrow.should_return_time')
            }
          />
        </ProForm.Group>
      </ModalForm>
    </>
  );
};
export default BookListBorrowModal;
