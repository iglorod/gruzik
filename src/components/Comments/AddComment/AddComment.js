import React from 'react';

import { Comment, Avatar, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';

import classes from './AddComment.module.css';

const AddComment = (props) => {
  const { Search } = Input;

  if (!props.localId) return null;

  return (
    <Comment
      avatar={
        <Avatar
          alt='avka'
          src={props.userData.imageSrc}
        />
      }
      content={
        <div>
          <Search
            className={classes.searchInput}
            value={props.newComment}
            loading={props.submitting}
            placeholder='Type your message...'
            enterButton={<SendOutlined />}
            disabled={props.disabled}
            onChange={props.handleChange}
            onSearch={props.handleSubmit} />
        </div >
      }
    />
  )
}

export default AddComment;
