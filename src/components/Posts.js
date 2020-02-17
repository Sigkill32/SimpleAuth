import React, { Component } from "react";
import { db } from "../config/firebaseConf";
import { openModal, closeModal } from "react-stateless-modal";
import Post from "./Post";

class Posts extends Component {
  state = {
    posts: [],
    head: "",
    body: ""
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    let posts = [];

    try {
      const collection = await db.collection("Posts").get();
      const docs = collection.docs.map(doc => doc.data());
      docs.map(doc =>
        posts.push({
          uid: doc.uid,
          post: doc.post,
          postId: doc.postId
        })
      );
      this.setState({ posts });
      console.log(posts);
    } catch (error) {
      console.log(error);
    }
  };

  getId = () => {
    return Math.floor(Math.random() * 10000 + 1);
  };

  writeData = async (uid, post, postId) => {
    try {
      await db.collection("Posts").add({
        uid: uid,
        post: post,
        postId: postId
      });
    } catch (error) {
      console.log(error);
      const posts = this.state.posts;
      posts.pop();
      this.setState({ posts });
    }
  };

  handleEdit = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSave = () => {
    const { head, body } = this.state;
    const { user } = this.props;
    const postId = this.getId();
    const post = { head, body };
    const postObj = { uid: user.uid, post, postId };
    const posts = [...this.state.posts, postObj];
    this.setState({ posts });
    this.writeData(user.uid, post, postId);
    closeModal();
  };

  handleDelete = id => {
    db.collection("Posts")
      .where("postId", "==", id)
      .get()
      .then(querySnapshot => {
        const batch = db.batch();
        querySnapshot.forEach(doc => {
          batch.delete(doc.ref);
        });
        return batch.commit();
      })
      .then(() => console.log("deleted"));
    const posts = this.state.posts.filter(post => post.postId !== id);
    this.setState({ posts });
  };

  handleModalOpener = () => {
    // const { head, body } = this.state;
    openModal({
      head: () => (
        <div style={{ width: "80%", padding: "10px" }}>
          <input
            style={{ width: "100%", border: "none" }}
            type='text'
            onChange={this.handleEdit}
            placeholder='Post heading'
            // value={head}
            name='head'
          />
        </div>
      ),
      body: () => (
        <textarea
          style={{ width: "100%", border: "none", padding: "10px" }}
          type='text'
          onChange={this.handleEdit}
          placeholder='post body'
          rows='20'
          //   value={body}
          name='body'
        />
      ),
      footer: () => (
        <div>
          <button onClick={this.handleSave}>Save</button>
        </div>
      )
    });
  };

  render() {
    const { posts } = this.state;
    const { user } = this.props;
    return (
      <div className='posts-container'>
        <h1>Posts</h1>
        <button onClick={this.handleModalOpener}>add post</button>
        {posts.map(post => (
          <Post
            post={post.post}
            key={post.postId}
            postId={post.postId}
            currentUser={user}
            uid={post.uid}
            onHandleDelete={this.handleDelete}
            onHandleEdit={this.handlePostEdit}
          />
        ))}
      </div>
    );
  }
}

export default Posts;
