import React, { useState } from 'react';

import useModalStatus from '../../../index.redux';
import { useLocale } from '../../../../../../../locales';
import ProForm, {
  ModalForm,
  ProFormDigit,
  ProFormText,
  ProFormTreeSelect,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import { message, TreeSelect } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import axios, { useCreate, useGet } from '../../../../../../../api/request';
import { RequestOptionsType } from '@ant-design/pro-utils';
import { UploadFile } from 'antd/es/upload/interface';
export const addBookInfo = 'add-book-info';
const AddBookInfo = () => {
  const treeData = useGet('getTreeData', '/v1/bookType/treeList');
  const { fm } = useLocale();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { visible, setModalStatus, refreshTable } = useModalStatus(addBookInfo);
  const formRef = React.useRef();
  const addMu = useCreate('/v1/bookInfo/add');
  const handleCancel = () => {
    setModalStatus(false);
  };
  const onFinish = async (formData: Record<string, any>) => {
    const res = await addMu.mutateAsync({
      ...formData,
    });
    if (res) {
      message.success(fm('global.tips.addSuccess'));
      handleCancel();
      refreshTable();
      return true;
    }
  };
  const customRequest = (options: any) => {
    const { onSuccess, onError, file, onProgress } = options;

    onSuccess(file);
  };

  return (
    <>
      <ModalForm
        visible={visible}
        title={fm('book.addBookInfo')}
        modalProps={{
          onCancel: () => handleCancel(),
        }}
        onFinish={onFinish}
        formRef={formRef}
      >
        <ProForm.Group>
          <ProFormText
            width="sm"
            name="isbn"
            label="ISBN"
            placeholder={fm('global.placeholderInp') + 'ISBN'}
            rules={[
              {
                required: true,
                message: fm('global.placeholderWri') + 'ISBN',
              },
            ]}
          />
          <ProFormText
            width="sm"
            name="bookName"
            label={fm('book.bookName')}
            placeholder={fm('global.placeholderInp') + fm('book.bookName')}
            rules={[
              {
                required: true,
                message: fm('global.placeholderWri') + fm('book.bookName'),
              },
            ]}
          />
          <ProFormTreeSelect
            name="typeId"
            style={{ width: '100%' }}
            label={fm('book.pId')}
            width="sm"
            placeholder={fm('global.placeholderInp') + fm('book.pId')}
            allowClear
            fieldProps={{
              showSearch: true,
              treeNodeFilterProp: 'name',
              fieldNames: {
                label: 'name',
                value: 'id',
                children: 'children',
              },
              treeLine: true,
              treeIcon: PlusCircleOutlined,
            }}
            request={async () => {
              return treeData.data as RequestOptionsType[];
            }}
          />
          <ProFormText
            width="sm"
            name="author"
            label={fm('book.author')}
            placeholder={fm('global.placeholderInp') + fm('book.author')}
          />
          <ProFormText
            width="sm"
            name="translator"
            label={fm('book.translator')}
            placeholder={fm('global.placeholderInp') + fm('book.translator')}
          />
          <ProFormText
            width="sm"
            name="publisher"
            label={fm('book.publisher')}
            placeholder={fm('global.placeholderInp') + fm('book.publisher')}
          />
          <ProFormText
            width="sm"
            name="publishTime"
            label={fm('book.publishTime')}
            placeholder={fm('global.placeholderInp') + fm('book.publishTime')}
          />
          <ProFormDigit
            width="sm"
            name="bookStock"
            label={fm('book.bookStock')}
            placeholder={fm('global.placeholderInp') + fm('book.bookStock')}
          />
          <ProFormDigit
            width="sm"
            name="price"
            label={fm('book.price')}
            placeholder={fm('global.placeholderInp') + fm('book.price')}
          />
          <ProFormText
            width="sm"
            name="context"
            label={fm('book.context')}
            placeholder={fm('global.placeholderInp') + fm('book.context')}
          />
          <ProFormUploadButton
            name="photo"
            label={fm('book.photo')}
            max={2}
            fieldProps={{
              listType: 'picture-card',
              accept: '.png,.jpg',
              customRequest: customRequest,
              // fileList: fileList,
              // onChange: handleChange,
              // action: '/api/v1/bookInfo/add',

              // headers: {
              //   Authorization:
              //     'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJhZG1pbiI6dHJ1ZSwiZXhwIjoxNjUxODQ4NDc4LCJqdGkiOiJqd3RfaWQifQ.ZNOC13jABbf4ShcmUxrZd74TDRYcwk-DdGJeBoK2IyhBq7UxraTbqqls_Iw-_6fnxKtJxuOn80ZIVE3NMJKEpA',
              // },
            }}
          />
          <ProFormText
            width="sm"
            name="pageNum"
            label={fm('book.pageNum')}
            placeholder={fm('global.placeholderInp') + fm('book.pageNum')}
          />
        </ProForm.Group>
      </ModalForm>
    </>
  );
};
export default AddBookInfo;
