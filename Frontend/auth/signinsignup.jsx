import React, { useState } from 'react';
import './signinsignup.css';
import { auth, provider } from './firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Header'; // adjust path to where your context/useAuth is exported

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const { setUser } = useAuth(); //  from your context
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      setProfilePic(user.photoURL);
      setUser(user); //  update context
      navigate('/'); // optional: redirect to home
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

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

        {profilePic && (
          <div style={{ marginTop: '12px', textAlign: 'center' }}>
            <img
              src={profilePic}
              alt="User profile"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: '2px solid #ccc',
              }}
            />
            <p style={{ fontSize: '12px', marginTop: '4px' }}>Signed in with Google</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default AuthForm;

