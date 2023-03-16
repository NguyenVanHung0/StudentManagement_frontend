import './Chat.css'
import ChatWithTeacher from '../ChatWithTeacher/ChatWithTeacher'
import backgroundProfile from '../../Asset/Image/background2.jpg'
import avatar from '../../Asset/Image/avatar.png'
import { IoMdSend } from 'react-icons/io'
import { AiFillLike } from 'react-icons/ai'
import { useActionData } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'

function Chat() {

    const teacherId = localStorage.key("teacherId") ? localStorage.getItem("teacherId") : ""
    const [teacher, setTeacher] = useState({})
    const [number, setNumber] = useState(0)
    const [userMessages, setUserMessages] = useState([])
    const [teacherMessages, setTeacherMessages] = useState([])
    const messageDetail = useRef();
    const userId = localStorage.getItem("accountId");

    useEffect(() => {
        axios.get(`http://localhost:8080/teacher/${teacherId}`)
            .then(res => setTeacher(res.data))
    }, [number])

    useEffect(() => {
        axios.get(`http://localhost:8080/message/user/${userId}`)
            .then(res => {
                const mes = res.data.filter(element => {
                    return element.toAccount == teacherId;
                })
                setUserMessages(mes);
            })
    }, [number])

    useEffect(() => {
        axios.get(`http://localhost:8080/message/teacher/${teacherId}`)
            .then(res => {
                const mes = res.data.filter(element => {
                    return element.toAccount == userId;
                })
                setTeacherMessages(mes);
            })
    }, [number])

    function compare(a, b) {
        var timeA = a.timeMessage;
        var timeB = b.timeMessage;

        let comparison = 0;
        if (timeA < timeB) {
            comparison = -1;
        } else if (timeA > timeB) {
            comparison = 1;
        }
        return comparison;
    }


    const message = userMessages.concat(teacherMessages).sort(compare);

    function handleClickSend() {
        if (messageDetail.current.value !== "") {

            const messagePost = {
                detail: messageDetail.current.value,
                userId: userId,
                toAccount: teacherId
            }
            axios.post("http://localhost:8080/message", messagePost)
            setTimeout(() => {
                setNumber(number + 1)
            }, 100)
            messageDetail.current.value = "";
        }
    }


    return (
        <div className='chat_container'>
            <div className='chat'>
                <div className='information_header chat_header'>
                    <img src={avatar} />
                    <p>{teacher.teacherName}</p>
                </div>
                <div className='chat_body'>
                    {message && message.map(item => {
                        return (
                            <div key={item.id} className={item.userId ? 'chat_body-item right-mes' : 'chat_body-item left-mes'}>{item.detail}</div>
                        )
                    })}

                    <div className='chat_input'>
                        <input ref={messageDetail} type='text' name='chatinput' placeholder='Enter Message' />
                        <IoMdSend className='chat_input-icon' onClick={handleClickSend} />
                        {/* <AiFillLike className='chat_input-icon' /> */}
                    </div>
                </div>
            </div>
            <ChatWithTeacher setNumber={setNumber} />
        </div>
    )
}

export default Chat;