import { IoHome } from 'react-icons/io5'
import { useEffect, useState } from 'react';
import { BsInfoCircleFill, BsFillPencilFill, BsChatLeftTextFill } from 'react-icons/bs'
import { RiLogoutBoxRFill } from 'react-icons/ri'
import { useNavigate, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import axios from 'axios';
import './HomePage.css';
import logo from '../../../Asset/Image/Logo.jpg'
import avatar from '../../../Asset/Image/avatar.png'



function HomePageTeacher(props) {


    const navigate = useNavigate()
    const accountId = JSON.parse(localStorage.getItem("accountId"));
    const [teacher, setTeacher] = useState({});
    const [school, setSchool] = useState({})
    const navActive = props.navActive;
    const navElement = [
        { name: "Trang chủ", icon: IoHome, path: "home" },
        { name: "Thông tin tài khoản", icon: BsInfoCircleFill, path: "infomation" },
        { name: "Quản lý điểm", icon: BsFillPencilFill, path: "comscore" },
        { name: "Trao đổi với phụ huynh", icon: BsChatLeftTextFill, path: "chat" }
    ]

    useEffect(() => {
        axios.get(`http://localhost:8080/teacher/${accountId}`)
            .then(res => setTeacher(res.data))
    }, [props.number])

    useEffect(() => {
        if (teacher.schoolId != undefined) {
            axios.get(`http://localhost:8080/school/${teacher.schoolId}`)
                .then(res => setSchool(res.data))
        }
    }, [teacher])


    function handleClickNavItem(navItemName, path) {
        props.setNavItem(navItemName)
        navigate("/teacher/" + path)
    }

    function handleClickLogout() {
        var isSignout = window.confirm("Bạn chắc chăn muốn đăng xuất");
        if (isSignout) {
            navigate("/singin")
        }
    }

    window.onload = () => {
        navigate("/teacher")
    }

    return (
        <div className='homepage'>
            <div className='homepage_header'>
                <div className='homepage_logo'>
                    <img src={logo} />
                    <p>{school.name}</p>
                </div>
                <div className='homepage_account'>
                    <img src={avatar} />
                    <p className='homepage_account-name'>{teacher.teacherName}</p>
                    <div onClick={handleClickLogout} className='homepage_account-logout'>
                        Logout
                        <RiLogoutBoxRFill className='homepage_account-logout-icon' />
                    </div>
                </div>
            </div>
            <div className='hpbody'>
                <div className='homepage_body'>
                    <div className='homepage_navbar'>
                        <ul className='homepage_list'>
                            {navElement.map(element => {
                                return (
                                    <li
                                        key={element.name}
                                        className={element.name === navActive ? 'homepage_item active' : 'homepage_item'}
                                        onClick={() => handleClickNavItem(element.name, element.path)}
                                    >
                                        < element.icon className='homepage_item-icon' />
                                        {element.name}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className='homepage_content'>
                        {props.compo}
                    </div>
                </div>
            </div>
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        account: state.account,
        navActive: state.navActive
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setNavItem: (navItem) => dispatch({ type: "SET_NAV", payload: navItem })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePageTeacher);