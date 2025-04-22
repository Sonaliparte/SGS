import React, { useState } from 'react';
import './signinsignup.css';

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="container">
      <form className="form">
        <h2 className="heading">{isSignUp ? 'Create a New Account' : 'Welcome Back'}</h2>

        <label className="label">User Name </label>
        <input className="input" type="email" />

        <label className="label">Email</label>
        <input className="input" type="email" />

        <label className="label">Password</label>
        <input className="input" type="password" />

        {isSignUp && (
          <>
            <label className="label">Confirm Password</label>
            <input className="input" type="password" />
          </>
        )}

        <button className="button">{isSignUp ? 'Sign Up' : 'Sign In'}</button>

        <div className="toggleText">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <span className="link" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Continue" : "Sign up"}
          </span>
        </div>
      

        <div className="separator">OR</div>

        <button className="googleButton">
          <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" style={{ marginRight: '8px' }} />
          Continue with Google
        </button>
        </form>
    </div>
  );
};

export default AuthForm;


