import './ComponentScoreDetail.css'
import Avatar from '../../../Asset/Image/avatar.png'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

function ComponentScoreDetail(props) {

    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const userId = localStorage.getItem("accountId");
    const classId = localStorage.getItem("classId");
    const subjectId = localStorage.getItem("subjectId");
    const studentId = localStorage.getItem("studentId");
    const year = localStorage.getItem("year")
    const className = localStorage.getItem("className");
    const subjectName = localStorage.getItem("subjectName");
    const [managementScore, setManagementScore] = useState({});
    const [teacher, setTeacher] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/user/${userId}`)
            .then(res => setUser(res.data))
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8080/managementscore/subject?studentId=${studentId}&subjectId=${subjectId}&classId=${classId}`)
            .then(res => setManagementScore(res.data))
    }, [user])

    useEffect(() => {
        axios.get(`http://localhost:8080/teacher/${managementScore.teacherId}`)
            .then(res => setTeacher(res.data))
    }, [managementScore])

    function handleClickChangeWithTeacher() {
        localStorage.setItem("teacherId", teacher.id)
        navigate("/chat")
        props.setNavItem("Trao đổi với giáo viên")
    }

    return (
        <div className='component_score-detail'>
            <div className='year-semester-subject'>
                Năm {year} - Lớp {className} - {subjectName}
            </div>
            <div className='score_detail-body'>
                <div className='teacher'>
                    <img src={Avatar} />
                    <b>Giáo viên: {teacher.teacherName}</b>
                </div>
                <div className='score_box'>
                    <div className='score_box-item'>
                        <p><b>Điểm hệ số 1 kỳ 1: </b> {managementScore.diemHeSo1Ky1} </p>
                    </div>
                    <div className='score_box-item'>
                        <p><b>Điểm hệ số 2 kỳ 1: </b> {managementScore.diemHeSo2Ky1} </p>
                    </div>
                    <div className='score_box-item'>
                        <p><b>Điểm học kỳ 1: </b> {managementScore.diemHocKy1} </p>
                    </div>
                    <div className='score_box-item'>
                        <p><b>Điểm hệ số 1 kỳ 2: </b> {managementScore.diemHeSo1Ky2} </p>
                    </div>
                    <div className='score_box-item'>
                        <p><b>Điểm hệ số 2 kỳ 2: </b> {managementScore.diemHeSo2Ky2} </p>
                    </div>
                    <div className='score_box-item'>
                        <p><b>Điểm học kỳ 2: </b> {managementScore.diemHocKy2} </p>
                    </div>
                    <div className='score_box-item'>
                        <p><b>Điểm tổng kết: </b> {managementScore.avgScore} </p>
                    </div>
                    <div className='score_box-item'>
                        <p><b>Nhận xét của giáo viên: </b> {managementScore.commentInClass}  </p>
                    </div>
                    <button onClick={handleClickChangeWithTeacher} className='chat-btn'>Trao đổi với giáo viên</button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        navActive: state.navActive
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setNavItem: (navItem) => dispatch({ type: "SET_NAV", payload: navItem })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentScoreDetail);