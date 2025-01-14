import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'

const AddNote = (props) => {
   const context = useContext(NoteContext)
   const { addNote } = context
   const [note, setNote] = useState({ title: '', description: '', tag: '' })

   const onChange = (e) => {
      setNote({ ...note, [e.target.name]: e.target.value })
   }

   const handleAddNote = (e) => {
      e.preventDefault()
      addNote(note.title, note.description, note.tag)
      setNote({ title: '', description: '', tag: '' })
      props.showAlert('Added successfully', 'success')
   }

   return (
      <div className="container my-3">
         <h2>Add Note</h2>

         <form>
            <div className="mb-3">
               <label htmlFor="title" className="form-label">Title</label>
               <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onChange} />
            </div>

            <div className="mb-3">
               <label htmlFor="description" className="form-label">Description</label>
               <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} />
            </div>

            <div className="mb-3">
               <label htmlFor="tag" className="form-label">Tag</label>
               <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
            </div>

            <button type="submit" className="btn btn-primary my-2" onClick={handleAddNote}>Add Note</button>
         </form>
      </div>
   )
}

export default AddNote
