import React, { useState } from 'react';
import '../UserRegistration.css';

const UserRegistration = ({ onStartGame }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');

  const isEmailValid = (email) => {
    // Regular expression for email validation
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailPattern.test(email);
  };

  const isMobileValid = (mobile) => {
    // Simple phone number validation (10 digits)
    const mobilePattern = /^[0-9]{10}$/;
    return mobilePattern.test(mobile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email
    if (!isEmailValid(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    // Validate mobile
    if (!isMobileValid(mobile)) {
      setMobileError('Please enter a valid 10-digit mobile number.');
      return;
    }

    // Clear any previous validation errors
    setEmailError('');
    setMobileError('');

    // Save data in session storage
    const userData = {
      name,
      email,
      mobile,
      difficulty,
    };
    sessionStorage.setItem('userData', JSON.stringify(userData));

    // Pass registration data to the parent component
    onStartGame(userData);
  };

  return (
    <div className="main-div">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br /><br />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span className="error">{emailError}</span><br /><br />

        <label htmlFor="mobile">Mobile Number:</label>
        <input
          type="tel"
          id="mobile"
          required
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <span className="error">{mobileError}</span><br /><br />

        <label htmlFor="difficulty">Difficulty Level:</label>
        <select
          id="difficulty"
          required
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select><br /><br />

        <button type="submit" className="button">
          Start Game
        </button>
      </form>
    </div>
  );
};

export default UserRegistration;
