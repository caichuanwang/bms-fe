import React, { useEffect, useState } from 'react';
import BookListHeader from './components/BookListHeader';
import axios from '../../api/request';
import { Divider, Pagination, Space, Spin } from 'antd';
import { IBookInfo } from '../bookInfo/components/bookInfo/components/Table/index.data';
import BookItem from './components/BookItem';
import { fm } from '../../locales';
import { useGet } from '../../api/request';
import useModalStateHooks from './index.redux';
import AllModalManager from './components/Modal';
const BookList = () => {
  const { data: topListData, refetch } = useGet<{ data: IBookInfo[] }>(
    'borrowTop',
    '/v1/borrow/top'
  );
  const { refresh } = useModalStateHooks();
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<false>(false);
  const [current, setCurrent] = useState<number>(1);

  const [data, setData] = useState<IBookInfo[]>([]);
  const handleSearch = async (value?: string) => {
    setLoading(false);
    const res: any = await axios.post('/v1/bookInfo/list', {
      bookName: value,
      current,
      pageSize: 5,
    });
    setTotal(res.total);
    setData(res.data);
    setLoading(false);
  };

  const handlePaginationChange = (page: number, pageSize: number) => {
    setCurrent(page);
  };

  useEffect(() => {
    handleSearch();
  }, [current]);

  useEffect(() => {
    refetch();
  }, [refresh]);

  return (
    <>
      <Spin spinning={loading} />
      <BookListHeader handleSearch={handleSearch} />
      <Divider orientation="left">{fm('borrow.verb')}</Divider>
      <Space>
        {data.map((e) => {
          return (
            <>
              <BookItem item={e} />
            </>
          );
        })}
      </Space>
      <div style={{ textAlign: 'end' }}>
        <Pagination
          total={total}
          current={current}
          onChange={handlePaginationChange}
          pageSizeOptions={['5']}
          showQuickJumper
          showTotal={(total) => `共 ${total} 本`}
        />
      </div>
      <Divider orientation="left">{fm('borrow.top')}</Divider>
      <Space>
        {topListData &&
          topListData.data.map((e) => {
            return (
              <>
                <BookItem item={e} />
              </>
            );
          })}
      </Space>
      <AllModalManager />
    </>
  );
};
export default BookList;
