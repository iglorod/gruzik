import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col } from 'antd';

const BottomNote = ({ to, note }) => {
    return (
        <Row justify="end">
            <Col span={24}>
                <Link to={to} className={'redirect-link'}>
                    {note}
                </Link>
            </Col>
        </Row>
    )
}

export default BottomNote;
