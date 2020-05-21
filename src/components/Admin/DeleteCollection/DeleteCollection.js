import React from 'react';

import { Popconfirm } from 'antd';
import { LoadingOutlined, MinusSquareFilled } from '@ant-design/icons';

const DeleteCollection = (props) => {
  return (
    <Popconfirm
      title='Are you sure delete this collection?'
      onConfirm={props.loading ? null : props.onClick}
      okText='Yes'
      cancelText='No'
    >
      <div className={'collapse-show-actions'}>
        {props.loading ? <LoadingOutlined /> : <MinusSquareFilled />}
      </div>
    </Popconfirm>
  )
}

export default DeleteCollection;
