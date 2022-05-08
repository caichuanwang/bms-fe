import { ProColumns } from '@ant-design/pro-table';
import { Button, Popconfirm } from 'antd';
import React from 'react';
import { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { fm } from '../../../../../../locales';

export interface IBookInfo {
  isbn: string;
  bookName: string;
  author?: string;
  publisher?: string;
  publishTime?: string;
  bookStock?: number;
  price?: number;
  typeName?: string;
  context?: string;
  photo?: string;
  pageNum?: string;
  translator?: string;
}

export const tableHeaderColumns = (
  edit: (record: IBookInfo) => void,
  deleteUser: (record: IBookInfo) => void
): ProColumns<IBookInfo>[] => {
  return [
    {
      title: 'ISBN',
      dataIndex: 'isbn',
      search: false,
    },
    {
      title: fm('book.bookName'),
      dataIndex: 'bookName',
    },
    {
      title: fm('book.author'),
      dataIndex: 'author',
      search: false,
    },
    {
      title: fm('book.translator'),
      dataIndex: 'translator',
      search: false,
    },
    {
      title: fm('book.publisher'),
      dataIndex: 'publisher',
      search: false,
    },
    {
      title: fm('book.publishTime'),
      dataIndex: 'publishTime',
      search: false,
    },
    {
      title: fm('book.typeName'),
      dataIndex: 'typeName',
      search: false,
    },
    {
      title: fm('book.bookStock'),
      dataIndex: 'bookStock',
      search: false,
    },
    {
      title: fm('book.price'),
      dataIndex: 'price',
      search: false,
    },
    {
      title: fm('book.context'),
      dataIndex: 'context',
      search: false,
    },
    {
      title: fm('book.pageNum'),
      dataIndex: 'pageNum',
      search: false,
    },
    {
      title: fm('global.tips.operation'),
      width: 180,
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_: ReactNode, record: IBookInfo) => (
        <>
          <Button key="link" type="primary" onClick={() => edit(record)}>
            <FormattedMessage id="global.tips.edit" />
          </Button>

          <Popconfirm
            title={<FormattedMessage id="global.tips.deleteConfirm" />}
            onConfirm={() => {
              deleteUser(record);
            }}
          >
            <Button type="text" danger key="link2">
              <FormattedMessage id="global.tips.delete" />
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];
};
