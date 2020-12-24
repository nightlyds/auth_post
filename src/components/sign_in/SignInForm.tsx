import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";

type SignInFormState = {
  email: string;
  password: string;
  error?: never | string;
};

type SignInFormProps = {
  changePage: () => void
}

class SignInForm extends Component<SignInFormProps, SignInFormState> {
  state = {
    email: "",
    password: "",
    error: "",
  };

   componentDidMount(): void{
    this.props.changePage();
  }

  onSubmit = (event: React.FormEvent): void => {
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        let errorMessage = error.message;
        this.setState({ error: errorMessage });
      });

    event.preventDefault();
  };

  signInWithGoogle = () => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider);
    this.props.changePage();
  }

  signInAnonymously = () => {
    firebase.auth().signInAnonymously();
    this.props.changePage();
  }

  onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value: email },
    } = event;
    this.setState({ email });
  };

  onChangePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value: password },
    } = event;
    this.setState({ password });
  };
  render() {
    const { email, password, error } = this.state;
    const isInvalid = email === "" || password === "";
    return (
      <div className="sign-in-form">
        <form onSubmit={this.onSubmit}>
          <input
            name="email"
            value={email}
            onChange={this.onChangeEmail}
            type="text"
            placeholder="Email Address"
          />
          <input
            name="password"
            value={password}
            onChange={this.onChangePassword}
            type="password"
            placeholder="Password"
          />
          <input type="submit" disabled={isInvalid} />
        </form>
        <div className="sign-in-other">
        <button
          onClick={this.signInWithGoogle}
        >
          Sign In with Google
        </button>
        <button
          data-testid="signin-anon"
          onClick={this.signInAnonymously}
        >
          Sign In Anonymously
        </button>
        </div>
        {error && <p>{error}</p>}
      </div>
    );
  }
}

export default SignInForm;
