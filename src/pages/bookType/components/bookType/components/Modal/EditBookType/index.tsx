import React, { useCallback, useEffect } from 'react';
import useModalStatus from '../../../index.redux';
import { useLocale } from '../../../../../../../locales';
import ProForm, {
  ModalForm,
  ProFormInstance,
  ProFormText,
  ProFormTreeSelect,
} from '@ant-design/pro-form';
import { message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useCreate, useGet } from '../../../../../../../api/request';
import { IBookTypeTree } from '../../../../../../../api/type/login';

export const editBookType = 'edit-book-type';
const EditBookType = () => {
  const { fm } = useLocale();

  const { visible, selectData, setModalStatus, refreshTable } =
    useModalStatus(editBookType);
  const formRef = React.useRef<ProFormInstance>();
  const { data: treeData, refetch } = useGet(
    'getTreeData',
    '/v1/bookType/treeList'
  );
  const addMu = useCreate('/v1/bookType/update');
  const handleCancel = () => {
    setModalStatus(false);
  };
  const onFinish = async (formData: Record<string, any>) => {
    const res = await addMu.mutateAsync(
      {
        ...formData,
        pId: Number(formData.pId),
        level: String(
          Number(
            (findItemById(formData.pId, treeData as IBookTypeTree[]) ?? {})
              .level
          ) + 1
        ),
        id: selectData?.id,
      },
      {
        onSuccess: () => {
          message.success(fm('global.tips.updateSuccess'));
          handleCancel();
          refreshTable();
          refetch();
        },
      }
    );
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

  const request = useCallback(async () => {
    return treeData as any;
  }, [treeData]);

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
        initialValues={{
          ...selectData,
          pId: selectData?.pId === '0' ? null : selectData?.pId,
        }}
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
            request={request}
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
export default EditBookType;
