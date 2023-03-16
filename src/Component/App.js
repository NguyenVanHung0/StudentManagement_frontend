import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './Login/Login.js';
import Register from './Register/Register.js'
import HomePage from './HomePage/HomePage.js'
import Information from './Information/Information';
import ComponentScore from './ComponentScore/ComponentScore';
import Chat from './Chat/Chat';
import InformationBody from './Information/InformationBody/InformationBody';
import AccountEdit from './Information/AccountEdit/AccountEdit';
import StudentEdit from './Information/StudentEdit/StudentEdit';
import ComponentScoreYear from './ComponentScore/ComponentScoreYear/ComponentScoreYear';
import ComponentScoreSubject from './ComponentScore/ComponentScoreSubject/ComponentScoreSubject';
import ComponentScoreDetail from './ComponentScore/ComponentScoreDetail/ComponentScoreDetail';
import Home from './Home/Home';
import HomePageTeacher from './TeacherComponent/HomePage/HomePageTeacher';
import InformationTeacher from './TeacherComponent/Information/InformationTeacher';
import InformationBodyTeacher from './TeacherComponent/Information/InformationBody/InformationBodyTeacher';
import AccountEditTeacher from './TeacherComponent/Information/AccountEdit/AccountEditTeacher';
import { FaHome } from 'react-icons/fa';
import { useState } from 'react';
import ComponentScoreTeacher from './TeacherComponent/ScoreManagement/ComponentScoreTeacher';
import ComponentScoreDetailTeacher from './TeacherComponent/ScoreManagement/ComponentScoreDetail/ComponentScoreDetailTeacher';
import ComponentScoreSubjectTeacher from './TeacherComponent/ScoreManagement/ComponentScoreSubject/ComponentScoreSubjectTeacher';
import ComponentScoreYearTeacher from './TeacherComponent/ScoreManagement/ComponentScoreYear/ComponentScoreYearTeacher';
import ChatTeacher from './TeacherComponent/Chat/ChatTeacher';

function App() {

  const [number, setNumber] = useState(0)
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/teacher/home' element={<HomePageTeacher compo={<Home />} />} />
        <Route path='/teacher/infomation/accountedit' element={<HomePageTeacher compo={<InformationTeacher child={<AccountEditTeacher />} />} />} />
        <Route path='/teacher/infomation/*' element={<HomePageTeacher compo={<InformationTeacher child={<InformationBodyTeacher />} />} />} />
        <Route path='/teacher/comscore/detail' element={<HomePageTeacher compo={<ComponentScoreTeacher child={<ComponentScoreDetailTeacher />} />} />} />
        <Route path='/teacher/comscore/subject' element={<HomePageTeacher compo={<ComponentScoreTeacher child={<ComponentScoreSubjectTeacher />} />} />} />
        <Route path='/teacher/comscore/*' element={<HomePageTeacher compo={<ComponentScoreTeacher child={<ComponentScoreYearTeacher />} />} />} />
        <Route path='/teacher/chat/*' element={<HomePageTeacher compo={<ChatTeacher />} />} />

        <Route path='/home' element={<HomePage compo={<Home />} />} />
        <Route path='/infomation/accountedit' element={<HomePage compo={<Information child={<AccountEdit setNumber={setNumber} />} />} />} />
        <Route path='/infomation/studentedit' element={<HomePage compo={<Information child={<StudentEdit />} />} />} />
        <Route path='/infomation/*' element={<HomePage number={number} compo={<Information child={<InformationBody />} />} />} />
        <Route path='/comscore/detail' element={<HomePage compo={<ComponentScore child={<ComponentScoreDetail />} />} />} />
        <Route path='/comscore/subject' element={<HomePage compo={<ComponentScore child={<ComponentScoreSubject />} />} />} />
        <Route path='/comscore/*' element={<HomePage compo={<ComponentScore child={<ComponentScoreYear />} />} />} />
        <Route path='/chat/*' element={<HomePage compo={<Chat />} />} />
        <Route path='*' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
