import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Friend from './pages/FriendChatBot';
import Teacher from './pages/TeacherChatBot';
import Coach from './pages/CoachChatBot';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        /**Add the other routes here */
        <Route path="/Friend" element={<Friend />} />
        <Route path="/Coach" element={<Coach />} />
        <Route path="/Teacher" element={<Teacher />} />
      </Routes>
    </div>
  );
};

export default App;
