import React, { useState, useEffect } from 'react';
import '../GreenLightRedLight.css';
import Leaderboard from './Leaderboard';

const GreenLightRedLight = ({ registrationData }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [boxColor, setBoxColor] = useState('red');
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(40);
  let intervalRef;
  let timerRef;
  const [message, setMessage] = useState('');
  const [leaderboardData, setLeaderboardData] = useState([]);

  const difficultySettings = {
    Easy: { n: 10 },
    Medium: { n: 15 },
    Hard: { n: 25 },
  };

  const { n } = registrationData && registrationData.difficulty
    ? difficultySettings[registrationData.difficulty]
    : difficultySettings['Easy'];

  useEffect(() => {
    const changeColorRandomly = () => {
      const colors = ['green', 'red'];
      const newColor = colors[Math.floor(Math.random() * colors.length)];
      setBoxColor(newColor);

      const delay = 1000 + Math.random() * 1000;
      intervalRef = setTimeout(changeColorRandomly, delay);
    };

    if (gameStarted) {
      changeColorRandomly();
      if (clicks === n) {
        setMessage('Hurray, You won!');
        updateLeaderboard('win');
        clearInterval(intervalRef);
        clearInterval(timerRef);
        setGameStarted(false);
      }

      timerRef = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        } else {
          clearInterval(timerRef);
          clearTimeout(intervalRef);
          setGameStarted(false);

          if (clicks === n) {
            setMessage('You Won!');
            updateLeaderboard('win');
          } else {
            setMessage('Game Over! You lost!');
            updateLeaderboard('lose');
          }
        }
      }, 1000);

      return () => {
        clearInterval(timerRef);
        clearTimeout(intervalRef);
      };
    }
  }, [clicks, gameStarted, timeLeft, n, registrationData]);

  const handleBoxClick = () => {
    if (boxColor === 'green') {
      setClicks(clicks + 1);
    } else {
      setMessage('Oops! Game Over! You lost!');
      updateLeaderboard('lose');
      setGameStarted(false);
      clearInterval(intervalRef);
      clearInterval(timerRef);
    }
  };

  const updateLeaderboard = (result) => {
    const playerName = registrationData.name;
    const playerEmail = registrationData.email;

    const existingPlayerIndex = leaderboardData.findIndex(
      (entry) => entry.email === playerEmail
    );

    if (existingPlayerIndex !== -1) {
      const updatedLeaderboardData = [...leaderboardData];
      if (result === 'win') {
        updatedLeaderboardData[existingPlayerIndex].wins =
          (updatedLeaderboardData[existingPlayerIndex].wins || 0) + 1;
      } else {
        updatedLeaderboardData[existingPlayerIndex].losses =
          (updatedLeaderboardData[existingPlayerIndex].losses || 0) + 1;
      }
      setLeaderboardData(updatedLeaderboardData);
    } else {
      const newPlayerEntry = {
        name: playerName,
        email: playerEmail,
      };
      if (result === 'win') {
        newPlayerEntry.wins = 1;
        newPlayerEntry.losses = 0;
      } else {
        newPlayerEntry.wins = 0;
        newPlayerEntry.losses = 1;
      }
      setLeaderboardData([...leaderboardData, newPlayerEntry]);
    }
  };

  const startNewGame = () => {
    setClicks(0);
    setTimeLeft(40);
    setGameStarted(true);
    setMessage('');
  };

  return (
    <div>
      <h1>Squid Games</h1>
      {gameStarted ? (
        <div>
          <div
            className="box"
            style={{ backgroundColor: boxColor }}
            onClick={handleBoxClick}
          ></div>
          <p>Time Left: {timeLeft} seconds</p>
          <p>Clicks: {clicks}/{n}</p>
        </div>
      ) : (
        <div>
          <p>Welcome, {registrationData.name}!</p>
          <button onClick={startNewGame}>Start Game</button>
        </div>
      )}

      {message && <div className="message">{message}</div>}

      <Leaderboard leaderboardData={leaderboardData} />
    </div>
  );
};

export default GreenLightRedLight;
