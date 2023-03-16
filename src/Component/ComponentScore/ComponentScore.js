import './ComponentScore.css'

function ComponentScore(props) {
    return (
        <div className='component_score'>
            <div className='component_score-header'>
                <p>Điểm thành phần</p>
            </div>
            <div className='component_score-body'>
                {props.child}
            </div>
        </div>
    )
}

export default ComponentScore;