import './ChatWithTeacher.css'
import { FcSearch } from 'react-icons/fc'
import avatarmale from '../../../Asset/Image/avatar.png'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ChatWithUser(props) {

    const navigate = useNavigate()
    const [message, setMessage] = useState([]);
    const [users, setUsers] = useState([]);
    const teacherId = localStorage.getItem("accountId");
    let listAccountId = []

    useEffect(() => {
        axios.get(`http://localhost:8080/message/teacher/${teacherId}`)
            .then(res => setMessage(res.data))
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8080/message/toaccount/${teacherId}`)
            .then(res => setMessage(message.concat(res.data)))
    }, [])


    useEffect(() => {
        message.forEach(element => {
            if (!listAccountId.includes(element.toAccount) && element.teacherId !== null) {
                listAccountId = [...listAccountId, element.toAccount];
            }
            else if (element.userId !== null && element.toAccount == teacherId && !listAccountId.includes(element.userId)) {
                listAccountId = [...listAccountId, element.userId];
            }
        })
    }, [message])


    useEffect(() => {
        if (listAccountId != undefined) {
            listAccountId.forEach(element => {
                axios.get(`http://localhost:8080/user/${element}`)
                    .then(res => {
                        setUsers(prev => [...prev, res.data])
                    })
            })
        }
    }, [message])


    function handleClickAvatarTeacher(id) {
        localStorage.setItem("userId", id);
        props.setNumber(prev => prev + 1);
    }

    return (
        <div className='chat_teacher'>
            <div className='chat_teacher-input_box'>
                <input type='text' name='teachername' placeholder='Nhập tên phụ huynh' />
                <FcSearch className='chat_teacher-input_icon' />
            </div>
            <div className='chat_teacher-body'>
                {users && users.map(item => {
                    return (
                        <div key={item.id} onClick={() => handleClickAvatarTeacher(item.id)} className='chat_teacher-item'>
                            <img src={avatarmale} />
                            <p>{item.userName}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


export default ChatWithUser