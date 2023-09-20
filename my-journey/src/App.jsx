// src/App.js
import React, { useState } from 'react';
import UserRegistration from './components/UserRegistration';
import GreenLightRedLight from './components/GreenLightRedLight';

function App() {
  const [registrationData, setRegistrationData] = useState(null);

  const handleStartGame = (data) => {
    setRegistrationData(data);
  };

  return (
    <div className="App">
      {!registrationData ? (
        <UserRegistration onStartGame={handleStartGame} />
      ) : (
        <GreenLightRedLight registrationData={registrationData} />
      )}
    </div>
  );
}

export default App;
