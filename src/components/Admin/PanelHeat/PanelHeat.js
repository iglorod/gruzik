import React from 'react';

import { Input } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const PanelHeat = (props) => {
  return (
    <Input
      placeholder='Type collection name'
      value={props.value}
      onChange={props.onChange}
      prefix={<InfoCircleOutlined />} />
  )
}

export default PanelHeat;
