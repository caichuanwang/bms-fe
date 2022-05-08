import React from 'react';

import useModalStatus from '../../../index.redux';
import { useLocale } from '../../../../../../../locales';
import ProForm, {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTreeSelect,
} from '@ant-design/pro-form';
import { message, TreeSelect } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useCreate, useGet } from '../../../../../../../api/request';
import { BaseOptionType } from 'antd/es/select';
import { RequestOptionsType } from '@ant-design/pro-utils';
import { IBookTypeTree } from '../../../../../../../api/type/login';

export const addBookType = 'add-book-type';
const AddBookType = () => {
  const { fm } = useLocale();
  const { visible, setModalStatus, refreshTable } = useModalStatus(addBookType);
  const formRef = React.useRef();
  const treeData = useGet('getTreeData', '/v1/bookType/treeList');
  const addMu = useCreate('/v1/bookType/add');
  const handleCancel = () => {
    setModalStatus(false);
  };
  const onFinish = async (formData: Record<string, any>) => {
    const res = await addMu.mutateAsync({
      ...formData,
      level: String(
        Number(
          (findItemById(formData.pId, treeData.data as IBookTypeTree[]) ?? {})
            .level
        ) + 1
      ),
    });
    if (res) {
      message.success(fm('global.tips.addSuccess'));
      handleCancel();
      refreshTable();
      return true;
    }
  };

  const findItemById = (
    id: number,
    list: IBookTypeTree[]
  ): IBookTypeTree | undefined => {
    let res = list.find((item) => item.id == id);
    if (res) {
      return res;
    } else {
      for (let i = 0; i < list.length; i++) {
        if (
          list[i].children instanceof Array &&
          (list[i]?.children ?? []).length > 0
        ) {
          res = findItemById(id, list[i]?.children ?? []) as any;
          if (res) {
            return res;
          }
        }
      }
      return undefined;
    }
  };

  return (
    <>
      <ModalForm
        visible={visible}
        title={fm('book.addBookType')}
        modalProps={{
          onCancel: () => handleCancel(),
        }}
        onFinish={onFinish}
        formRef={formRef}
      >
        <ProForm.Group>
          <ProFormText
            width="sm"
            name="typeName"
            label={fm('book.typeName')}
            placeholder={fm('global.placeholderInp') + fm('book.typeName')}
            rules={[
              {
                required: true,
                message: fm('global.placeholderWri') + fm('book.typeName'),
              },
            ]}
          />
          <ProFormTreeSelect
            name="pId"
            style={{ width: '100%' }}
            label={fm('book.pId')}
            request={async () => {
              return treeData.data as RequestOptionsType[];
            }}
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
            rules={[
              {
                required: true,
                message: fm('global.placeholderSel') + fm('book.pId'),
              },
            ]}
          />
          <ProFormText
            width="sm"
            name="remake"
            label={fm('book.remake')}
            placeholder={fm('global.placeholderInp') + fm('book.remake')}
          />
        </ProForm.Group>
      </ModalForm>
    </>
  );
};
export default AddBookType;
