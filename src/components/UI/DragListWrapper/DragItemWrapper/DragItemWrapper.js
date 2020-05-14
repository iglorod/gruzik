import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const DragItemWrapper = (props) => {
  const { index } = props;

  return (
    <Draggable draggableId={'' + index} index={index}>
      {provided => (

        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          >
          {props.children}
        </div>
      )}
    </Draggable>
  )
}

export default DragItemWrapper;
