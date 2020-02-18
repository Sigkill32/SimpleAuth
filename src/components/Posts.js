import React, { Component } from "react";
import { db } from "../config/firebaseConf";
import Post from "./Post";
import PostForm from "./PostForm";

class Posts extends Component {
  state = {
    posts: [],
    head: "",
    body: "",
    isFormVisible: false,
    actionType: "none",
    currentPostId: null,
    currentIndex: null
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
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
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
    const { actionType } = this.state;
    if (actionType === "edit") this.handleEditSave();
    if (actionType === "create") this.handleCreateSave();
    else this.setState({ actionType: "none" });
  };

  handleCreateSave = () => {
    const { head, body } = this.state;
    const { user } = this.props;
    const postId = this.getId();
    const post = { head, body };
    const postObj = { uid: user.uid, post, postId };
    const posts = [...this.state.posts, postObj];
    this.writeData(user.uid, post, postId);
    this.setState({ posts, actionType: "none", isFormVisible: false });
  };

  handleEditSave = () => {
    console.log("edit");
    const {
      head,
      body,
      posts,
      currentPostId: id,
      currentIndex: index
    } = this.state;
    db.collection("Posts")
      .where("postId", "==", id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          db.collection("Posts")
            .doc(doc.id)
            .update({ post: { head: head, body: body } });
        });
      });
    let newPosts = [...posts];
    newPosts[index].post.head = head;
    newPosts[index].post.body = body;
    this.setState({ posts: newPosts, isFormVisible: false });
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

  handleClose = () => {
    this.setState({ isFormVisible: false });
  };

  handlePostEdit = id => {
    const { posts } = this.state;
    const index = posts.findIndex(post => post.postId === id);
    const post = posts[index];
    this.setState({
      head: post.post.head,
      body: post.post.body,
      isFormVisible: true,
      actionType: "edit",
      currentPostId: id,
      currentIndex: index
    });
  };

  handleAddPost = () => {
    this.setState({
      isFormVisible: true,
      actionType: "create",
      head: "",
      body: ""
    });
  };

  render() {
    const { posts, isFormVisible, head, body, isCreate, isEdit } = this.state;
    const { user } = this.props;
    return (
      <div className='posts-container'>
        <h1 style={{ textAlign: "center" }}>Posts</h1>
        <button
          onClick={this.handleAddPost}
          className='add-post'
          disabled={isFormVisible}
        >
          Add Post
        </button>
        <PostForm
          isFormVisible={isFormVisible}
          onHandleSave={this.handleSave}
          onHandleClose={this.handleClose}
          onHandleChange={this.handleEdit}
          head={head}
          body={body}
        />
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
