import { useNavigate } from 'react-router-dom';
import { SiGoogleclassroom } from 'react-icons/si'
import { useEffect, useState } from 'react';
import axios from 'axios';
import './ComponentScoreYear.css'


function ComponentScoreYear() {

    const navigate = useNavigate();
    const [clasz, setClasz] = useState([]);
    const [studentClass, setStudentClass] = useState([]);
    const [account, setAccount] = useState({});
    let years = [];

    const accountId = localStorage.getItem("accountId");
    const studentId = localStorage.getItem("studentId")

    useEffect(() => {
        axios.get(`http://localhost:8080/user/${accountId}`)
            .then(res => setAccount(res.data))
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8080/studentclass/${studentId}`)
            .then(res => {
                setStudentClass(res.data.sort(compare));
            })
    }, [])

    useEffect(() => {
        if (studentClass !== undefined) {
            studentClass.forEach(element => {
                axios.get(`http://localhost:8080/class/${element.classId}`)
                    .then(res => {
                        setClasz(prev => [...prev, res.data])
                    })
            })
        }
    }, [studentClass])

    if (studentClass !== undefined) {
        studentClass.map((item) => {
            years = [...years, item.year]
        })
    }

    function compare(a, b) {
        var yearA = a.year;
        var yearB = b.year;

        let comparison = 0;
        if (yearA < yearB) {
            comparison = -1;
        } else if (yearA > yearB) {
            comparison = 1;
        }
        return comparison;
    }

    function handleClickClass(id, name) {
        const sc = studentClass.find(item => {
            return item.classId == id;
        })
        localStorage.setItem("classId", id);
        localStorage.setItem("className", name);
        localStorage.setItem("year", sc.year);
        navigate('/comscore/subject')
    }



    return (
        <div>
            <div className='component_score-year-header'>
                Khóa : {years[0]} - {years[2]}
            </div>
            <div className='component_score-year'>
                {clasz.map((item) => {
                    return (
                        <div onClick={() => handleClickClass(item.id, item.name)} key={item.id} className='component_score-year-item'>
                            <SiGoogleclassroom className='calendar-icon' />
                            <p>{item.name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ComponentScoreYear;