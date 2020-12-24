import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";

type ResetPasswordFormState = {
  email: string;
  emailSent: boolean;
  error: string;
};

type ResetPasswordFormProps = {
  changePage: () => void;
};

class ResetPasswordForm extends Component<
  ResetPasswordFormProps,
  ResetPasswordFormState
> {
  state = {
    email: "",
    emailSent: false,
    error: "",
  };

  componentDidMount(): void {
    this.props.changePage();
  }

  resetPassword = (event: React.FormEvent): void => {
    const { email, error } = this.state;

    if (error) {
      this.setState({ error: "" });
    }

    const auth = firebase.auth();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        this.setState({ emailSent: true });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });

    event.preventDefault();
  };

  emailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value: email },
    } = event;
    this.setState({ email });
  };
  render() {
    const { email, emailSent, error } = this.state;
    return (
      <div className="reset-password-form">
        <form onSubmit={this.resetPassword}>
          <input type="text" value={email} onChange={this.emailChange} />
          <input type="submit" />
        </form>
        {!error && emailSent && <p>Email sent!</p>}
        {error && <p>{error}</p>}
      </div>
    );
  }
}

export default ResetPasswordForm;
