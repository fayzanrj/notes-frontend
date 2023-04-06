import React, { useContext, useState } from 'react'
import './styles/NoteAdd.css'
import NoteContext from "../context/noteContext";

export default function NoteAdd() {

  const context = useContext(NoteContext)
  const { addNote, setToDisplay, setLoading2 } = context;

  const handleAddNote = (event) => {
    event.preventDefault()
    setLoading2(true)
    addNote(newNote.title, newNote.description, newNote.tag)
    document.getElementById('title').value = ""
    document.getElementById('description').value = ""
    document.getElementById('tag').value = ""
    setToDisplay(false)
  }
  const [newNote, setNewNote] = useState({
    "title": '-',
    "description": '-',
    "tag": '-',
  })
  const onChange = (e) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className="add-box ">
        <div className="inner-box-add">
          <form onSubmit={handleAddNote}>

            <label className='add-label' htmlFor="title">Title</label><br />
            <input className='add-input' type="text" name="title" id="title" onChange={onChange} placeholder="e.g. 'Assignment', 'Homework'"  /><br />
            <label className='add-label' htmlFor="description">Description</label><br />
            <textarea className='add-input desc' type="text" name="description" id="description" onChange={onChange} placeholder="e.g. 'Assignment is due Saturday'" required/><br />
            <label className='add-label' htmlFor="tag">Tag</label><br />
            <input className='add-input' type="text" name="tag" id="tag" onChange={onChange} placeholder="e.g. 'School', 'Work'" /><br />
            <button className="add-note">Add</button>
          </form>
        </div>
      </div>
    </>
  )
}
