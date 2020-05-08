import React from 'react';

import { Typography } from 'antd';

import Logo from '../../../../assets/images/logoSimple.png';
import classes from './Head.module.css';

const Head = ({ title }) => {
  return (
    <div className={classes.head}>
      <img src={Logo} className={classes.logo} alt={'logo'} />
      <Typography.Title className={classes.label} level={3}>{title}</Typography.Title>
    </div>
  )
}

export default Head;
