import ProTable, { ActionType } from '@ant-design/pro-table';
import React, { useEffect } from 'react';
import { IBookType, tableHeaderColumns } from './index.data';
import { useGetList, useDelete } from '../../../../../../api/request';
import { SortOrder } from 'antd/es/table/interface';
import axios from '../../../../../../api/request';
import { Button, message } from 'antd';
import { useLocale } from '../../../../../../locales';
import { addBookType } from '../Modal/AddBookType';
import { editBookType as editBookTypeStr } from '../Modal/EditBookType';
import useModalStateHooks from '../../index.redux';

export const BookTypeTable = () => {
  const deleteMu = useDelete('/v1/bookType/delete');
  const actionRef = React.useRef<ActionType>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const { fm } = useLocale();
  const {
    refresh: refreshBookTypeTable,
    setModalStatus,
    setSelectData,
  } = useModalStateHooks();
  const getBookTypeList = async (
    params: any,
    sort: Record<string, SortOrder>
  ) => {
    setLoading(true);
    const keys = Object.keys(sort);
    if (keys.length) {
      params = {
        ...params,
        order_by: keys[0],
        order_type: sort[keys[0]] === 'ascend' ? 'ASC' : 'DESC',
      };
    }

    const result: any = await axios.post('/v1/bookType/list', params);
    setLoading(false);

    return {
      data: result.data,
      success: true,
      total: result.total,
    };
  };
  const handleAddClick = () => {
    handleClick(addBookType);
  };

  const handleClick = (btnId: string) => {
    setModalStatus(true, btnId);
  };

  const refresh = () => {
    actionRef.current?.reload();
  };

  useEffect(() => {
    refresh();
  }, [refreshBookTypeTable]);

  const editBookType = (record: IBookType) => {
    setSelectData(record);
    setModalStatus(true, editBookTypeStr);
  };
  const deleteBookType = async (record: IBookType) => {
    await deleteMu.mutateAsync(
      { id: record.id },
      {
        onSuccess: () => {
          message.success(fm('global.tips.deleteSuccess'));
          refresh();
        },
      }
    );
  };

  return (
    <>
      <ProTable
        rowKey="id"
        key="id"
        pagination={{
          showSizeChanger: true,
        }}
        loading={loading}
        request={getBookTypeList}
        actionRef={actionRef}
        columns={tableHeaderColumns(editBookType, deleteBookType)}
        toolBarRender={() => [
          <Button type="primary" onClick={handleAddClick}>
            {fm('global.tips.add')}
          </Button>,
        ]}
      />
    </>
  );
};
export default BookTypeTable;
