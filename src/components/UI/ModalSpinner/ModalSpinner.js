import React from 'react';

import { Spin } from 'antd';

import classes from './ModalSpinner.module.css';

const ModalSpinner = () => {
  return (
    <div className={classes.modal}>
      <Spin size='large' className={classes.spinner} />
    </div>
  )
}

export default ModalSpinner;
