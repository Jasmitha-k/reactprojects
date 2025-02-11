import React, { useState } from 'react';

const PasswordPopup = () => {
  const [passwordProtected, setPasswordProtected] = useState(false); // If false, prompt to set password
  const [password, setPassword] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [isForgotPasswordMode, setIsForgotPasswordMode] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordSet = () => {
    if (!password) {
      setError('Please enter a password.');
      return;
    }
    setPasswordProtected(true);
    setError('');
  };

  const handlePasswordSubmit = () => {
    if (enteredPassword === password) {
      alert('Password correct!');
    } else {
      setError('Incorrect password. Try again.');
    }
  };

  const handleForgotPassword = () => {
    setIsForgotPasswordMode(true);
  };

  const handlePasswordReset = () => {
    if (!newPassword) {
      setError('Please enter a new password.');
      return;
    }
    setPassword(newPassword);
    setIsForgotPasswordMode(false);
    setError('');
    alert('Password has been reset!');
  };

  return (
    <div className="popup">
      <h2>{passwordProtected ? 'Enter your password' : 'Set your password'}</h2>

      {passwordProtected && !isForgotPasswordMode ? (
        <>
          <input
            type="password"
            placeholder="Enter password"
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
          />
          <button onClick={handlePasswordSubmit}>Submit</button>
          <a href="#" onClick={handleForgotPassword}>Forgot Password?</a>
        </>
      ) : isForgotPasswordMode ? (
        <>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handlePasswordReset}>Reset Password</button>
        </>
      ) : (
        <>
          <input
            type="password"
            placeholder="Set your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handlePasswordSet}>Set Password</button>
        </>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PasswordPopup;
