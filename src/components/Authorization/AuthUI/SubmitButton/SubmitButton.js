import React from 'react';

import { Button } from 'antd';

import classes from './SubmitButton.module.css';

const SubmitButton = ({ authStart, label }) => {
  return (
    <Button
      type='primary'
      htmlType='submit'
      className={classes.submitButton}
      loading={authStart}
      disabled={authStart}
    >
      {label}
    </Button>
  )
}

export default SubmitButton;
