import React from "react";

const PostForm = ({
  isFormVisible,
  onHandleClose,
  onHandleSave,
  onHandleChange,
  head,
  body
}) => {
  return (
    <div
      className='post-form'
      style={{ display: isFormVisible ? "block" : "none" }}
    >
      <input
        type='text'
        name='head'
        placeholder='Post heading'
        onChange={onHandleChange}
        value={head}
      />
      <textarea
        name='body'
        cols='30'
        rows='20'
        placeholder='post body'
        onChange={onHandleChange}
        value={body}
      />
      <div className='post-form-ctrl'>
        <button onClick={onHandleSave}>save</button>
        <button onClick={onHandleClose}>close</button>
      </div>
    </div>
  );
};

export default PostForm;
