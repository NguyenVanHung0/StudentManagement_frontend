import { GrClose } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

function InformationBodyTeacher() {
    const navigate = useNavigate()

    const accountId = JSON.parse(localStorage.getItem("accountId"));
    const [teacher, setTeacher] = useState({});
    const [school, setSchool] = useState({})
    const confirmBox = useRef();
    const password = useRef();

    useEffect(() => {
        confirmBox.current.style.display = "none";
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8080/teacher/${accountId}`)
            .then(res => setTeacher(res.data))
    }, [])

    useEffect(() => {
        if (teacher.schoolId != undefined) {
            axios.get(`http://localhost:8080/school/${teacher.schoolId}`)
                .then(res => setSchool(res.data))
        }
    }, [teacher])


    function handleAccountEdit() {
        confirmBox.current.style.display = "block";
        password.current.focus();
    }


    function handleClickClose() {
        confirmBox.current.style.display = "none";
        document.getElementsByClassName("password")[0].style.display = "none"
        document.getElementsByClassName("password")[0].parentElement.getElementsByTagName("input")[0].style.border = "1px solid #333";
        password.current.value = ""
    }

    function handleClickNext() {
        if (password.current.value != teacher.password) {
            document.getElementsByClassName("password")[0].style.display = "block";
            document.getElementsByClassName("password")[0].innerHTML = "Mật khẩu không đúng!"
            document.getElementsByClassName("password")[0].parentElement.getElementsByTagName("input")[0].style.border = "1px solid red";
        }
        else {
            navigate("/teacher/infomation/accountedit");
        }
    }

    return (
        <div className='information_body information_body-teacher'>
            <div className='information_account'>
                <p className='information-item'> <b>Địa chỉ email: </b> {teacher.email}</p>
                <p className='information-item'> <b>Tên tài khoản: </b> {teacher.teacherName}</p>
                <p className='information-item'> <b>Mật khẩu: </b> ********</p>
                <button onClick={handleAccountEdit} className='information_edit-btn'>Chỉnh sửa</button>
            </div>
            <div ref={confirmBox} className='confirm'>
                <div className='confirm_overlay'></div>
                <div className='confirm_box'>
                    <GrClose onClick={handleClickClose} className='confirm_box-icon' />
                    <p>Nhập mật khẩu để tiếp tục</p>
                    <input ref={password} type='password' name='password'
                        onChange={() => {
                            document.getElementsByClassName("password")[0].style.display = "none"
                            document.getElementsByClassName("password")[0].parentElement.getElementsByTagName("input")[0].style.border = "1px solid #333";
                        }}
                    />
                    <span className="err_mesage password">Không được để trống</span>
                    <button onClick={handleClickNext}>Tiếp tục</button>
                </div>
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

export default InformationBodyTeacher