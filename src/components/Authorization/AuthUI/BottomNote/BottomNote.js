import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col } from 'antd';

import classes from './BottomNote.module.css';

const BottomNote = ({ to, note }) => {
  return (
    <Row justify='end'>
      <Col span={24}>
        <Link to={to} className={classes.redirectLink}>
          {note}
        </Link>
      </Col>
    </Row>
  )
}

export default BottomNote;
