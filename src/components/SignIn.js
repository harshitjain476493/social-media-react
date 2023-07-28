// src/components/SignIn.js
import React from 'react';

function SignIn() {
  return (
    <div className="form-container">
      <h2>Sign In</h2>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
      </div>
      <div className="form-group">
        <button>Sign In</button>
      </div>
    </div>
  );
}

export default SignIn;
