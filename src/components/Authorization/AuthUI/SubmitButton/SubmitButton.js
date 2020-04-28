import React from 'react';

import { Button } from 'antd';

const SubmitButton = ({ authStart, label }) => {
    return (
        <Button
            type="primary"
            className={'submit-btn'}
            loading={authStart}
            disabled={authStart}
        >
            {label}
        </Button>
    )
}

export default SubmitButton;
