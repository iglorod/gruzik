import React from 'react';

import { Alert } from 'antd';

const AlertMessage = ({ errorMessage }) => {
    return (
        errorMessage !== null
            ? <Alert message={errorMessage} type="error" />
            : null
    )
}

export default AlertMessage;
