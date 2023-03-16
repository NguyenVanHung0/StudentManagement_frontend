import { useNavigate } from 'react-router-dom';
import { BsFillCalendarCheckFill } from 'react-icons/bs'
import { useEffect, useState } from 'react';
import axios from 'axios';
import './ComponentScoreYear.css'


function ComponentScoreYearTeacher() {

    const navigate = useNavigate();
    const [teacherClass, setTeacherClass] = useState([]);
    const [teacher, setTeacher] = useState({});
    let years = [];

    const accountId = localStorage.getItem("accountId");

    useEffect(() => {
        axios.get(`http://localhost:8080/teacher/${accountId}`)
            .then(res => setTeacher(res.data))
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8080/classteacher/${accountId}`)
            .then(res => {
                setTeacherClass(res.data);
            })
    }, [])


    if (teacherClass !== undefined) {
        teacherClass.map((item) => {
            if (!years.includes(item.year)) {
                years = [...years, item.year]
            }
        })
    }

    // function compare(a, b) {
    //     var yearA = a.year;
    //     var yearB = b.year;

    //     let comparison = 0;
    //     if (yearA < yearB) {
    //         comparison = -1;
    //     } else if (yearA > yearB) {
    //         comparison = 1;
    //     }
    //     return comparison;
    // }

    function handleClickYear(year) {
        localStorage.setItem("year", year);
        navigate('/teacher/comscore/subject')
    }



    return (
        <div>
            {/* <div className='component_score-year-header'>
                Khóa : {years[0]} - {years[2]}
            </div> */}
            <div className='component_score-year'>
                {years.map((item) => {
                    return (
                        <div onClick={() => handleClickYear(item)} key={item} className='component_score-year-item'>
                            <BsFillCalendarCheckFill className='calendar-icon' />
                            <p>{item}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ComponentScoreYearTeacher;