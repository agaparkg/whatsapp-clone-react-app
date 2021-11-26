import { Button } from '@material-ui/core';
import React from 'react';
import '../styles/Login.css';

export default function Login() {
  const signin = () => {};

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
