import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';
import image from '../../Asset/Image/login.jpg';

function Register() {

    const navigate = useNavigate()
    const [listUser, setListUser] = useState([]);
    const [listStudent, setListStudent] = useState([]);
    const [gender, setGender] = useState("")
    let studentControl = {}
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/;

    const emailElement = useRef();
    const userNameElement = useRef();
    const passwordElement = useRef();
    const codeElement = useRef();

    useEffect(() => {
        axios.get('http://localhost:8080/user')
            .then(res => setListUser(res.data));
    }, []);


    useEffect(() => {
        axios.get('http://localhost:8080/student')
            .then(res => setListStudent(res.data));
    }, [])



    function handleClickSingUp() {
        const userName = userNameElement.current.value;
        const password = passwordElement.current.value;
        const email = emailElement.current.value;
        const studentCode = codeElement.current.value;
        let isPass = true;
        let isPass1 = false;

        if (email === "") {
            document.getElementsByClassName("email")[0].style.display = "block";
            document.getElementsByClassName("email")[0].innerHTML = "Không được để trống!"
            emailElement.current.parentElement.getElementsByClassName("input_email")[0].style.borderBottom = "1px solid red";
            return;
        }
        if (!regexEmail.test(email)) {
            document.getElementsByClassName("email")[0].style.display = "block";
            document.getElementsByClassName("email")[0].innerHTML = "Email không đúng"
            document.getElementsByClassName("email")[0].parentElement.getElementsByTagName("input")[0].style.borderBottom = "1px solid red";
            return;
        }
        if (userName === "") {
            document.getElementsByClassName("username")[0].style.display = "block";
            document.getElementsByClassName("username")[0].innerHTML = "Không được để trống!"
            userNameElement.current.parentElement.getElementsByClassName("input_name")[0].style.borderBottom = "1px solid red";
            return;
        }
        if (password === "") {
            document.getElementsByClassName("password")[0].style.display = "block";
            document.getElementsByClassName("password")[0].innerHTML = "Không được để trống!"
            passwordElement.current.parentElement.getElementsByClassName("input_password")[0].style.borderBottom = "1px solid red";
            return;
        }
        if (!regexPassword.test(password)) {
            document.getElementsByClassName("password")[0].style.display = "block";
            document.getElementsByClassName("password")[0].innerHTML = "Mật khẩu phải bao gồm cả chữ thường, chữ hoa, số và ký tự đặc biệt, ít nhất 8 ký tự!"
            document.getElementsByClassName("password")[0].parentElement.getElementsByTagName("input")[0].style.borderBottom = "1px solid red";
            return;
        }
        if (studentCode === "") {
            document.getElementsByClassName("studentcode")[0].style.display = "block";
            document.getElementsByClassName("studentcode")[0].innerHTML = "Không được để trống!"
            codeElement.current.parentElement.getElementsByClassName("input_code")[0].style.borderBottom = "1px solid red";
            return;
        }
        if (gender === "") {
            document.getElementsByClassName("gender")[0].style.display = "block";
            document.getElementsByClassName("gender")[0].innerHTML = "Không được để trống!"
            return;
        }

        listStudent.forEach(student => {
            console.log(student.userId);
            if (student.code == studentCode && student.userId === null) {
                isPass1 = true;
                studentControl = student;
            }
        })

        listUser.forEach(account => {
            if (account.userName === userName || account.email === email) {
                isPass = false;
            }
        })
        if (isPass && isPass1) {
            const toastId = toast.success("Tạo tài khoản thành công");

            document.getElementsByClassName("email")[0].style.display = "none"
            emailElement.current.parentElement.getElementsByClassName("input_email")[0].style.borderBottom = "1px solid white";
            document.getElementsByClassName("username")[0].style.display = "none"
            userNameElement.current.parentElement.getElementsByClassName("input_name")[0].style.borderBottom = "1px solid white";
            document.getElementsByClassName("password")[0].style.display = "none"
            passwordElement.current.parentElement.getElementsByClassName("input_password")[0].style.borderBottom = "1px solid white";
            document.getElementsByClassName("studentcode")[0].style.display = "none"
            codeElement.current.parentElement.getElementsByClassName("input_code")[0].style.borderBottom = "1px solid white";
            document.getElementsByClassName("gender")[0].style.display = "none";

            const stdId = studentControl.id;
            let newAccount = {
                userName: userName,
                email: email,
                password: password,
                schoolId: 1,
                defaultStudent: stdId,
                gender: gender
            }


            // const newStudent = {...studentControl, userId:}
            axios.post("http://localhost:8080/user", newAccount)
                .then(res => {
                    axios.put(`http://localhost:8080/student/${studentControl.id}`, { ...studentControl, userId: res.data.id })
                })



            setTimeout(() => {
                toast.dismiss(toastId);
                navigate("/signin");
            }, 2000)
        }
        else {
            document.getElementsByClassName("gender")[0].style.display = "block";
            document.getElementsByClassName("gender")[0].innerHTML = "Tên tài khoản đã tồn tại hoặc mã học sinh không đúng"
        }

    }
    return (
        <div className='login'>
            <div className='login_box'>
                <div className='login_welcom'>
                    <img src={image} />
                    <p className='login_welcom-header'>Welcome to HungSchool</p>
                    <p className='login_welcom-description'>A place to help you manage your child's learning</p>
                </div>
                <div className='login_form register_form'>
                    <div>
                        <p className='login_header'>Sign up</p>
                        <div className='login_item'>
                            <label>Email</label>
                            <input ref={emailElement} type="email" name="email" className='input_email' placeholder='Enter Email'
                                onChange={() => {
                                    document.getElementsByClassName("email")[0].style.display = "none"
                                    emailElement.current.parentElement.getElementsByClassName("input_email")[0].style.borderBottom = "1px solid white";
                                }}
                            />
                            <span className="err_mesage email">Không được để trống</span>
                        </div>
                        <div className='login_item'>
                            <label>User Name</label>
                            <input ref={userNameElement} type="text" name="username" className='input_name' placeholder='Enter UserName'
                                onChange={() => {
                                    document.getElementsByClassName("username")[0].style.display = "none"
                                    userNameElement.current.parentElement.getElementsByClassName("input_name")[0].style.borderBottom = "1px solid white";
                                }}
                            />
                            <span className="err_mesage username">Không được để trống</span>
                        </div>
                        <div className='login_item'>
                            <label>Password</label>
                            <input ref={passwordElement} type="password" name="password" className='input_password' placeholder='Enter Password'
                                onChange={() => {
                                    document.getElementsByClassName("password")[0].style.display = "none"
                                    passwordElement.current.parentElement.getElementsByClassName("input_password")[0].style.borderBottom = "1px solid white";
                                }}
                            />
                            <span className="err_mesage password">Không được để trống</span>
                        </div>

                        <div className='login_item'>
                            <label>Student code:</label>
                            <input ref={codeElement} type="text" name="studentcode" className='input_code' placeholder='Enter StudentCode'
                                onChange={() => {
                                    document.getElementsByClassName("studentcode")[0].style.display = "none"
                                    codeElement.current.parentElement.getElementsByClassName("input_code")[0].style.borderBottom = "1px solid white";
                                }}
                            />
                            <span className="err_mesage studentcode">Không được để trống</span>
                        </div>

                        <div className='login_gender'>
                            <input type="radio" className='gender_input' id='male'
                                checked={gender === "male"}
                                onChange={() => setGender("male")}
                            />
                            <label htmlFor='male'>Male</label>
                            <input type="radio" className='gender_input' id='female'
                                checked={gender === "female"}
                                onChange={() => setGender("female")}
                            />
                            <label htmlFor='female'>Female</label>

                        </div>
                        <span className="err_mesage gender" style={{ marginLeft: "40px" }}>Không được để trống</span>

                        <span style={{ paddingLeft: "40px" }} className="err_mesage role">Chưa chọn quyền</span>
                        <button onClick={handleClickSingUp} className='login_btn'>Sign up</button>
                    </div>
                    <p className='register_link'>
                        you have an account:
                        <Link to='/signin'>sign in now</Link>
                    </p>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
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

export default Register;