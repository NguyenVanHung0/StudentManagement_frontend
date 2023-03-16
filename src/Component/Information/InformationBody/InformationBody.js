import { GrClose } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

function InformationBody() {
    const navigate = useNavigate()

    const accountId = JSON.parse(localStorage.getItem("accountId"));
    const [account, setAccount] = useState({});
    const [school, setSchool] = useState({})
    const [student, setStudent] = useState({})
    const confirmBox = useRef();
    const password = useRef();

    useEffect(() => {
        confirmBox.current.style.display = "none";
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8080/user/${accountId}`)
            .then(res => setAccount(res.data))
    }, [])

    useEffect(() => {
        if (account.schoolId != undefined) {
            axios.get(`http://localhost:8080/school/${account.schoolId}`)
                .then(res => setSchool(res.data))
        }
    }, [account])

    useEffect(() => {
        if (account.id != undefined) {
            axios.get(`http://localhost:8080/student/${account.defaultStudent}`)
                .then(res => setStudent(res.data))
        }
    }, [account])

    function handleAccountEdit() {
        confirmBox.current.style.display = "block";
        password.current.focus();
    }

    function handleStudentEdit() {
        navigate("/infomation/studentedit");
    }

    function handleClickClose() {
        confirmBox.current.style.display = "none";
        document.getElementsByClassName("password")[0].style.display = "none"
        document.getElementsByClassName("password")[0].parentElement.getElementsByTagName("input")[0].style.border = "1px solid #333";
        password.current.value = ""
    }

    function handleClickNext() {
        if (password.current.value != account.password) {
            document.getElementsByClassName("password")[0].style.display = "block";
            document.getElementsByClassName("password")[0].innerHTML = "Mật khẩu không đúng!"
            document.getElementsByClassName("password")[0].parentElement.getElementsByTagName("input")[0].style.border = "1px solid red";
        }
        else {
            navigate("/infomation/accountedit");
        }
    }

    return (
        <div className='information_body'>
            <div className='information_account'>
                <p className='information-item'> <b>Địa chỉ email: </b> {account.email}</p>
                <p className='information-item'> <b>Tên tài khoản: </b> {account.userName}</p>
                <p className='information-item'> <b>Mật khẩu: </b> ********</p>
                <button onClick={handleAccountEdit} className='information_edit-btn'>Chỉnh sửa</button>
            </div>
            <div className='information_student'>
                <p className='information-item'> <b>Tên trường: </b> {school.name}</p>
                <p className='information-item'> <b>Địa chỉ: </b> {school.address}</p>
                <p className='information-item'> <b>Năm Thành Lập: </b> {school.foundedYear}</p>
                <p className='information-item'> <b>Tên học sinh: </b> {student.name}</p>
                <p className='information-item'> <b>Ngày sinh: </b> {new Date(student.birthDate).toLocaleDateString()}</p>
                <p className='information-item'> <b>Địa chỉ: </b> {student.address}</p>
                <button onClick={handleStudentEdit} className='information_edit-btn'>Chỉnh sửa</button>
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

export default InformationBody