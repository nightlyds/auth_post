import React from "react";
import SignInForm from "./SignInForm";
import firebase from "firebase/app";
import "firebase/auth";
import { Link, RouteComponentProps } from "react-router-dom";

const SignIn = ({ history }: RouteComponentProps<{}>) => {
  const redirect = (): void => {
    firebase.auth().onAuthStateChanged((user): void => {
      if (user) {
        history.push("/");
      }
    });
  };
  return (
    <div className="sign-up">
      <h1 className="title">SignIn</h1>
      <SignInForm changePage={() => redirect()} />
      <div className="change-to-sign-up">
        <Link to="/sign_up" className="link-to-sign-up">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
