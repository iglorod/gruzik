import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const DragListWrapper = (props) => {
  const { reorder } = props;

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    reorder(result.source.index, result.destination.index);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='list'>
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {props.children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default DragListWrapper
