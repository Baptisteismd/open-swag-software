import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeButton from '../components/HomeButton';
import coachIcon from '../assets/coach.png'; // Example image path
import friendsIcon from '../assets/friends.png';
import teacherIcon from '../assets/teacher.png';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <h1 className="home-title">Welcome to Our Website</h1>
      <div className="home-container">
        <HomeButton
          image={friendsIcon}
          label="Friend"
          onClick={() => navigate('/Friend')}
        />
        <HomeButton
          image={coachIcon}
          label="Coach"
          onClick={() => navigate('/Coach')}
        />
        <HomeButton
          image={teacherIcon}
          label="Teacher"
          onClick={() => navigate('/Teacher')}
        />
      </div>
    </div>
  );
};

export default Home;
