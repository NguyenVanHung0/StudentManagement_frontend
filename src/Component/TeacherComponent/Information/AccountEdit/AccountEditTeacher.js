import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function AccountEditTeacher(props) {

    const navigate = useNavigate();

    const accountId = JSON.parse(localStorage.getItem("accountId"));
    const [teacher, setTeacher] = useState({});
    const [teacherName, setTeachername] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")
    const [listTeacher, setListTeacher] = useState([])
    const [number, setNumber] = useState(0)
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/;

    useEffect(() => {
        axios.get(`http://localhost:8080/teacher/${accountId}`)
            .then(res => setTeacher(res.data))
    }, [number])

    useEffect(() => {
        axios.get(`http://localhost:8080/teacher`)
            .then(res => {
                setListTeacher(res.data.filter((e) => {
                    return e.id !== accountId
                }));
            })
    }, [teacher])


    useEffect(() => {
        if (teacher.teacherName != undefined && teacher.password != undefined) {
            setTeachername(teacher.teacherName)
            setPassword(teacher.password)
            setRePassword(teacher.password)
        }
    }, [teacher])

    function handleClickUpdate() {
        let invalidName = false;
        if (teacherName === "") {
            document.getElementsByClassName("username")[0].style.display = "block";
            document.getElementsByClassName("username")[0].innerHTML = "Không được để trống!"
            document.getElementsByClassName("username")[0].parentElement.getElementsByTagName("input")[0].style.border = "1px solid red";
            return;
        }
        if (listTeacher.length > 0) {
            listTeacher.forEach(account => {
                if (account.teacherName === teacherName) {
                    document.getElementsByClassName("username")[0].style.display = "block";
                    document.getElementsByClassName("username")[0].innerHTML = "Tên tài khoản đã tồn tại!"
                    document.getElementsByClassName("username")[0].parentElement.getElementsByTagName("input")[0].style.border = "1px solid red";
                    invalidName = true;
                }
            })
        }

        if (invalidName) {
            return;
        }
        if (password === "") {
            document.getElementsByClassName("password")[0].style.display = "block";
            document.getElementsByClassName("password")[0].innerHTML = "Không được để trống!"
            document.getElementsByClassName("password")[0].parentElement.getElementsByTagName("input")[0].style.border = "1px solid red";
            return;
        }
        if (!regex.test(password)) {
            document.getElementsByClassName("password")[0].style.display = "block";
            document.getElementsByClassName("password")[0].innerHTML = "Mật khẩu phải bao gồm cả chữ thường, chữ hoa, số và ký tự đặc biệt, ít nhất 8 ký tự!"
            document.getElementsByClassName("password")[0].parentElement.getElementsByTagName("input")[0].style.border = "1px solid red";
            return;
        }
        if (rePassword === "") {
            document.getElementsByClassName("repassword")[0].style.display = "block";
            document.getElementsByClassName("repassword")[0].innerHTML = "Không được để trống!"
            document.getElementsByClassName("repassword")[0].parentElement.getElementsByTagName("input")[0].style.border = "1px solid red";
            return;
        }
        if (password !== rePassword) {
            document.getElementsByClassName("repassword")[0].style.display = "block";
            document.getElementsByClassName("repassword")[0].innerHTML = "Mật khẩu và mật khẩu nhập lại không khớp!"
            document.getElementsByClassName("password")[0].parentElement.getElementsByTagName("input")[0].style.border = "1px solid red";
            document.getElementsByClassName("repassword")[0].parentElement.getElementsByTagName("input")[0].style.border = "1px solid red";
            return;
        }

        const gender = document.getElementsByClassName("account_edit-item")[2].getElementsByTagName("select")[0].value;
        let newTeacher = {}
        if (gender !== "Chọn giới tính") {
            newTeacher = {
                teacherName: teacherName,
                email: teacher.email,
                password: password,
                schoolId: teacher.schoolId,
                gender: gender
            }
        }
        else {
            newTeacher = {
                teacherName: teacherName,
                email: teacher.email,
                password: password,
                schoolId: teacher.schoolId,
                gender: teacher.gender
            }
        }

        axios.put(`http://localhost:8080/teacher/${teacher.id}`, newTeacher);
        toast.success("Cập nhật thông tin thành công");
        setTimeout(() => {
            navigate("/teacher/infomation")
        }, 3000)
        props.setNumber(prev => prev + 1)

    }
    return (
        <div className="account_edit">
            <div className="account_edit-box">
                <p className="account_edit-header">Cập nhật tài khoản</p>
                <div className="account_edit-body">
                    <div className="account_edit-item">
                        <label>Email</label>
                        <input type='email' name="email"
                            value={teacher.email}
                            readOnly
                        />
                    </div>
                    <div className="account_edit-item">
                        <label>Tên tài khoản</label>
                        <input type='text' name="username"
                            onChange={(e) => {
                                setTeachername(e.target.value)
                                document.getElementsByClassName("username")[0].style.display = "none";
                                document.getElementsByClassName("username")[0].parentElement.getElementsByTagName("input")[0].style.border = "1px solid #333";
                            }}
                            value={teacherName}
                        />
                        <span className="err_mesage username">Không được để trống</span>
                    </div>
                    <div className="account_edit-item">
                        <label>Giới tính</label>
                        <select>
                            <option disabled selected={teacher.gender || true}>Chọn giới tính</option>
                            <option selected={teacher.gender === "male" ? true : false} value="male">Male</option>
                            <option selected={teacher.gender === "female" ? true : false} value="female">Female</option>
                        </select>
                        <span className="err_mesage username">Không được để trống</span>
                    </div>
                    <div className="account_edit-item">
                        <label>Mật khẩu</label>
                        <input type='password' name="password"
                            onChange={(e) => {
                                setPassword(e.target.value)
                                document.getElementsByClassName("password")[0].style.display = "none";
                                document.getElementsByClassName("password")[0].parentElement.getElementsByTagName("input")[0].style.border = "1px solid #333";
                                document.getElementsByClassName("repassword")[0].parentElement.getElementsByTagName("input")[0].style.border = "1px solid #333";
                                document.getElementsByClassName("repassword")[0].style.display = "none";
                            }}
                            value={password}
                        />
                        <span className="err_mesage password">Không được để trống</span>
                    </div>
                    <div className="account_edit-item">
                        <label>Nhập lại mật khẩu</label>
                        <input type='password' name="repassword"
                            onChange={(e) => {
                                setRePassword(e.target.value)
                                document.getElementsByClassName("repassword")[0].style.display = "none";
                                document.getElementsByClassName("repassword")[0].parentElement.getElementsByTagName("input")[0].style.border = "1px solid #333";
                                document.getElementsByClassName("password")[0].parentElement.getElementsByTagName("input")[0].style.border = "1px solid #333";
                            }}
                            value={rePassword}
                        />
                        <span className="err_mesage repassword">Không được để trống</span>
                    </div>
                    <button className="update_btn" onClick={handleClickUpdate}>Cập nhật</button>
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

export default AccountEditTeacher