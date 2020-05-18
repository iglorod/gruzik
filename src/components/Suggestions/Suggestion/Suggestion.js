import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { Spin } from 'antd';
import { PlayCircleFilled, LoadingOutlined } from '@ant-design/icons';

// import { fetchImageByTag } from '../../../utility/song-queries';
import Logo from '../../../assets/images/icon.png';
import { createSrc } from '../../../utility/user';
import classes from './Suggestion.module.css';

import testImg from '../../../assets/test.jpg';

const Suggestion = (props) => {
  const [imageName, setImageName] = useState(null);
  const [collectionChoosed, setCollectionChoosed] = useState(false);

  useEffect(() => {
    setTimeout(() => setImageName(true), 1000)
    /* fetchImageByTag(props.tag)
       .then(imageName => setImageName(imageName))*/
  }, [])

  if (!imageName) return (
    <Spin spinning={true} >
      <div className={classes.collectionPreview}>
        <p>{`#${props.tag}`}</p>
      </div>
    </Spin>
  )

  const openCollection = () => {
    setCollectionChoosed(true);
    setTimeout(() => {
      props.history.push('/collection', { tag: props.tag, })
    }, 500)
  }

  const imageSrc = testImg;/*createSrc(imageName, 'pictures-of-songs')*/

  const mask = (
    <div className={classes.posterMask}>
      <div className={classes.playIcon}>
        {collectionChoosed ? <LoadingOutlined /> : <PlayCircleFilled onClick={openCollection} />}
      </div>
      <p className={classes.maskTitle}><img src={Logo} />{props.tag}</p>
    </div>
  )

  return (
    <div className={classes.poster}>
      {mask}
      <div className={classes.imageBackground} style={{ background: `url(${imageSrc}) center, linear-gradient(#000000, #FFF) fixed` }}>
        <img
          className={classes.posterImage}
          src={imageSrc}
          alt='collection-poster' />
      </div>
    </div>
  )
}

export default withRouter(Suggestion);
