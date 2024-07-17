import React, { useState, useEffect } from 'react';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon } from 'react-share';
import Wheel from './Wheel';
import CountdownTimer from './CountdownTimer';
import UserCard from './UserCard'; // Импортируем новый компонент
import './MainScreen.css';

const MainScreen = ({ user, onLogout }) => {
  const [votes, setVotes] = useState({ boy: 0, girl: 0 });
  const [result, setResult] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchVotes = async () => {
      const response = await fetch('http://localhost:3001/api/votes');
      const result = await response.json();
      setVotes(result);
    };

    const fetchUsers = async () => {
      const response = await fetch('http://localhost:3001/api/users');
      const users = await response.json();
      setUsers(users);
    };

    fetchVotes();
    fetchUsers();
  }, []);

  const handleWheelResult = (res) => {
    setResult(res);
  };

  const shareUrl = window.location.href;
  const shareMessage = `Я только что узнал, что у нас будет ${result === 'boy' ? 'мальчик' : 'девочка'}! Присоединяйтесь к нашему гендерному раскрытию!`;

  const renderAvatars = (team) => {
    return users
      .filter((u) => u.team === team)
      .slice(0, 5)
      .map((u, index) => (
        <div key={u.nickname + index} className="text-center">
          <img
            src={u.avatar} // Assuming `avatar` contains the URL of the user's avatar image
            alt={u.nickname}
            className={`w-10 h-10 rounded-full mx-auto ${team === 'boy' ? 'border-blue-500' : 'border-pink-500'} border-2`}
          />
          <span className="text-sm">{u.nickname}</span>
        </div>
      ));
  };

  return (
    <div className="main-screen bg-[#fef6fb] p-4 overflow-y-auto">
      <div className="header flex items-center justify-center mb-4">
        <UserCard user={user} onLogout={onLogout} /> {/* Используем новый компонент */}
      </div>
      <div className="countdown-container mb-4 flex justify-center">
        <CountdownTimer targetDate="2024-08-11T11:00:00" />
      </div>
      <div className="team-container mb-8 flex justify-around items-center">
        <div className="team text-center">
          <h3 className="text-xl font-bold">Team Boy</h3>
          <p className="text-lg">{votes.boy} votes</p>
          <div className="flex space-x-2 justify-center mt-2">{renderAvatars('boy')}</div>
        </div>
        <div className="vs text-2xl font-bold">VS</div>
        <div className="team text-center">
          <h3 className="text-xl font-bold">Team Girl</h3>
          <p className="text-lg">{votes.girl} votes</p>
          <div className="flex space-x-2 justify-center mt-2">{renderAvatars('girl')}</div>
        </div>
      </div>
      <div className="flex justify-center mb-8">
        <Wheel onSpinComplete={handleWheelResult} />
      </div>
      {result && (
        <div className="result-container mt-4 text-center">
          <p className="text-2xl mb-4">{`Это ${result === 'boy' ? 'мальчик' : 'девочка'}!`}</p>
          <div className="flex justify-center space-x-2">
            <FacebookShareButton url={shareUrl} quote={shareMessage}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} title={shareMessage}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <WhatsappShareButton url={shareUrl} title={shareMessage}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainScreen;
