import React, { Component } from "react";
import { db } from "../config/firebaseConf";

class Posts extends Component {
  state = {
    posts: []
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
          post: doc.post
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

  writeData = async (uid, post) => {
    try {
      await db.collection("Posts").add({
        uid: uid,
        post: post
      });
    } catch (error) {
      console.log(error);
      const posts = this.state.posts;
      posts.pop();
      this.setState({ posts });
    }
  };

  render() {
    return (
      <div className='posts-container'>
        <h1>Posts</h1>
      </div>
    );
  }
}

export default Posts;
