import { useNavigate } from 'react-router-dom';
import './ComponentScoreSubject.css'
import { FaBook } from 'react-icons/fa'
import { useEffect, useState } from 'react';
import axios from 'axios';

function ComponentScoreSubject() {
    const navigate = useNavigate()

    const className = localStorage.getItem("className")
    const year = localStorage.getItem("year")
    const studentId = localStorage.getItem("studentId")
    const classId = localStorage.getItem("classId")
    const [managementScores, setManagementScores] = useState([])
    const [subjects, setSubjects] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8080/managementscore?studentId=${studentId}&classId=${classId}`)
            .then(res => setManagementScores(res.data))
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8080/managementscore?studentId=${studentId}&classId=${classId}`)
            .then(res => setManagementScores(res.data))
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8080/subject`)
            .then(res => setSubjects(res.data))
    }, [])

    function handleClickDetail(subjectId, subjectName) {
        localStorage.setItem("subjectId", subjectId)
        localStorage.setItem("subjectName", subjectName)
        navigate('/comscore/detail')
    }

    return (
        <div className='component_score-subject'>
            <div className='year-semester'>
                {className} - {year}
            </div>
            <div className='subject_body'>
                <table>
                    <tr>
                        <th rowSpan="2">Môn</th>
                        <th colSpan="3">Kỳ 1</th>
                        <th colSpan="3">Kỳ 2</th>
                        <th rowSpan="2">Điểm TK</th>
                        <th rowSpan="2">Xếp loại</th>
                        <th rowSpan="2">Thao tác</th>
                    </tr>
                    <tr>
                        <th>Điểm hệ số 1</th>
                        <th>Điểm hệ số 2</th>
                        <th>Điểm học kỳ</th>
                        <th>Điểm hệ số 1</th>
                        <th>Điểm hệ số 2</th>
                        <th>Điểm học kỳ</th>
                    </tr>

                    {managementScores.map(element => {
                        let subjectId;
                        let subjectName;
                        return (
                            <tr>
                                {subjects.map(item => {
                                    if (item.id === element.subjectId) {
                                        subjectId = item.id;
                                        subjectName = item.name;
                                        return (
                                            <th>{item.name}</th>
                                        )
                                    }
                                })}
                                <td>{element.diemHeSo1Ky1}</td>
                                <td>{element.diemHeSo2Ky1}</td>
                                <td>{element.diemHocKy1}</td>
                                <td>{element.diemHeSo1Ky2}</td>
                                <td>{element.diemHeSo2Ky2}</td>
                                <td>{element.diemHocKy2}</td>
                                <td>{element.avgScore}</td>
                                <td>{element.rank}</td>
                                <td>
                                    <button onClick={() => handleClickDetail(subjectId, subjectName)}>Chi tiet</button>
                                </td>
                            </tr>
                        )
                    })}


                </table>
            </div>
        </div>
    )
}

export default ComponentScoreSubject;