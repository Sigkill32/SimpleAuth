import React from "react";

const Post = ({ post }) => {
  const { head, body, postId } = post;
  return (
    <div>
      <h1>{head}</h1>
      <p>{body}</p>
      <div className='post-ctrl'>
        <button onClick={() => onHandleEdit(postId)}>Edit</button>
        <button onClick={() => onHandleDelete(postId)}>Delete</button>
      </div>
    </div>
  );
};

export default Post;
