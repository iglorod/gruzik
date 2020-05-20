import React from 'react';

import { LoadingOutlined, SaveFilled } from '@ant-design/icons';

const SaveCollection = (props) => {
  return (
    <div className={
      props.enabled
        ? 'collapse-show-actions'
        : 'collapse-should-not-update'
    }
      onClick={props.loading ? null : props.onClick}
    >
      {props.loading ? <LoadingOutlined /> : <SaveFilled />}
    </div>
  )
}

export default SaveCollection;
