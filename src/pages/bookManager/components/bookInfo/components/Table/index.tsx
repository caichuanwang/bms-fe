import ProTable, { ActionType } from '@ant-design/pro-table';
import React, { useEffect } from 'react';
import { IBookInfo, tableHeaderColumns } from './index.data';
import { useDelete } from '../../../../../../api/request';
import { SortOrder } from 'antd/es/table/interface';
import axios from '../../../../../../api/request';
import { Button, message } from 'antd';
import { useLocale } from '../../../../../../locales';
import { addBookInfo } from '../Modal/AddBookInfo';
import { editBookInfo as editBookInfoStr } from '../Modal/EditBookInfo';
import useModalStateHooks from '../../index.redux';

export const BookInfoTable = () => {
  const deleteMu = useDelete('/v1/bookInfo/delete');
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

    const result: any = await axios.post('/v1/bookInfo/list', params);
    setLoading(false);

    return {
      data: result.data,
      success: true,
      total: result.total,
    };
  };
  const handleAddClick = () => {
    handleClick(addBookInfo);
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

  const editBookInfo = (record: IBookInfo) => {
    setSelectData(record);
    setModalStatus(true, editBookInfoStr);
  };
  const deleteBookInfo = async (record: IBookInfo) => {
    await deleteMu.mutateAsync(
      { isbn: record.isbn },
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
        columns={tableHeaderColumns(editBookInfo, deleteBookInfo)}
        toolBarRender={() => [
          <Button type="primary" onClick={handleAddClick}>
            {fm('global.tips.add')}
          </Button>,
        ]}
      />
    </>
  );
};
export default BookInfoTable;
