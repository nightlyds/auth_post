import React from "react";
import ResetPasswordForm from "./ResetPasswordForm";
import firebase from "firebase/app";
import "firebase/auth";
import { Link, RouteComponentProps } from "react-router-dom";

const ResetPassword = ({ history }: RouteComponentProps<{}>) => {
  const redirect = (): void => {
    firebase.auth().onAuthStateChanged((user): void => {
      if (user) {
        history.push("/");
      }
    });
  };
  return (
    <div className="reset-password">
      <h1 className="title">Reset Password</h1>
      <ResetPasswordForm changePage={() => redirect()} />
      <Link to="/" className="link-to-posts">
        Posts
      </Link>
    </div>
  );
};

export default ResetPassword;
