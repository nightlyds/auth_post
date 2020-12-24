import React from "react";
import "regenerator-runtime/runtime";
// import { Provider } from "react-redux";
// import store from "./store/store.js";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import "normalize.css";
import "animate.css";
// import "./basic/css/fonts_and_colors.css";
import firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthProvider,
} from "@react-firebase/auth";
import { config } from "../config/firebase_config";
import SignIn from "./components/sign_in/SignIn";
import SignUp from "./components/sign_up/SignUp";
import ResetPassword from "./components/reset_password/ResetPassword";
import Posts from "./components/posts/Posts";

function App() {
  return (
    <div className="App">
      <FirebaseAuthProvider {...config} firebase={firebase}>
        {/* <Provider store={store}> */}
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Posts} />
              <Route exact path="/sign_in" component={SignIn} />
              <Route exact path="/sign_up" component={SignUp} />
              <Route exact path="/reset" component={ResetPassword} />
              {/* <Route component={Error404} /> */}
            </Switch>
          </BrowserRouter>
        {/* </Provider> */}
        </FirebaseAuthProvider>
    </div>
  );
}

export default App;
