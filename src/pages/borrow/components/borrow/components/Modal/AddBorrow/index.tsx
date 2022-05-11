import React, { useState } from 'react';

import useModalStatus from '../../../index.redux';
import { useLocale } from '../../../../../../../locales';
import ProForm, {
  ModalForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormText,
  ProFormTreeSelect,
} from '@ant-design/pro-form';
import { message, TreeSelect } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useCreate, useGet } from '../../../../../../../api/request';
import { RequestOptionsType } from '@ant-design/pro-utils';

export const addBorrow = 'add-borrow';
const AddBorrow = () => {
  const { fm } = useLocale();
  const { visible, setModalStatus, refreshTable } = useModalStatus(addBorrow);
  const formRef = React.useRef();
  const addMu = useCreate('/v1/borrow/add');
  const handleCancel = () => {
    setModalStatus(false);
  };
  const onFinish = async (formData: Record<string, any>) => {
    const res = await addMu.mutateAsync({
      ...formData,
      borrow_reader_id: Number(formData.borrow_reader_id),
    });
    if (res) {
      message.success(fm('global.tips.addSuccess'));
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
          <ProFormText
            width="sm"
            name="borrow_reader_id"
            label={fm('borrow.borrow_reader_id')}
            placeholder={
              fm('global.placeholderInp') + fm('borrow.borrow_reader_id')
            }
            rules={[
              {
                required: true,
                message:
                  fm('global.placeholderWri') + fm('borrow.borrow_reader_id'),
              },
            ]}
          />
          <ProFormText
            width="sm"
            name="borrow_book_isbn"
            label={fm('borrow.borrow_book_isbn')}
            placeholder={
              fm('global.placeholderInp') + fm('borrow.borrow_book_isbn')
            }
            rules={[
              {
                required: true,
                message:
                  fm('global.placeholderWri') + fm('borrow.borrow_book_isbn'),
              },
            ]}
          />
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
export default AddBorrow;
