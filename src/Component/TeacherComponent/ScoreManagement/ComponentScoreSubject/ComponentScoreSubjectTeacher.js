import { useNavigate } from 'react-router-dom';
import './ComponentScoreSubject.css'
import { SiGoogleclassroom } from 'react-icons/si'
import { useEffect, useState } from 'react';
import axios from 'axios';

function ComponentScoreSubjectTeacher() {
    const navigate = useNavigate()

    const [classTeacher, setClassTeacher] = useState([])
    const [classId, setClassId] = useState([])
    const [clasz, setClasz] = useState([])

    const year = localStorage.getItem("year")
    const teacherId = localStorage.getItem("accountId")

    useEffect(() => {
        axios.get(`http://localhost:8080/classteacher/teacheryear?teacherid=${teacherId}&year=${year}`)
            .then(res => setClassTeacher(res.data))
    }, [])

    useEffect(() => {
        if (classTeacher != null) {
            classTeacher.forEach(element => {
                setClassId(prev => [...prev, element.classId])
            })
        }
    }, [classTeacher])

    useEffect(() => {
        if (classId != null) {
            classId.forEach(element => {
                axios.get(`http://localhost:8080/class/${element}`)
                    .then(res => setClasz(prev => [...prev, res.data]))
            })
        }
    }, [classId])

    function handleClickClass(classId, className) {
        localStorage.setItem("classId", classId)
        localStorage.setItem("className", className)
        navigate('/teacher/comscore/detail')
    }

    return (
        <div className='component_score-subject'>
            <div className='year-semester'>
                {year}
            </div>
            <div className='subject_body'>
                {clasz.map(item => {
                    return (
                        <div key={item.id} onClick={() => handleClickClass(item.id, item.name)} className='component_score-year-item'>
                            <SiGoogleclassroom className='calendar-icon' />
                            <p>{item.name}</p>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default ComponentScoreSubjectTeacher;