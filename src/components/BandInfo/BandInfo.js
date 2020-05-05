import React from 'react';
import { connect } from 'react-redux';

import { Card, Spin } from 'antd';

import BandName from './BandName/BandName';
import BandDescription from './BandDescription/BandDescription';
import BandGenres from './BandGenres/BandGenres';
import BandImage from './BandImage/BandImage';
import BandStatistic from './BandStatistic/BandStatistic';
import classes from './BandInfo.module.css';

const BandInfo = (props) => {
  return (
    <Spin spinning={props.updating}>
      <Card
        className={classes.card}
        loading={props.loading}
        cover={<BandImage image={props.image} bandId={props.bandId} />}
        bodyStyle={{ minWidth: '50%' }}
      >

        <BandName bandName={props.bandName} bandId={props.bandId} />
        <BandGenres genres={props.genres} />
        <BandDescription description={props.description} bandId={props.bandId} />
        <BandStatistic />
      </Card>
    </Spin>
  )
}

const mapStateToProps = (state) => {
  return {
    bandName: state.band.bandName,
    bandId: state.band.localId,
    description: state.band.description,
    genres: state.band.genres,
    image: state.band.image,
    loading: state.band.loading,
    updating: state.band.updating,
  }
}

export default connect(mapStateToProps)(BandInfo);
