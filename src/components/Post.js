import React from "react";

const Post = ({
  post,
  postId,
  uid,
  currentUser,
  onHandleDelete,
  onHandleEdit
}) => {
  const { head, body } = post;
  // console.log(post);
  return (
    <div className='post-container'>
      <h1>{head}</h1>
      <p>{body}</p>
      {currentUser.uid === uid ? (
        <div className='post-ctrl'>
          <button onClick={() => onHandleEdit(postId)} className='edit-btn'>
            Edit
          </button>
          <button onClick={() => onHandleDelete(postId)} className='delete-btn'>
            Delete
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Post;
