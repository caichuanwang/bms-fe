import { ProColumns } from '@ant-design/pro-table';
import { Button, Popconfirm } from 'antd';
import React from 'react';
import { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { useLocale } from '../../../../../../locales';

export interface IBookType {
  id: number;
  typeName: string;
  pId: string;
  level?: string;
  remake?: string;
}

export const tableHeaderColumns = (
  edit: (record: IBookType) => void,
  deleteUser: (record: IBookType) => void
): ProColumns<IBookType>[] => {
  const { fm } = useLocale();

  return [
    {
      dataIndex: 'typeName',
      title: fm('book.typeName'),
    },
    {
      dataIndex: 'level',
      title: fm('book.level'),
      render: (dom, record) => {
        if (dom === '0') {
          return '顶级';
        }
        return dom;
      },
    },
    {
      dataIndex: 'pName',
      title: fm('book.pId'),
    },
    {
      dataIndex: 'remake',
      title: fm('book.remake'),
      search: false,
    },
    {
      title: fm('global.tips.operation'),
      width: 180,
      key: 'option',
      valueType: 'option',
      render: (_: ReactNode, record: IBookType) => (
        <>
          <Button
            key="link"
            type="primary"
            onClick={() => edit(record)}
            disabled={record.id === 1}
          >
            <FormattedMessage id="global.tips.edit" />
          </Button>

          <Popconfirm
            title={<FormattedMessage id="global.tips.deleteConfirm" />}
            onConfirm={() => {
              deleteUser(record);
            }}
            disabled={record.id === 1}
          >
            <Button type="text" danger key="link2" disabled={record.id === 1}>
              <FormattedMessage id="global.tips.delete" />
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];
};
