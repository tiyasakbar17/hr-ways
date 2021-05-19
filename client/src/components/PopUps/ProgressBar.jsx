import React from 'react'
import { connect } from 'react-redux'

function ProgressBar({ PopUpState }) {
    return (
        <div className="loadingPage">
            <div className="loading progressObjContainer">
                <span className="progressObj">U</span>
                <span className="progressObj">P</span>
                <span className="progressObj">L</span>
                <span className="progressObj">O</span>
                <span className="progressObj">A</span>
                <span className="progressObj">D</span>
                <span className="progressObj">I</span>
                <span className="progressObj">N</span>
                <span className="progressObj">G</span>
            </div>
            <div className="progressContainer">
                <div className="onprogress" >{/* style={{ width: `${PopUpState.progress.percentage}%` }} */}
                    {/* <span className="progressText"><strong>{PopUpState.progress.percentage}%</strong></span> */}
                    <svg className="onprogress">
                        <circle cx="48%" cy="50%" r="100" className="progressCircle"></circle>
                        <circle cx="48%" cy="50%" r="100" className="progressCircle" style={{ strokeDashoffset: `calc(629 - (629*${PopUpState.progress.percentage})/100)` }}></circle>
                    </svg>
                    <div className="progressText" ><span>{PopUpState.progress.percentage}</span><span className="h4">%</span></div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        PopUpState: state.PopUp
    }
}

export default connect(mapStateToProps)(ProgressBar)
