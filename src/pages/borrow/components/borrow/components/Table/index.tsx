import ProTable, { ActionType } from '@ant-design/pro-table';
import React, { useEffect } from 'react';
import { tableHeaderColumns } from './index.data';
import { useDelete, useGetWithParams } from '../../../../../../api/request';
import { SortOrder } from 'antd/es/table/interface';
import axios from '../../../../../../api/request';
import { Button, message } from 'antd';
import { useLocale } from '../../../../../../locales';
import { addBorrow } from '../Modal/AddBorrow';
import { editBorrow as editBorrowStr } from '../Modal/EditBorrow';
import useModalStateHooks from '../../index.redux';
import { IBorrow } from '../../../../../../api/type/login';

export const BorrowTable = () => {
  const returnMu = useGetWithParams('/v1/borrow/return/status');
  const borrowMu = useGetWithParams('/v1/borrow/borrow/status');
  const actionRef = React.useRef<ActionType>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const { fm } = useLocale();
  const {
    refresh: refreshBorrowTable,
    setModalStatus,
    setSelectData,
  } = useModalStateHooks();
  const getBookInfoList = async (
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

    const result: any = await axios.post('/v1/borrow/list', params);
    setLoading(false);

    return {
      data: result.data,
      success: true,
      total: result.total,
    };
  };
  const handleAddClick = () => {
    handleClick(addBorrow);
  };

  const handleClick = (btnId: string) => {
    setModalStatus(true, btnId);
  };

  const refresh = () => {
    actionRef.current?.reload();
  };

  useEffect(() => {
    refresh();
  }, [refreshBorrowTable]);

  const returnBook = async (record: IBorrow) => {
    await returnMu.mutateAsync(
      { id: record.id },
      {
        onSuccess: () => {
          message.success(fm('global.tips.borrowSuccess'));
          refresh();
        },
      }
    );
  };
  const borrowBook = async (record: IBorrow) => {
    await borrowMu.mutateAsync(
      { id: record.id },
      {
        onSuccess: () => {
          message.success(fm('global.tips.returnSuccess'));
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
        request={getBookInfoList}
        actionRef={actionRef}
        columns={tableHeaderColumns(returnBook, borrowBook)}
        toolBarRender={() => [
          <Button type="primary" onClick={handleAddClick}>
            {fm('global.tips.add')}
          </Button>,
        ]}
      />
    </>
  );
};
export default BorrowTable;
