import React, { useContext } from "react";
import NoteContext from "../context/noteContext";
import './styles/NoteDisplay.css'
import loadingIcon2 from './loader/load2.gif'


const NoteDisplay = () => {
    //handling contentEditable error
    console.error = (function (_error) {
        return function (message) {
            if (typeof message !== 'string' || message.indexOf('component is `contentEditable`') === -1) {
                _error.apply(console, arguments)
            }
        }
    })(console.error)

    const context = useContext(NoteContext)
    const { displayingNote, setDisplayPageStatus, deleteNote, updateNote, loading2, setLoading2 } = context

    const handleBlur = (e) => {
        let title = document.getElementById('title').innerHTML
        let description = document.getElementById('description').innerHTML
        let tag = document.getElementById('tag').innerHTML

        updateNote(displayingNote._id, title.toString(), description.toString(), tag.toString())
    }

    const handleDelete = () => {
        if (displayingNote.date !== 'idk when') {

            setLoading2(true)
            deleteNote(displayingNote._id)
        }
    }

    const handleWarning = () => {
        setDisplayPageStatus({
            "status": "success",
            "msg": "Do not add extra spaces while editing. \n Click on save icon to save your edit."
        })
    }
    return (
        <>
            {loading2 &&
                <div className='load'>
                    <img src={loadingIcon2} alt="loading" />
                </div>}
            <div className="flex-box">
                <div className="note-box"  >
                    <div className="top-bar">
                        <div className="note-title" contentEditable={true} onClick={handleWarning}><h1 id="title">{displayingNote.title}</h1></div>
                        <div className="buttons">
                            <button className="del-btn" onClick={handleBlur}><i className="fa-solid fa-floppy-disk fa-xl"></i></button>
                            <button className="del-btn" onClick={handleDelete}><i className="fa-solid fa-trash fa-xl"></i></button>
                        </div>
                    </div>
                    <div id="description" name="desc" className="note-description" contentEditable={true} onClick={handleWarning}>{displayingNote.description}</div>
                    <div className="date-tag">
                        <div className="tag-s" contentEditable={true} onClick={handleWarning}>Tag : <span className="tag" id="tag">{displayingNote.tag}</span></div>
                        <div className="date-s">Created on : <span className="date">{displayingNote.date}</span></div>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </>
    )
}

export default NoteDisplay
