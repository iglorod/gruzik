import React from 'react';

const ReorderCollection = (props) => {
  const classes = ['collapse-show-actions'];
  if (!props.enabled) {
    classes.push('collapse-disabled-actions');
  }

  return (
    <div
      className={classes.join(' ')}
      onClick={props.enabled ? props.onClick : null}
    >
      {props.icon}
    </div>
  )
}

export default ReorderCollection;
