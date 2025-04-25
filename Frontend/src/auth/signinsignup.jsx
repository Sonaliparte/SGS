import React, { useState, useEffect } from 'react';
import './signinsignup.css';
import { auth, provider } from './firebase'; 
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        setProfilePic(firebaseUser.photoURL);
      } else {
        setProfilePic(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setProfilePic(user.photoURL);
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (user) {
    return (
      <div className="container">
        <div className="form">
          <h2 className="heading">You are signed in</h2>
          <img
            src={profilePic}
            alt="Profile"
            style={{ borderRadius: '50%', width: '60px', height: '60px', marginBottom: '10px' }}
          />
          <p>{user.email}</p>
          <button className="button" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>
    );
  }

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

        <button className="button" type="submit">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>

        <div className="toggleText">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <span className="link" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Continue" : "Sign up"}
          </span>
        </div>

        <div className="separator">OR</div>

        <button className="googleButton" type="button" onClick={handleGoogleSignIn}>
          <img
            src="https://img.icons8.com/color/16/000000/google-logo.png"
            alt="Google"
            style={{ marginRight: '8px' }}
          />
          Continue with Google
        </button>

      </form>
    </div>
  );
};

export default AuthForm;



