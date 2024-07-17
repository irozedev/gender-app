import React, { useState } from 'react';
import Avatar from 'avataaars';

const avatars = [
  { topType: 'ShortHairDreads01', accessoriesType: 'Prescription02', hairColor: 'Black', facialHairType: 'Blank', clotheType: 'Hoodie', eyeType: 'Happy', eyebrowType: 'Default', mouthType: 'Smile', skinColor: 'Light' },
  { topType: 'LongHairStraight2', accessoriesType: 'Kurt', hairColor: 'Blonde', facialHairType: 'Blank', clotheType: 'BlazerShirt', eyeType: 'Squint', eyebrowType: 'RaisedExcited', mouthType: 'Smile', skinColor: 'Light' },
  // Добавьте больше конфигураций аватаров по необходимости
];

const getRandomAvatar = () => {
  return avatars[Math.floor(Math.random() * avatars.length)];
};

const WelcomeScreen = ({ onNicknameSubmit }) => {
  const [nickname, setNickname] = useState('');
  const [avatar, setAvatar] = useState(getRandomAvatar());

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/api/nickname', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname, avatar }),
    });
    const result = await response.json();
    if (result.success) {
      onNicknameSubmit(nickname, avatar);
    } else {
      console.error('Ошибка создания пользователя:', result.message);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-blue-100">
      <h1 className="text-2xl font-bold mb-4">Добро пожаловать на гендер пати Степана и Валерии!</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Введите ваш никнейм"
          className="mb-4 p-2 border rounded"
          required
        />
        <div className="mb-4">
          <Avatar
            style={{ width: '100px', height: '100px' }}
            avatarStyle='Circle'
            {...avatar}
          />
        </div>
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">Подтвердить</button>
      </form>
    </div>
  );
};

export default WelcomeScreen;
