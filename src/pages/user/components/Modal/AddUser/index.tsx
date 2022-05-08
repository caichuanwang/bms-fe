import React, { useRef } from 'react';
import axios, { useCreate } from '../../../../../api/request';
import useModalState from './index.hooks';
import { message } from 'antd';
import { http } from '../../../../../enum/httpStatus';
import BaseForm from '../BaseForm';
import { useLocale } from '../../../../../locales';
const AddUser = () => {
  const formRef = useRef<any>();
  const { fm } = useLocale();
  const mutation = useCreate('/v1/user/add');
  const { visible, refreshTable, setModalStatus } = useModalState('add_user');

  const save = async () => {
    formRef.current
      ?.validateFieldsReturnFormatValue?.()
      .then(async (values: FormData) => {
        const res: any = await mutation.mutateAsync(values);
        if (res) {
          message.success(fm('global.tips.addSuccess'));
          setModalStatus(false);
          formRef.current?.resetFields();
          refreshTable();
          return false;
        }
      });
  };

  return (
    <>
      <BaseForm
        title={fm('global.tips.create')}
        visible={visible}
        setClose={() => setModalStatus(false)}
        formRef={formRef}
        onFinish={save}
      />
    </>
  );
};
export default AddUser;
