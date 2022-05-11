import { Tag } from 'antd';
import React from 'react';
import { IProps } from './index.d';

const Status: React.FC<IProps> = (props) => {
  return (
    <>
      {props.value ? (
        <Tag color="blue">{props.allStatus[props.value]}</Tag>
      ) : (
        Object.keys(props.allStatus).forEach((e) => {
          return <Tag color="blue">{props.allStatus[e]}</Tag>;
        })
      )}
    </>
  );
};
export default Status;
