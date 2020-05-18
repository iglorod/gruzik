import React from 'react';

import { Spin } from 'antd';

import { Comment, List } from 'antd';

const CommentsList = ({ comments, loading }) => {
  if (loading) return <Spin size='small' />

  const Comments = ({ comments }) => (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'comments' : 'comment'}`}
      itemLayout='horizontal'
      renderItem={props => <Comment {...props} />}
    />
  );

  return comments.length > 0 && <Comments comments={comments} />
}

export default React.memo(CommentsList);
