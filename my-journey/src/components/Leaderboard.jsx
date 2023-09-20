import React from 'react';
import'../Leaderboard.css';
const Leaderboard = ({ leaderboardData }) => {
  return (
    <div>
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Wins</th>
            <th>Losses</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((player) => (
            <tr key={player.email}>
              <td>{player.name}</td>
              <td>{player.email}</td>
              <td>{player.wins || 0}</td>
              <td>{player.losses || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
