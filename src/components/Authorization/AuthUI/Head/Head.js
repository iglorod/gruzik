import React from 'react';

import { Typography } from 'antd';

import Logo from '../../../../assets/images/logoSimple.png';

const Head = ({ title }) => {
    return (
        <>
            <img src={Logo} alt={'logo'} />
            <Typography.Title className={'header-label'} level={3}>{title}</Typography.Title>
        </>
    )
}

export default Head;
