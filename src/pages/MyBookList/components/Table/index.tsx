import ProTable, { ActionType } from '@ant-design/pro-table';
import React, { useEffect } from 'react';
import { IBookList, tableHeaderColumns } from './index.data';
import { useDelete } from '../../../../api/request';
import { SortOrder } from 'antd/es/table/interface';
import axios from '../../../../api/request';
import { Button, message } from 'antd';
import { useLocale } from '../../../../locales';

import useModalStateHooks from '../../index.redux';
import { addMyBookList } from '../AddList';

export const BookListTable = () => {
  const deleteMu = useDelete('/v1/bookList/delete');
  const actionRef = React.useRef<ActionType>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const { fm } = useLocale();
  const {
    refresh: refreshBookInfoTable,
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

    const result: any = await axios.post('/v1/bookList/list', params);
    setLoading(false);

    return {
      data: result.data,
      success: true,
      total: result.total,
    };
  };
  const handleAddClick = () => {
    handleClick(addMyBookList);
  };

  const handleClick = (btnId: string) => {
    setModalStatus(true, btnId);
  };

  const refresh = () => {
    actionRef.current?.reload();
  };

  useEffect(() => {
    refresh();
  }, [refreshBookInfoTable]);
  const deleteBookInfo = async (record: IBookList) => {
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
        request={getBookInfoList}
        actionRef={actionRef}
        columns={tableHeaderColumns(deleteBookInfo)}
        toolBarRender={() => [
          <Button type="primary" onClick={handleAddClick}>
            {fm('global.tips.add')}
          </Button>,
        ]}
      />
    </>
  );
};
export default BookListTable;
