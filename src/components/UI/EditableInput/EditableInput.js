import React, { useState } from 'react';

import { Typography, Popconfirm, message } from 'antd';

import './EditableInput.css';

const EditableInput = (props) => {
  const { Paragraph } = Typography;

  const [showConfirm, setShowConfirm] = useState(false);
  const [newValue, setNewValue] = useState(null);

  const confirmChange = () => {
    props.udateBandData({ [props.editKey]: newValue });

    setShowConfirm(false);
    setNewValue(null);
  }

  const cancelChange = () => {
    setShowConfirm(false);
    setNewValue(null);
  }

  const onChangeHandler = (value) => {
    if (value !== props.value && value.length >= props.minLength && value.length <= props.maxLength) {
      setNewValue(value);
      setShowConfirm(true);
    } else if (value.length < props.minLength) {
      message.warning(`Minimum string length - ${props.minLength} characters`);
    } else if (value.length > props.maxLength) {
      message.warning(`Maximum string length - ${props.maxLength} characters`);
    }
  }

  let input = <Paragraph className={'editable-paragraph'} style={props.style}>{props.value}</Paragraph>
  if (props.editable) {
    input = (
      <Popconfirm
        title={`${props.confirmMessage} '${newValue}'?`}
        visible={showConfirm}
        onConfirm={confirmChange}
        onCancel={cancelChange}
        okText='Yes'
        cancelText='No'
      >
        <Paragraph className={'editable-paragraph'} style={props.style} editable={{ onChange: onChangeHandler }} >{props.value}</Paragraph>
      </Popconfirm>
    )
  }

  return input;
}

export default EditableInput;
