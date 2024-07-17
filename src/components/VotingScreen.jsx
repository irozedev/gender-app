import React from 'react';

const VotingScreen = ({ user, onVote }) => {
  const handleVote = async (team) => {
    const response = await fetch('http://localhost:3001/api/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname: user.nickname, team }), // Используем никнейм пользователя
    });
    const result = await response.json();
    if (result.success) {
      onVote(team);
    } else {
      console.error('Ошибка голосования:', result.message);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-pink-100">
      <h1 className="text-2xl font-bold mb-4">Мальчик или девочка?</h1>
      <div className="flex space-x-4">
        <button onClick={() => handleVote('boy')} className="p-4 bg-boy text-white rounded">Мальчик</button>
        <button onClick={() => handleVote('girl')} className="p-4 bg-girl text-white rounded">Девочка</button>
      </div>
    </div>
  );
};

export default VotingScreen;
