import React from 'react';

import { Divider, Tag, Empty, Spin } from 'antd';

import classes from './InfoResults.module.css';

const InfoResults = (props) => {
  if (props.loading) {
    return <Spin size='small' />;
  }
  else if (props.data.length === 0) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  return (
    <div className={classes.infoResults}>
      <Divider orientation='left'>{props.label}</Divider>
      {
        props.data.map(([item, count]) => (
          <Tag key={item} color='#ff7875'>
            {`${item}: ${count}`}
          </Tag>
        ))
      }
    </div>
  )
}

export default InfoResults;
