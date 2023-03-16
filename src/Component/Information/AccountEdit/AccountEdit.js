import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function AccountEdit(props) {

    const navigate = useNavigate();

    const accountId = JSON.parse(localStorage.getItem("accountId"));
    const [account, setAccount] = useState({});
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")
    const [listAccount, setListAccount] = useState([])
    const [isShowMinus, setIsShowMinus] = useState(false)
    const [listStudent, setListStudent] = useState([])
    const [number, setNumber] = useState(0)
    // const [studentFind, setStudentFind] = useState({})
    const code = useRef();
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/;

    useEffect(() => {
        axios.get(`http://localhost:8080/user/${accountId}`)
            .then(res => setAccount(res.data))
    }, [number])

    useEffect(() => {
        axios.get(`http://localhost:8080/user`)
            .then(res => {
                setListAccount(res.data.filter((e) => {
                    return e.id !== accountId
                }));
            })
    }, [account])


    useEffect(() => {
        if (account.userName != undefined && account.password != undefined) {
            setUserName(account.userName)
            setPassword(account.password)
            setRePassword(account.password)
        }
    }, [account])

    useEffect(() => {
        if (account.students != undefined) {
            setListStudent([])
            account.students.forEach(element => {
                axios.get(`http://localhost:8080/student/${element}`)
                    .then(res => {
                        setListStudent(prev => [...prev, res.data])
                    })
            })
        }
    }, [account])

    function handleClickUpdate() {
        let invalidName = false;
        if (userName === "") {
            document.getElementsByClassName("username")[0].style.display = "block";
            document.getElementsByClassName("username")[0].innerHTML = "Không được để trống!"
            document.getElementsByClassName("username")[0].parentElement.getElementsByTagName("input")[0].style.border = "1px solid red";
            return;
        }
        if (listAccount.length > 0) {
            listAccount.forEach(account => {
                if (account.userName === userName) {
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
        let newUser = {}
        if (gender !== "Chọn giới tính") {
            newUser = {
                userName: userName,
                email: account.email,
                password: password,
                schoolId: account.schoolId,
                gender: gender,
                defaultStudent: account.defaultStudent
            }
        }
        else {
            newUser = {
                userName: userName,
                email: account.email,
                password: password,
                schoolId: account.schoolId,
                gender: account.gender,
                defaultStudent: account.defaultStudent
            }
        }

        axios.put(`http://localhost:8080/user/${account.id}`, newUser);
        toast.success("Cập nhật thông tin thành công");
        setTimeout(() => {
            navigate("/infomation")
        }, 3000)
        props.setNumber(prev => prev + 1)

    }

    function handleClickAddStudent() {
        let stud;
        if (code.current.value === "") {
            document.getElementsByClassName('code')[0].style.display = 'block';
            document.getElementsByClassName('code')[0].innerHTML = "Không được để trống";
            document.getElementsByClassName("plus_student-box")[0].getElementsByTagName("input")[0].style.border = "1px solid red";
            return;
        }
        axios.get(`http://localhost:8080/student/code/${code.current.value}`)
            .then(res => {
                stud = res.data
            })
        setTimeout(() => {
            if (stud == undefined) {
                document.getElementsByClassName('code')[0].style.display = 'block';
                document.getElementsByClassName('code')[0].innerHTML = "Mã học sinh không đúng";
                document.getElementsByClassName("plus_student-box")[0].getElementsByTagName("input")[0].style.border = "1px solid red";
                return;
            }
            if (stud.userId != null) {
                document.getElementsByClassName('code')[0].style.display = 'block';
                document.getElementsByClassName('code')[0].innerHTML = "Đã tồn tại tài khoản quản lý học sinh này";
                document.getElementsByClassName("plus_student-box")[0].getElementsByTagName("input")[0].style.border = "1px solid red";
                return;
            }
            const newStudent = {
                name: stud.name,
                address: stud.address,
                birthDate: stud.birthDate,
                userId: accountId
            }

            axios.put(`http://localhost:8080/student/${stud.id}`, newStudent)
            toast.success("Thêm học sinh thành công")
            document.getElementsByClassName("plus_student-box")[0].getElementsByTagName("input")[0].value = ""
            setTimeout(() => {
                setNumber(number + 1)
            }, 1000)
        }, 100)

    }

    return (
        <div className="account_edit">
            <div className="account_edit-box">
                <p className="account_edit-header">Cập nhật tài khoản</p>
                <div className="account_edit-body">
                    <div className="account_edit-item">
                        <label>Email</label>
                        <input type='email' name="email"
                            value={account.email}
                            readOnly
                        />
                    </div>
                    <div className="account_edit-item">
                        <label>Tên tài khoản</label>
                        <input type='text' name="username"
                            onChange={(e) => {
                                setUserName(e.target.value)
                                document.getElementsByClassName("username")[0].style.display = "none";
                                document.getElementsByClassName("username")[0].parentElement.getElementsByTagName("input")[0].style.border = "1px solid #333";
                            }}
                            value={userName}
                        />
                        <span className="err_mesage username">Không được để trống</span>
                    </div>
                    <div className="account_edit-item">
                        <label>Giới tính</label>
                        <select>
                            <option disabled selected={account.gender || true}>Chọn giới tính</option>
                            <option selected={account.gender === "male" ? true : false} value="male">Male</option>
                            <option selected={account.gender === "female" ? true : false} value="female">Female</option>
                        </select>
                        <span className="err_mesage username">Không được để trống</span>
                    </div>
                    <div className="account_edit-item">
                        <label>Danh sách học sinh</label>
                        <div style={{ display: "flex" }}>
                            <select>
                                <option >Danh sách</option>
                                {listStudent.map(item => {
                                    return (
                                        <option key={item.name} disabled>{item.name}</option>
                                    )
                                })}
                            </select>
                            {isShowMinus ?
                                <AiOutlineMinus title="Hủy bỏ" onClick={() => setIsShowMinus(false)} className="plus_student-icon" /> :
                                <AiOutlinePlus title="Thêm học sinh" onClick={() => setIsShowMinus(true)} className="plus_student-icon" />
                            }
                        </div>
                        {isShowMinus ?
                            <>
                                <div className="plus_student-box">
                                    <input ref={code} type="text" placeholder="Nhập mã code học sinh"
                                        onChange={() => {
                                            document.getElementsByClassName('code')[0].style.display = 'none';
                                            document.getElementsByClassName("plus_student-box")[0].getElementsByTagName("input")[0].style.border = "1px solid #333";
                                        }}
                                    />
                                    <button onClick={handleClickAddStudent}>Thêm</button>
                                </div>
                                <span className="err_mesage code"></span>
                            </>
                            : <></>}
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

export default AccountEdit