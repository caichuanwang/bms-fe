import { ProColumns } from '@ant-design/pro-table';
import { Button, Popconfirm } from 'antd';
import React from 'react';
import { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { useLocale } from '../../../../locales';
import { IBookInfo } from '../../../bookInfo/components/bookInfo/components/Table/index.data';

export interface IBookList {
  id: number;
  name: string;
  remake?: string;
  time?: string;
  bookInfo: IBookInfo;
}

export const tableHeaderColumns = (
  // edit: (record: IBookList) => void,
  deleteUser: (record: IBookList) => void
): ProColumns<IBookList>[] => {
  const { fm } = useLocale();

  return [
    {
      title: fm('book.list.name'),
      dataIndex: 'name',
    },
    {
      title: fm('book.remake'),
      dataIndex: 'remake',
      search: false,
    },

    {
      title: fm('global.tips.operation'),
      width: 180,
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_: ReactNode, record: IBookList) => (
        <>
          {/* <Button key="link" type="primary" onClick={() => edit(record)}>
            <FormattedMessage id="global.tips.edit" />
          </Button> */}
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
