import './ComponentScoreDetail.css'
import Avatar from '../../../../Asset/Image/avatar.png'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import { toast, ToastContainer } from "react-toastify";
import { GrClose } from 'react-icons/gr'

function ComponentScoreDetailTeacher(props) {

    const navigate = useNavigate()
    const teacherId = localStorage.getItem("accountId");
    const classId = localStorage.getItem("classId");
    const year = localStorage.getItem("year")
    const className = localStorage.getItem("className");
    const [managementScore, setManagementScore] = useState([]);
    const [teacher, setTeacher] = useState({});
    const [student, setStudent] = useState([])
    const [studentClass, setStudentClass] = useState([]);
    const [diemHeSo1Ky1, setDiemHeSo1Ky1] = useState(0)
    const [diemHeSo2Ky1, setDiemHeSo2Ky1] = useState(0)
    const [diemHocKy1, setDiemHocKy1] = useState(0)
    const [diemHeSo1Ky2, setDiemHeSo1Ky2] = useState(0)
    const [diemHeSo2Ky2, setDiemHeSo2Ky2] = useState(0)
    const [diemHocKy2, setDiemHocKy2] = useState(0)
    const [comment, setComment] = useState("")
    const [number, setNumber] = useState(0)
    const [studentName, setStudentName] = useState("")
    const [subject, setSubject] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8080/teacher/${teacherId}`)
            .then(res => setTeacher(res.data))
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8080/studentclass/class/${classId}`)
            .then(res => setStudentClass(res.data))
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8080/subject/${teacher.subjectId}`)
            .then(res => setSubject(res.data))
    }, [teacher])

    useEffect(() => {
        if (studentClass != null) {
            studentClass.forEach(element => {
                axios.get(`http://localhost:8080/student/${element.studentId}`)
                    .then(res => setStudent(prev => [...prev, res.data]))
            })
        }
    }, [studentClass])


    useEffect(() => {
        axios.get(`http://localhost:8080/managementscore/teacherclassyear?teacherid=${teacherId}&classId=${classId}&year=${year}`)
            .then(res => setManagementScore(res.data))
    }, [number])

    function handleClickUpdateOnRow(idManagementScore) {
        localStorage.setItem("managementScoreId", idManagementScore)
        document.getElementsByClassName("score_detail-overlay")[0].style.display = "block"
        managementScore.map(item => {
            if (item.id === idManagementScore) {
                setDiemHeSo1Ky1(item.diemHeSo1Ky1)
                setDiemHeSo2Ky1(item.diemHeSo2Ky1)
                setDiemHocKy1(item.diemHocKy1)
                setDiemHeSo1Ky2(item.diemHeSo1Ky2)
                setDiemHeSo2Ky2(item.diemHeSo2Ky2)
                setDiemHocKy2(item.diemHocKy2)
                setComment(item.commentInClass)
                student.map(element => {
                    if (element.id === item.studentId) {
                        setStudentName(element.name)
                    }
                })
            }
        })
    }

    function avg() {
        const avg = ((Number.parseFloat(diemHeSo1Ky1) + Number.parseFloat(diemHeSo2Ky1) * 2 + Number.parseFloat(diemHocKy1) * 3) / 6
            + (Number.parseFloat(diemHeSo1Ky2) + Number.parseFloat(diemHeSo2Ky2) * 2 + Number.parseFloat(diemHocKy2) * 3) / 3) / 3;
        return avg;
    }

    function rank(avg) {
        if (avg >= 8) {
            return "Giỏi";
        } else if (avg >= 6.5) {
            return "Khá";
        } else if (avg >= 5) {
            return "Trung bình";
        } else if (avg >= 3.5) {
            return "Yếu";
        } else {
            return "Kém";
        }
    }

    function handleClickUpdate() {
        if (!Number.parseFloat(diemHeSo1Ky1)) {

        }
        if ((diemHeSo1Ky1 < 0 || diemHeSo1Ky1 > 10) || (diemHeSo2Ky1 < 0 || diemHeSo2Ky1 > 10) || (diemHocKy1 < 0 || diemHocKy1 > 10) ||
            (diemHeSo1Ky2 < 0 || diemHeSo1Ky2 > 10) || (diemHeSo2Ky2 < 0 || diemHeSo2Ky2 > 10) || (diemHocKy2 < 0 || diemHocKy2 > 10)) {
            toast.error("Điểm nhập không hợp lệ")
        } else if (!Number.parseFloat(diemHeSo1Ky1) || !Number.parseFloat(diemHeSo2Ky1) || !Number.parseFloat(diemHocKy1) ||
            !Number.parseFloat(diemHeSo1Ky2) || !Number.parseFloat(diemHeSo2Ky2) || !Number.parseFloat(diemHocKy2)) {
            toast.error("Điểm nhập phải là số")
        }
        else {

            const idManagementScore = localStorage.getItem("managementScoreId")
            const newManagementScore = {
                diemHeSo1Ky1: diemHeSo1Ky1,
                diemHeSo2Ky1: diemHeSo2Ky1,
                diemHocKy1: diemHocKy1,
                diemHeSo1Ky2: diemHeSo1Ky2,
                diemHeSo2Ky2: diemHeSo2Ky2,
                diemHocKy2: diemHocKy2,
                avgScore: avg(),
                rank: rank(avg()),
                commentInClass: comment,
                modifiedBy: localStorage.getItem("accountId")
            }

            axios.put(`http://localhost:8080/managementscore/${idManagementScore}`, newManagementScore);
            setTimeout(() => {
                setNumber(number + 1)
                toast.success("Cập nhật thành công")
                document.getElementsByClassName("score_detail-overlay")[0].style.display = "none"
            }, 200)

        }
    }

    function handleClickClose() {
        document.getElementsByClassName("score_detail-overlay")[0].style.display = "none"
    }


    // console.log(comment);
    // console.log(diemHeSo1Ky1, diemHeSo2Ky1, diemHocKy1, diemHeSo1Ky2, diemHeSo2Ky2, diemHocKy2);

    return (
        <div className='component_score-detail'>
            <div className='score_detail-overlay'>
                <div>
                    <GrClose className='score_detail-overlay-icon' onClick={handleClickClose} />
                    <div className='score_detail-overlay-header'>
                        {studentName}
                    </div>
                    <div className='score_detail-overlay-box'>
                        <div className='score_detail-overlay-item'>
                            <label>Điểm hệ số 1 kỳ 1:</label>
                            <input type='text' value={diemHeSo1Ky1}
                                onChange={(e) => setDiemHeSo1Ky1(e.target.value)}
                            />
                        </div>
                        <div className='score_detail-overlay-item'>
                            <label>Điểm hệ số 2 kỳ 1:</label>
                            <input type='text' value={diemHeSo2Ky1}
                                onChange={(e) => setDiemHeSo2Ky1(e.target.value)}
                            />
                        </div>
                        <div className='score_detail-overlay-item'>
                            <label>Điểm học kỳ 1:</label>
                            <input type='text' value={diemHocKy1}
                                onChange={(e) => setDiemHocKy1(e.target.value)}
                            />
                        </div>
                        <div className='score_detail-overlay-item'>
                            <label>Điểm hệ số 1 kỳ 2:</label>
                            <input type='text' value={diemHeSo1Ky2}
                                onChange={(e) => setDiemHeSo1Ky2(e.target.value)}
                            />
                        </div>
                        <div className='score_detail-overlay-item'>
                            <label>Điểm hệ số 2 kỳ 2:</label>
                            <input type='text' value={diemHeSo2Ky2}
                                onChange={(e) => setDiemHeSo2Ky2(e.target.value)}
                            />
                        </div>
                        <div className='score_detail-overlay-item'>
                            <label>Điểm học kỳ 2:</label>
                            <input type='text' value={diemHocKy2}
                                onChange={(e) => setDiemHocKy2(e.target.value)}
                            />
                        </div>
                        <div className='score_detail-overlay-item'>
                            <label>Điểm tổng kết:</label>
                            <input type='text' readOnly value={avg()} />
                        </div>
                        <div className='score_detail-overlay-item'>
                            <label>Xếp loại:</label>
                            <input type='text' readOnly value={typeof rank(avg()) === NaN ? rank(avg()) : 'Không hợp lệ'} />
                        </div>
                        <div className='score_detail-overlay-item'>
                            <label>Nhận xét của giáo viên:</label>
                            <textarea rows='4' value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                        </div>
                        <button onClick={handleClickUpdate}>Cập nhật</button>
                    </div>
                </div>
            </div>
            <div className='year-semester-subject'>
                Năm {year} - Lớp {className} - Môn {subject.name}
            </div>
            <div className='score_detail-body'>
                <table>
                    <tr>
                        <th rowSpan="2" style={{ minWidth: "180px" }}>Tên học sinh</th>
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
                    {managementScore.map(item => {
                        return (
                            <tr key={item.id}>
                                {student.map(childItem => {
                                    if (childItem.id === item.studentId) {
                                        return (
                                            <th style={{ minWidth: "180px" }}>{childItem.name}</th>
                                        )
                                    }
                                })}
                                <td>{item.diemHeSo1Ky1}</td>
                                <td>{item.diemHeSo2Ky1}</td>
                                <td>{item.diemHocKy1}</td>
                                <td>{item.diemHeSo1Ky2}</td>
                                <td>{item.diemHeSo2Ky2}</td>
                                <td>{item.diemHocKy2}</td>
                                <td>{item.avgScore}</td>
                                <td>{item.rank}</td>
                                <td>
                                    <button onClick={() => handleClickUpdateOnRow(item.id)}>Cập nhật</button>
                                </td>
                            </tr>
                        )
                    })}
                </table>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="dark"
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(ComponentScoreDetailTeacher);