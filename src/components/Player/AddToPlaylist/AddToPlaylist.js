import React, { useState } from 'react';

import { Dropdown } from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';

import PlaylistsMenu from './PlaylistsMenu/PlaylistsMenu';

const AddToPlaylist = () => {
  const [showPlaylists, setShowPlaylists] = useState(false);

  const toggleShowPlaylist = () => {
    setTimeout(() => {
      setShowPlaylists(prevState => !prevState);
    }, 100)
  }

  return (
    <Dropdown
      overlay={() => <PlaylistsMenu />}
      visible={showPlaylists}
      placement="topCenter"
    >
      <AppstoreAddOutlined
        style={{ fontSize: '22px' }}
        className={'rhap_button-clear'}
        onClick={toggleShowPlaylist}
        onBlur={toggleShowPlaylist} />
    </Dropdown>
  )
}

export default AddToPlaylist;
