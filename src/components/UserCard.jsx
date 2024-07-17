import React from 'react';
import Avatar from 'avataaars';

const UserCard = ({ user, onLogout }) => {
  return (
    <div className="flex items-center">
      <Avatar
        style={{ width: '50px', height: '50px' }}
        avatarStyle='Circle'
        {...user.avatar}
      />
      <div className="ml-2">
        <div className="font-bold">{user.nickname}</div>
        <button onClick={onLogout} className="ml-2 p-1 bg-red-500 text-white rounded">Выйти</button>
      </div>
    </div>
  );
};

export default UserCard;
