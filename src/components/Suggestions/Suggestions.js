import React, { useState, useEffect, useRef } from 'react';
import { throttle } from 'lodash';

import { Row, Col, Spin } from 'antd';

import Suggestion from './Suggestion/Suggestion';
import classes from './Suggestions.module.css';

const Suggestions = (props) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    if (showSuggestions === false && props.suggestions.length > 0) {
      checkOffset.current();
    }
  }, [props.suggestions.length])

  useEffect(() => {
    if (showSuggestions === false) {
      window.addEventListener('scroll', checkOffset.current);
    } else {
      checkOffset.current.cancel();
      window.removeEventListener('scroll', checkOffset.current);
    }
  }, [showSuggestions, props.suggestions])

  const checkOffset = useRef(throttle(() => {
    const userOffset = window.pageYOffset + window.innerHeight;
    const elementOffset = titleRef.current.offsetTop;
    if (userOffset - elementOffset > 0) {
      setShowSuggestions(true);
    }
  }, 500));

  if (props.suggestions.length === 0) return null;

  let suggestionsList = <div style={{ height: '70vh', width: '100vw' }}><Spin /></div>
  if (showSuggestions) {
    suggestionsList = (
      props.suggestions.map((tag, index) => (
        <Col key={index} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }} >
          <Suggestion tag={tag} />
        </Col>
      ))
    )
  }

  return (
    <>
      <a ref={titleRef} name={props.title} href={`#${props.title}`} className={classes.suggestionsTitle}>{`#${props.title}`}</a>
      <Row>
        {suggestionsList}
      </Row>
    </>
  )
}

export default React.memo(Suggestions);
