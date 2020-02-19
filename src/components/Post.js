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
      <div className='post-ctrl'>
        <button
          onClick={() => onHandleEdit(postId)}
          style={{ display: uid !== currentUser.uid ? "none" : "inline-block" }}
          className='edit-btn'
        >
          Edit
        </button>
        <button
          onClick={() => onHandleDelete(postId)}
          style={{ display: uid !== currentUser.uid ? "none" : "inline-block" }}
          className='delete-btn'
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Post;
