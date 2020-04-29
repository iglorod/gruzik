import React from 'react';
import { connect } from 'react-redux';

import { Card, Row, Col, Spin } from 'antd';

import BandName from './BandName/BandName';
import BandDescription from './BandDescription/BandDescription';
import BandGenres from './BandGenres/BandGenres';
import classes from './BandInfo.module.css';

const BandInfo = (props) => {
    return (
        <Row>
            <Col xs={{ span: 24 }} md={{ offset: 3, span: 18 }} lg={{ offset: 6, span: 12 }} >
                <Spin spinning={props.updating}>
                    <Card
                        className={classes.card}
                        loading={props.loading}
                        cover={
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/gruzik-787b2.appspot.com/o/band-images%2Fband.jpg?alt=media"
                                alt="band poster"
                            />
                        }
                        bodyStyle={{ minWidth: '50%' }}
                    >

                        <BandName bandName={props.bandName} bandEmail={props.email} />
                        <BandGenres genres={props.genres} />
                        <BandDescription description={props.description} bandEmail={props.email} />
                    </Card>
                </Spin>
            </Col>
        </Row >
    )
}

const mapStateToProps = (state) => {
    return {
        bandName: state.band.bandName,
        email: state.band.email,
        description: state.band.description,
        genres: state.band.genres,
        image: state.band.description,
        loading: state.band.loading,
        updating: state.band.updating,
    }
}

export default connect(mapStateToProps)(BandInfo);
