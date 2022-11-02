import React from 'react';
import useModalStatus from '../../../index.redux';
import { useLocale } from '../../../../../../../locales';
import ProForm, {
  ModalForm,
  ProFormDigit,
  ProFormInstance,
  ProFormText,
  ProFormTreeSelect,
} from '@ant-design/pro-form';
import { message, Image } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useCreate, useGet } from '../../../../../../../api/request';
import { RequestOptionsType } from '@ant-design/pro-utils';
import { last } from 'lodash';

export const editBookInfo = 'edit-book-type';
const EditBookInfo = () => {
  const { fm } = useLocale();
  const treeData = useGet('getTreeData', '/v1/bookType/treeList');
  const { visible, selectData, setModalStatus, refreshTable } =
    useModalStatus(editBookInfo);
  const formRef = React.useRef<ProFormInstance>();
  const addMu = useCreate('/v1/bookInfo/update');
  const handleCancel = () => {
    setModalStatus(false);
  };
  const onFinish = async (formData: Record<string, any>) => {
    const res = await addMu.mutateAsync(
      {
        ...formData,
        photo: selectData?.photo,
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

  const customRequest = (options: any) => {
    const { onSuccess, onError, file, onProgress } = options;
    onSuccess(file);
  };
  return (
    <>
      <ModalForm
        visible={visible}
        title={fm('book.editBookType')}
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
            name="isbn"
            label="ISBN"
            disabled={true}
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
          {/* <ProFormUploadButton
            name="photo"
            label={fm('book.photo')}
            max={2}
            fieldProps={{
              listType: 'picture-card',
              accept: '.png,.jpg',
              customRequest: customRequest,
            }}
          /> */}
          <Image
            width={200}
            src={`http://${location.hostname}:8888/static/${last(
              selectData?.photo?.split('/')
            )}`}
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
export default EditBookInfo;
