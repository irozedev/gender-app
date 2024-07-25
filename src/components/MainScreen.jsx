import React, { useState, useEffect } from 'react';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon } from 'react-share';
import Wheel from './Wheel';
import CountdownTimer from './CountdownTimer';
import UserCard from './UserCard';
import Avatar from 'avataaars';
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
        <div key={u.email + index} className="text-center">
          <Avatar
            style={{ width: '40px', height: '40px', backgroundColor: team === 'boy' ? '#38bdf8' : '#f472b6', borderRadius: '50%', padding: '5px' }}
            avatarStyle='Circle'
            topType={u.avatar.topType}
            accessoriesType={u.avatar.accessoriesType}
            hairColor={u.avatar.hairColor}
            facialHairType={u.avatar.facialHairType}
            clotheType={u.avatar.clotheType}
            eyeType={u.avatar.eyeType}
            eyebrowType={u.avatar.eyebrowType}
            mouthType={u.avatar.mouthType}
            skinColor={u.avatar.skinColor}
          />
          <span className="text-sm">{u.firstName} {u.lastName ? u.lastName.charAt(0) : ''}.</span>
        </div>
      ));
  };

  return (
    <div className="main-screen">
      <div className="header">
        <h1 className="text-2xl font-bold">Hello {user.firstName} {user.lastName ? user.lastName.charAt(0) : ''}.</h1>
        <UserCard user={user} onLogout={onLogout} />
      </div>
      <div className="countdown-container">
        <CountdownTimer targetDate="2024-08-11T11:00:00" />
      </div>
      <div className="team-container">
        <div className="team text-center">
          <h3 className="text-xl font-bold">Team Boy</h3>
          <p className="text-lg">{votes.boy} votes</p>
          <div className="flex space-x-2 justify-center mt-2">{renderAvatars('boy')}</div>
        </div>
        <div className="vs">VS</div>
        <div className="team text-center">
          <h3 className="text-xl font-bold">Team Girl</h3>
          <p className="text-lg">{votes.girl} votes</p>
          <div className="flex space-x-2 justify-center mt-2">{renderAvatars('girl')}</div>
        </div>
      </div>
      <div className="wheel-container">
        <Wheel onSpinComplete={handleWheelResult} />
      </div>
      {result && (
        <div className="result-container text-center">
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
