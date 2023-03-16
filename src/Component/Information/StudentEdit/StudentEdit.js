import { useState, useEffect } from "react"
import axios from "axios"

function StudentEdit() {

    const accountId = localStorage.getItem("accountId")
    const studentId = localStorage.getItem("studentId")
    const [account, setAccount] = useState({})
    const [listStudent, setListStudent] = useState([])
    const [student, setStudent] = useState({})
    const [number, setNumber] = useState(0)

    useEffect(() => {
        axios.get(`http://localhost:8080/user/${accountId}`)
            .then(res => setAccount(res.data))
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8080/student/${studentId}`)
            .then(res => setStudent(res.data))
    }, [studentId])

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

    function handleChangeStudent(e) {
        localStorage.setItem("studentId", e.target.value)
        const newUser = {
            userName: account.userName,
            email: account.email,
            password: account.password,
            schoolId: account.schoolId,
            gender: account.gender,
            defaultStudent: e.target.value
        }
        axios.put(`http://localhost:8080/user/${account.id}`, newUser);
        setNumber(number + 1)
    }

    return (
        <div className="account_edit">
            <div className="account_edit-box">
                <p className="account_edit-header">Cập nhật thông tin học sinh</p>
                <div className="account_edit-body">
                    <div className="account_edit-item">
                        <label>Tên trường</label>
                        <input type='text' name="school" readOnly value="Trường THPT Phạm Văn Nghị" />
                    </div>
                    <div className="account_edit-item">
                        <label>Địa chỉ</label>
                        <input type='text' name="address" readOnly value="Trung Cường, Yên Cường, Ý Yên, Nam Định" />
                    </div>
                    <div className="account_edit-item">
                        <label>Năm thành lập</label>
                        <input type='text' name="foundedyear" readOnly value="1995" />
                    </div>
                    <div className="account_edit-item">
                        <label>Chọn học sinh</label>
                        <select onChange={handleChangeStudent}>
                            {listStudent.map(item => {
                                return (
                                    <option value={item.id} key={item.id} selected={item.id == localStorage.getItem("studentId")}>{item.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="account_edit-item">
                        <label>Ngày sinh</label>
                        <input type='text' name="birthday" readOnly value={new Date(student.birthDate).toLocaleDateString()} />
                    </div>
                    <div className="account_edit-item">
                        <label>Địa chỉ</label>
                        <input type='text' name="studentaddress" readOnly value={student.address} />
                    </div>
                    <div className="account_edit-item">
                        <label>Giới tính</label>
                        <input type='text' name="gender" readOnly value={student.gender} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentEdit