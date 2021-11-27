import React from 'react';
import { auth, provider, signInWithPopup } from '../firebaseDB';
import { Button } from '@material-ui/core';
import '../styles/Login.css';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';

export default function Login() {
  const [{ user }, dispatch] = useStateValue();
  console.log('user', user);
  const signin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Whatsapp_logo.jpg/640px-Whatsapp_logo.jpg"
          alt=""
        />
        <div className="login__text">
          <h1>Sign in to Whatsapp</h1>
        </div>
        <Button type="submit" onClick={signin}>
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}
