import './ChatWithTeacher.css'
import { FcSearch } from 'react-icons/fc'
import avatarmale from '../../Asset/Image/avatar.png'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ChatWithTeacher(props) {

    const navigate = useNavigate()
    const [message, setMessage] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const userId = localStorage.getItem("accountId");
    let listAccountId = []

    useEffect(() => {
        axios.get(`http://localhost:8080/message/user/${userId}`)
            .then(res => setMessage(res.data))
    }, [])

    message.forEach(element => {
        if (!listAccountId.includes(element.toAccount)) {
            listAccountId = [...listAccountId, element.toAccount];
        }
    })

    useEffect(() => {
        if (listAccountId != undefined) {
            listAccountId.forEach(element => {
                axios.get(`http://localhost:8080/teacher/${element}`)
                    .then(res => {
                        setTeachers(prev => [...prev, res.data])
                    })
            })
        }
    }, [message])


    function handleClickAvatarTeacher(id) {
        localStorage.setItem("teacherId", id);
        props.setNumber(prev => prev + 1);
    }

    return (
        <div className='chat_teacher'>
            <div className='chat_teacher-input_box'>
                <input type='text' name='teachername' placeholder='Nhập tên giáo viên' />
                <FcSearch className='chat_teacher-input_icon' />
            </div>
            <div className='chat_teacher-body'>
                {teachers && teachers.map(item => {
                    return (
                        <div key={item.id} onClick={() => handleClickAvatarTeacher(item.id)} className='chat_teacher-item'>
                            <img src={avatarmale} />
                            <p>{item.teacherName}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


export default ChatWithTeacher