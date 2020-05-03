import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Menu, Layout } from 'antd';

import {
  filterByGenreActionCreator,
  changeSelectedGenreActionCreator,
  clearSongListActionCreator
} from '../../store/songs/actions';
import { genres } from '../../utility/music-genres';

const Filter = (props) => {
  const { Sider } = Layout;
  const { genre, getSongsByGenre, clearSongsList } = props;

  useEffect(() => {
    clearSongsList();
    setTimeout(() => getSongsByGenre(genre), 2000);
  }, [genre, getSongsByGenre, clearSongsList])

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      width={200} className="site-layout-background">
      <Menu
        mode="inline"
        selectedKeys={[genre.toString()]}
        style={{ height: '100%', borderRight: 0 }}
      >
        {genres.map((item, index) => (
          <Menu.Item
            key={index}
            onClick={props.changeGenre.bind(this, index)}
          >
            {item}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  )
}

const mapStateToProps = (state) => {
  return {
    genre: state.songs.genre,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSongsByGenre: (key) => { dispatch(filterByGenreActionCreator(key)) },
    changeGenre: (key) => { dispatch(changeSelectedGenreActionCreator(key)) },
    clearSongsList: () => { dispatch(clearSongListActionCreator()) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
