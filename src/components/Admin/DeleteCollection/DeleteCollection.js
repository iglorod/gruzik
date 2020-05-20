import React from 'react';

import { LoadingOutlined, MinusSquareFilled } from '@ant-design/icons';

const DeleteCollection = (props) => {
  return (
    <div className={'collapse-show-actions'}
      onClick={props.loading ? null : props.onClick}
    >
      {props.loading ? <LoadingOutlined /> : <MinusSquareFilled />}
    </div>
  )
}

export default DeleteCollection;
