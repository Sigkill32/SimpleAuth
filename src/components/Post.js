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
  console.log(post);
  return (
    <div>
      <h1>{head}</h1>
      <p>{body}</p>
      <div className='post-ctrl'>
        <button
          onClick={() => onHandleEdit(postId)}
          disabled={uid === currentUser}
        >
          Edit
        </button>
        <button
          onClick={() => onHandleDelete(postId)}
          disabled={uid === currentUser}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Post;
