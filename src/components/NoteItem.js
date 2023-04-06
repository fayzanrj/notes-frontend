import React, { useContext } from "react";
import NoteContext from "../context/noteContext";
import './styles/NoteList.css'

function NoteItem(props) {

  const context = useContext(NoteContext)
  const { setDisplayingNote, setToDisplay , setActiveClass} = context

  const handleOnClick = ()=>{
    
        setActiveClass('')
        setToDisplay(false)
    setDisplayingNote({
      "title" : props.note.title,
      "description" : props.note.description,
      "date" : props.note.date,
      "tag" : props.note.tag,
      "_id" : props.note._id
    })
  }
  return (
    <>
      <div className="note-item" onClick={handleOnClick}>
        <div className="circles">
          <div className="circle red"></div>
          <div className="circle yellow"></div>
          <div className="circle green"></div>
        </div>
        <div className="tag-item">{props.note.tag}</div>
        <div className="title">{props.note.title}</div>
        <div className="description">{props.note.description}</div>
      </div>
    </>
  )
}

export default NoteItem;
