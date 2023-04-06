import React, { useContext } from "react";
import NoteList from "./NoteList";
import './styles/NoteList.css'
import './styles/NoteDisplay.css'
import NoteDisplay from './NoteDisplay'
import NoteAdd from "./NoteAdd";
import NoteContext from "../context/noteContext";

const NotePage = () => {
    const context = useContext(NoteContext)
    const { toDisplay, displayPageStatus ,activeClass, setActiveClass} = context

    // adding remove ACTIVE class from the notelist on btn press in mobile view 
    const handleListSize = () => {
        if (activeClass === 'active') {
            setActiveClass('')
        } else {
            setActiveClass('active')
        }
    }

    return (
        <>
            <div className="page">
                <NoteList/>
                <div className="box">
                    <div className="ham-div">
                        <button className="ham-icon" id="ham-icon" onClick={handleListSize}>
                            <i className="fa-solid fa-note-sticky fa-2xl"></i>
                        </button>
                    </div>
                    <div className={`res resDisplay ${displayPageStatus.status}`}>
                        <div className="msg">
                            {displayPageStatus.msg}
                        </div>
                    </div>
                    {toDisplay ? <NoteAdd /> : <NoteDisplay />}
                </div>
            </div>
        </>
    )
}

export default NotePage
