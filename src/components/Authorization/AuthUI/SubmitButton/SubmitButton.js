import React from 'react';

import { Button } from 'antd';

import classes from './SubmitButton.module.css';

const SubmitButton = ({ loading, label }) => {
  return (
    <Button
      type='primary'
      htmlType='submit'
      className={classes.submitButton}
      loading={loading}
      disabled={loading}
    >
      {label}
    </Button>
  )
}

export default SubmitButton;
