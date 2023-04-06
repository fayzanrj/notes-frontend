import React, { useContext, useEffect } from "react";
import NoteContext from "../context/noteContext";
import NoteItem from "./NoteItem";
import './styles/NoteList.css'

function NoteList(props) {
    const context = useContext(NoteContext)
    const { notes , setToDisplay , setAuthToken  ,getNotes,setLoading, setUserDetails, activeClass ,setActiveClass} = context

    const handleNoteAdd = ()=>{
        setToDisplay(true)
        setActiveClass('')
    }

    const handleSignOut = ()=>{
        setAuthToken(null)
        sessionStorage.removeItem('authToken')
    }
    
    const fetching=async ()=>{
        await getNotes()
        setLoading(false)
      }
    useEffect(() => {
        fetching()
        setUserDetails(sessionStorage.getItem('name'))
        // eslint-disable-next-line
    }, [])
    

    return (
        <>
        <div className={`list ${activeClass}`} >
            <div className="user-name">
                {`${sessionStorage.getItem('name')}'s notes`}
            </div>
                <div className="btns">
                    <button className="add-btn btn" onClick={handleNoteAdd}><i className="fa-solid fa-file-circle-plus fa-2xl"></i></button>
                    <button className="sign-out btn" onClick={handleSignOut}><i className="fa-solid fa-right-from-bracket fa-2xl"></i></button>
                </div>
                <div className="inner-list">
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note}/>
                })}
                </div>
            </div>
        </>
    )
}

export default NoteList;
