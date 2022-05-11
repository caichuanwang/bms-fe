import React, { useCallback, useEffect } from 'react';
import useModalStatus from '../../../index.redux';
import { useLocale } from '../../../../../../../locales';
import ProForm, {
  ModalForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormInstance,
  ProFormText,
} from '@ant-design/pro-form';
import { message } from 'antd';
import { useCreate } from '../../../../../../../api/request';
export const editBorrow = 'edit-borrow';
const EditBorrow = () => {
  const { fm } = useLocale();

  const { visible, selectData, setModalStatus, refreshTable } =
    useModalStatus(editBorrow);
  const formRef = React.useRef<ProFormInstance>();
  const addMu = useCreate('/v1/borrow/update');
  const handleCancel = () => {
    setModalStatus(false);
  };
  const onFinish = async (formData: Record<string, any>) => {
    const res = await addMu.mutateAsync(
      {
        ...formData,
      },
      {
        onSuccess: () => {
          message.success(fm('global.tips.updateSuccess'));
          handleCancel();
          refreshTable();
        },
      }
    );
  };
  return (
    <>
      <ModalForm
        visible={visible}
        title={fm('borrow.editBorrowTitle')}
        modalProps={{
          onCancel: () => handleCancel(),
          destroyOnClose: true,
        }}
        onFinish={onFinish}
        formRef={formRef}
        initialValues={selectData as any}
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
export default EditBorrow;
