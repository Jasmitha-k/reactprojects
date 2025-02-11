'use client';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faTimes } from '@fortawesome/free-solid-svg-icons';

const PasswordPopup = () => {
  const [passwordProtected, setPasswordProtected] = useState(false); // If false, prompt to set password
  const [password, setPassword] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [isForgotPasswordMode, setIsForgotPasswordMode] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls modal visibility

  const handlePasswordSet = () => {
    if (!password) {
      setError('Please enter a password.');
      return;
    }
    setPasswordProtected(true);  // Set the password as protected
    setError('');
    setEnteredPassword('');  // Reset entered password to prevent leaks
  };

  const handlePasswordSubmit = () => {
    if (enteredPassword === password) {
      alert('Password correct!');
      setIsModalOpen(false); // Close the modal on successful login
      setError('');
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
    setEnteredPassword('');  // Clear entered password after reset
  };

  const toggleModal = () => {
    if (!isModalOpen) {
      setIsModalOpen(true);  // Open the modal if it's not already open
    } else {
      // Reset the form when closing the modal, but do not reset password if already set
      if (!passwordProtected) {
        resetForm();  // Only reset the form if password is not set
      }
      setIsModalOpen(false);  // Close the modal
    }
  };

  const resetForm = () => {
    setEnteredPassword('');
    setNewPassword('');
    setError('');
    setIsForgotPasswordMode(false);
  };

  return (
    <div>
      {/* Lock Icon to Open the Modal */}
      <div className="lock-icon" onClick={toggleModal}>
        <FontAwesomeIcon icon={faLock} size="2x" />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="popup-overlay">
          <div className="popup">
            {/* Close (Cross) Button */}
            <div className="close-icon" onClick={toggleModal}>
              <FontAwesomeIcon icon={faTimes} size="1x" />
            </div>

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
                <a href="#" onClick={handleForgotPassword}>
                  Forgot Password?
                </a>
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
        </div>
      )}

      <style jsx>{`
        /* For lock icon */
        .lock-icon {
          cursor: pointer;
          display: inline-block;
          padding: 10px;
          background-color: #f1f1f1;
          border-radius: 50%;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          margin: 50px;
        }

        .lock-icon:hover {
          background-color: #ddd;
        }

        /* Modal overlay */
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Centered modal */
        .popup {
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          max-width: 400px;
          width: 90%;
          text-align: center;
          position: relative;
        }

        h2 {
          margin-bottom: 20px;
          font-size: 1.5em;
        }

        input {
          width: 80%;
          padding: 10px;
          margin: 10px 0;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        button {
          padding: 10px 15px;
          border: none;
          background-color: #4caf50;
          color: white;
          cursor: pointer;
          border-radius: 5px;
          margin-top: 10px;
        }

        button:hover {
          background-color: #45a049;
        }

        a {
          display: block;
          margin-top: 10px;
          color: #007bff;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }

        p {
          color: red;
          font-size: 12px;
          margin-top: 10px;
        }

        /* Close (Cross) Icon */
        .close-icon {
          position: absolute;
          top: 10px;
          right: 10px;
          cursor: pointer;
          background-color: transparent;
          border: none;
        }

        .close-icon:hover {
          color: #ff0000;
        }
      `}</style>
    </div>
  );
};

export default PasswordPopup;
