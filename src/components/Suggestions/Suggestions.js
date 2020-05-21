import React from 'react';

import { Row, Col } from 'antd';

import Suggestion from './Suggestion/Suggestion';
import classes from './Suggestions.module.css';

const Suggestions = (props) => {
  if (props.suggestions.length === 0) return null;

  return (
    <>
      <a name={props.title} href={`#${props.title}`} className={classes.suggestionsTitle}>{`#${props.title}`}</a>
      <Row>
        {
          props.suggestions.map((tag, index) => (
            <Col key={index} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }} >
              <Suggestion tag={tag} />
            </Col>
          ))
        }
      </Row>
    </>
  )
}

export default Suggestions;
