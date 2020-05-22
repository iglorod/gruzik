import React from 'react';
import { Link } from 'react-router-dom';

import { Card } from 'antd';
import { ExportOutlined } from '@ant-design/icons';

import './PlaylistPoster.css';

const PlaylistPoster = ({ playlist }) => {
  return (
    <Link to={{
      pathname: '/playlist',
      state: {
        key: playlist.key || 'liked',
      }
    }}>
      <Card.Grid className={'playlist'}>
        <ExportOutlined className={'playlist-icon'} />
        <div className={'playlist-heat'}></div>
        <div className={'playlist-info'}>
          <div>
            {playlist.name}
          </div>
          <div>
            {playlist.description}
          </div>
        </div>
      </Card.Grid>
    </Link>
  )
}

export default PlaylistPoster;
