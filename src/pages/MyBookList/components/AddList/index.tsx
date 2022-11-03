import ProForm, {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { message } from 'antd';
import moment from 'moment';
import React from 'react';
import { useCreate } from '../../../../api/request';
import { useLocale } from '../../../../locales';
import useModalStatus from '../../index.redux';

export const addMyBookList = 'add-my-book-list';

const AddList = () => {
  const { fm } = useLocale();
  const { visible, selectData, setModalStatus, refreshTable } =
    useModalStatus(addMyBookList);
  const formRef = React.useRef();
  const addMu = useCreate('/v1/bookList/add');
  const handleCancel = () => {
    setModalStatus(false);
  };
  const onFinish = async (formData: Record<string, any>) => {
    const res = await addMu.mutateAsync({
      ...formData,
      userId: Number(localStorage.getItem('userId')),
      time: moment().format('YYYY-MM-DDTHH:mm:ssZ'),
    });
    if (res) {
      message.success(fm('borrow.addBookListSuccess'));
      handleCancel();
      refreshTable();
      return true;
    }
  };
  return (
    <>
      <ModalForm
        visible={visible}
        title={fm('book.list.addTitle')}
        modalProps={{
          onCancel: () => handleCancel(),
        }}
        onFinish={onFinish}
        formRef={formRef}
      >
        <ProForm.Group>
          <ProFormText name="name" label={fm('book.bookListName')} />
          <ProFormTextArea name="remake" label={fm('book.list.remake')} />
        </ProForm.Group>
      </ModalForm>
    </>
  );
};
export default AddList;
