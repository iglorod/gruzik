import React from 'react';

import { Alert, Row, Col } from 'antd';

const AlertMessage = ({ errorMessage }) => {
  const GridAlert = (() =>
    <Row justify='center' align='middle'>
      <Col xs={24} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 8 }} >
        <Alert message={errorMessage} type='error' showIcon />
      </Col>
    </Row>
  )
  return (
    errorMessage !== null
      ? <GridAlert />
      : null
  )
}

export default AlertMessage;
