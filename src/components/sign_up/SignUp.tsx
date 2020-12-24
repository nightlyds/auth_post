import React from "react";
import SignUpForm from "./SignUpForm";
import firebase from "firebase/app";
import "firebase/auth";
import { RouteComponentProps } from "react-router-dom";

const SignUp = ({ history }: RouteComponentProps<{}>) => {
  const redirect = (): void => {
    firebase.auth().onAuthStateChanged((user): void => {
      if (user) {
        history.push("/");
      }
    });
  };
  return (
    <div className="sign-up">
      <h1 className="title">SignUp</h1>
      <SignUpForm changePage={() => redirect()} />
    </div>
  );
};

export default SignUp;
