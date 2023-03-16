import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import image from '../../Asset/Image/login.jpg';
import { type } from '@testing-library/user-event/dist/type';

function Login(props) {
    const navigate = useNavigate();

    const [listUser, setListUser] = useState([]);
    const [listTeacher, setListTeacher] = useState([]);
    const [role, setRole] = useState("");

    const userNameElement = useRef();
    const passwordElement = useRef();

    useEffect(() => {
        axios.get('http://localhost:8080/user')
            .then(res => setListUser(res.data));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/teacher')
            .then(res => setListTeacher(res.data));
    }, []);

    function handleClickSignIn() {
        const userName = userNameElement.current.value;
        const password = passwordElement.current.value;
        let isPass = false;

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
        if (role === "") {
            document.getElementsByClassName("role")[0].style.display = "block";
            document.getElementsByClassName("role")[0].innerHTML = "Chưa chọn quyền!"
            return;
        }
        if (role === "user") {
            listUser.forEach(account => {
                if (account.userName === userName && account.password === password) {
                    props.setAccount(account);
                    localStorage.setItem("accountId", JSON.stringify(account.id))
                    localStorage.setItem("studentId", JSON.stringify(account.defaultStudent))
                    isPass = true;
                }
            })
            if (isPass) {
                props.setNavItem("Trang chủ")
                document.getElementsByClassName("role")[0].style.display = "none";
                const toastId = toast.loading("Loading");
                localStorage.removeItem("className")
                localStorage.removeItem("teacherId")
                localStorage.removeItem("classId")
                localStorage.removeItem("subjectId")
                localStorage.removeItem("subjectName")
                localStorage.removeItem("year")
                setTimeout(() => {
                    toast.dismiss(toastId);
                    navigate("/home");
                }, 2000)
            }
            else {
                document.getElementsByClassName("role")[0].style.display = "block";
                document.getElementsByClassName("role")[0].innerHTML = "Tài khoản không đúng!"
            }
        }
        else if (role === "teacher") {
            listTeacher.forEach(account => {
                if (account.teacherName === userName && account.password === password) {
                    props.setAccount(account);
                    localStorage.setItem("accountId", JSON.stringify(account.id))
                    isPass = true;
                }
            })
            if (isPass) {
                props.setNavItem("Trang chủ")
                document.getElementsByClassName("role")[0].style.display = "none";
                const toastId = toast.loading("Loading");
                localStorage.removeItem("className")
                localStorage.removeItem("teacherId")
                localStorage.removeItem("classId")
                localStorage.removeItem("subjectId")
                localStorage.removeItem("subjectName")
                localStorage.removeItem("year")
                setTimeout(() => {
                    toast.dismiss(toastId);
                    navigate("/teacher/home");
                }, 2000)
            }
            else {
                document.getElementsByClassName("role")[0].style.display = "block";
                document.getElementsByClassName("role")[0].innerHTML = "Tài khoản không đúng!"
            }
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
                <div className='login_form'>
                    <p className='login_header'>Sign in</p>
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
                    <div className='login_role'>
                        <div>
                            <input type='radio'
                                checked={role === "user" ? true : false}
                                onChange={() => {
                                    setRole("user")
                                    document.getElementsByClassName("role")[0].style.display = "none";
                                }}
                                name='user' id='user' />
                            <label htmlFor='user' >User</label>
                        </div>
                        <div>
                            <input type='radio'
                                checked={role === "teacher" ? true : false}
                                onChange={() => {
                                    setRole("teacher")
                                    document.getElementsByClassName("role")[0].style.display = "none";
                                }}
                                name='teacher' id='teacher' />
                            <label htmlFor='teacher' >Teacher</label>
                        </div>
                    </div>
                    <span style={{ paddingLeft: "40px" }} className="err_mesage role">Chưa chọn quyền</span>
                    <button type='button' onClick={handleClickSignIn} className='login_btn'>Sign in</button>

                    <p className='register_link'>
                        you don't have an account:
                        <Link to='/signup'>sign up now</Link>
                    </p>
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

const mapStateToProps = (state) => {
    return {
        reduxData: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAccount: (account) => dispatch({ type: "SET_ACCOUNT", payload: account }),
        setNavItem: (navItem) => dispatch({ type: "SET_NAV", payload: navItem })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);