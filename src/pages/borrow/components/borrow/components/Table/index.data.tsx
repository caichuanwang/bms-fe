import { ProColumns } from '@ant-design/pro-table';
import { Button, Popconfirm, Space } from 'antd';
import React from 'react';
import { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { useLocale } from '../../../../../../locales';
import { IBorrow } from '../../../../../../api/type/login';
import { IBorrowStatus, IReturnStatus } from '../../../../../../enum/borrow';
import Status from '../../../../../../components/Status';

const borrowAllStatus = {
  [IBorrowStatus.BORROW]: <FormattedMessage id="borrow.borrowed" />,
  [IBorrowStatus.NO_BORROW]: <FormattedMessage id="borrow.willBorrow" />,
};

const returnAllStatus = {
  [IReturnStatus.RETURN]: <FormattedMessage id="borrow.returned" />,
  [IReturnStatus.NO_RETURN]: <FormattedMessage id="borrow.willReturn" />,
};

export const tableHeaderColumns = (
  returnBook: (record: IBorrow) => void,
  borrowBook: (record: IBorrow) => void
): ProColumns<IBorrow>[] => {
  const { fm } = useLocale();

  return [
    {
      title: fm('borrow.id'),
      dataIndex: 'id',
      search: false,
    },
    {
      title: fm('borrow.borrow_reader_name'),
      dataIndex: 'borrow_reader_name',
    },
    {
      title: fm('borrow.borrow_book_name'),
      dataIndex: 'borrow_book_name',
    },
    {
      title: fm('borrow.is_borrow'),
      dataIndex: 'is_borrow',
      search: false,
      render: (_, record) => {
        return <Status allStatus={borrowAllStatus} value={record.is_borrow} />;
      },
    },
    {
      title: fm('borrow.borrow_time'),
      dataIndex: 'borrow_time',
      search: false,
    },
    {
      title: fm('borrow.agree_borrow_time'),
      dataIndex: 'agree_borrow_time',
      search: false,
    },
    {
      title: fm('borrow.should_return_time'),
      dataIndex: 'should_return_time',
      search: false,
    },
    {
      title: fm('borrow.really_return_time'),
      dataIndex: 'really_return_time',
      search: false,
    },
    {
      title: fm('borrow.is_return'),
      dataIndex: 'is_return',
      search: false,
      render: (_, record) => {
        return <Status allStatus={returnAllStatus} value={record.is_return} />;
      },
    },
    {
      title: fm('global.tips.operation'),
      width: 180,
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_: ReactNode, record: IBorrow) => (
        <Space>
          <Button
            key="link"
            type="primary"
            onClick={() => borrowBook(record)}
            disabled={record.is_borrow == IBorrowStatus.BORROW}
          >
            <FormattedMessage id="borrow.borrow" />
          </Button>
          <Button
            key="link"
            type="primary"
            onClick={() => returnBook(record)}
            disabled={
              record.is_return == IReturnStatus.RETURN ||
              record.is_borrow == IBorrowStatus.NO_BORROW
            }
          >
            <FormattedMessage id="borrow.return" />
          </Button>
        </Space>
      ),
    },
  ];
};
