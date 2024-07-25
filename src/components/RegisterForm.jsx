import React, { useState } from 'react';
import Avatar from 'avataaars';
import { useTranslation } from 'react-i18next';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterForm = ({ onRegister, loading, error }) => {
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('male');
  const [avatar, setAvatar] = useState(getRandomAvatar(gender));
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(firstName, lastName, email, password, confirmPassword, avatar, gender);
  };

  const handleAvatarClick = () => {
    setAvatar(getRandomAvatar(gender));
  };

  const handleGenderChange = (gender) => {
    setGender(gender);
    setAvatar(getRandomAvatar(gender));
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder={t('firstName')}
        className={`input ${firstName.length < 2 && firstName ? 'input-error' : ''}`}
        required
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder={t('lastName')}
        className={`input ${lastName.length < 2 && lastName ? 'input-error' : ''}`}
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t('email')}
        className={`input ${!validateEmail(email) && email ? 'input-error' : ''}`}
        required
      />
      <div className="relative mb-4">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('password')}
          className={`input ${password.length < 3 && password ? 'input-error' : ''}`}
          required
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 px-3 text-gray-600"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      <div className="relative mb-4">
        <input
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder={t('confirmPassword')}
          className={`input ${confirmPassword.length < 3 && confirmPassword ? 'input-error' : ''}`}
          required
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 px-3 text-gray-600"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      <div className="avatar-container mb-4" onClick={handleAvatarClick} style={{ cursor: 'pointer' }}>
        <Avatar
          style={{ width: '100px', height: '100px' }}
          avatarStyle='Circle'
          {...avatar}
        />
        <p className="text-sm text-gray-600">{t('clickToChangeAvatar')}</p>
        <div className="gender-switcher mt-2">
          <button
            type="button"
            className={`gender-button ${gender === 'male' ? 'active' : ''}`}
            onClick={() => handleGenderChange('male')}
          >
            {t('male')}
          </button>
          <button
            type="button"
            className={`gender-button ${gender === 'female' ? 'active' : ''}`}
            onClick={() => handleGenderChange('female')}
          >
            {t('female')}
          </button>
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
      <button type="submit" className="submit-button">
        {loading ? <span className="loader"></span> : t('register')}
      </button>
    </form>
  );
};

const getRandomAvatar = (gender) => {
  const avatars = {
    male: [
      {
        topType: 'ShortHairShortFlat',
        accessoriesType: 'RoundSunglasses',
        hairColor: 'Black',
        facialHairType: 'Blank',
        clotheType: 'Hoodie',
        eyeType: 'Happy',
        eyebrowType: 'Default',
        mouthType: 'Smile',
        skinColor: 'Light'
      },
      {
        topType: 'ShortHairTheCaesarSidePart',
        accessoriesType: 'Blank',
        hairColor: 'Blonde',
        facialHairType: 'BeardLight',
        clotheType: 'BlazerShirt',
        eyeType: 'Squint',
        eyebrowType: 'RaisedExcited',
        mouthType: 'Twinkle',
        skinColor: 'Brown'
      },
      {
        topType: 'Hat',
        accessoriesType: 'Blank',
        hairColor: 'Brown',
        facialHairType: 'Blank',
        clotheType: 'Overall',
        eyeType: 'Surprised',
        eyebrowType: 'FlatNatural',
        mouthType: 'Default',
        skinColor: 'Light'
      }
    ],
    female: [
      {
        topType: 'LongHairStraight2',
        accessoriesType: 'Kurt',
        hairColor: 'BrownDark',
        facialHairType: 'Blank',
        clotheType: 'BlazerShirt',
        eyeType: 'Happy',
        eyebrowType: 'Default',
        mouthType: 'Smile',
        skinColor: 'Light'
      },
      {
        topType: 'ShortHairShortCurly',
        accessoriesType: 'Prescription01',
        hairColor: 'Red',
        facialHairType: 'Blank',
        clotheType: 'BlazerSweater',
        eyeType: 'Happy',
        eyebrowType: 'RaisedExcited',
        mouthType: 'Smile',
        skinColor: 'Brown'
      },
      {
        topType: 'Hijab',
        accessoriesType: 'Blank',
        hairColor: 'Black',
        facialHairType: 'Blank',
        clotheType: 'BlazerSweater',
        eyeType: 'Happy',
        eyebrowType: 'Default',
        mouthType: 'Smile',
        skinColor: 'Light'
      }
    ]
  };
  const genderAvatars = avatars[gender] || avatars.male.concat(avatars.female);
  return genderAvatars[Math.floor(Math.random() * genderAvatars.length)];
};

const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

export default RegisterForm;
