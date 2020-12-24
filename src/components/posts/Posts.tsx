import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { RouteComponentProps } from "react-router";
import { db } from "../../../config/firebase_config";

type PostsState = {
  user: {
    email: string | any;
  };
  posts: Array<{}>;
  text: string;
};

class Posts extends Component<RouteComponentProps<{}>, PostsState> {
  state = {
    user: {
      email: "",
    },
    posts: [],
    text: "",
  };
  componentDidMount(): void {
    firebase.auth().onAuthStateChanged((user): void => {
      if (user) {
        this.setState({ user: { email: user.email } });

        db.collection("posts")
          .where("email", "==", user.email)
          .get()
          .then((querySnapshot: any) => {
            querySnapshot.forEach((doc: any) => {
              this.setState({ posts: [...this.state.posts, doc.data()] });
            });
          });
      } else {
        this.props.history.push("/sign_in");
      }
    });
  }

  signOut = (): void => {
    firebase.auth().signOut();
  };

  addPost = (event: React.FormEvent): void => {
    db.collection("posts")
      .doc(`${this.state.posts.length + 1}`)
      .set({
        id: this.state.posts.length + 1,
        email: this.state.user.email,
        text: this.state.text
      })
      .then(():void => {
        this.setState({ posts: []})
        db.collection("posts")
          .where("email", "==", this.state.user.email)
          .get()
          .then((querySnapshot: any): void => {
            querySnapshot.forEach((doc: any):void => {
              this.setState({ posts: [...this.state.posts, doc.data()] });
            });
          });
      })

      event.preventDefault()
  };

  textChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const {
      target: { value: text },
    } = event;

    this.setState({ text });
  };
  render() {
    const { user: { email }, text, posts } = this.state;
    return (
      <div className="posts">
        <div className="posts-header">
          <span>{email}</span>
          <button
            onClick={() => {
              this.signOut();
            }}
          >
            Sign Out
          </button>
        </div>
        <div className="posts-content">
          <form onSubmit={this.addPost}>
            <textarea
              value={text}
              onChange={this.textChange}
            ></textarea>
            <input type="submit" />
          </form>
          <div className="posts-list">
            {posts && posts.map((post: any) => (
              <div className="post" key={post.id}>
                <span className="post-email">{ email }</span>
                <p className="post-text">{ post.text }</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Posts;
