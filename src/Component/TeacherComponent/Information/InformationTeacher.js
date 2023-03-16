import { useNavigate, Routes, Route } from 'react-router-dom';
import './Information.css';
import backgroundProfile from '../../../Asset/Image/background_profile.jpg';
import avatar from '../../../Asset/Image/avatar.png';

function InformationTeacher(props) {
    return (
        <div className='information'>
            <div className='information_header'>
                <div className='background'>
                    <img src={backgroundProfile} />
                </div>
                <div className='avatar'>
                    <img src={avatar} />
                </div>
            </div>
            <>
                {props.child}
            </>
        </div>
    )
}

export default InformationTeacher;