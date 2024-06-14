import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
import AddNote from './AddNote'
import NoteItem from './NoteItem'

const Notes = (props) => {
   const context = useContext(NoteContext)
   const { notes, getNotes, updateNote } = context
   const [note, setNote] = useState({ id: '', etitle: '', edescription: '', etag: 'default' })
   const ref = useRef(null)
   const refClose = useRef(null)

   useEffect(() => {
      getNotes()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   const editNote = (currentNote) => {
      ref.current.click()
      setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
   }

   const onChange = (e) => {
      setNote({ ...note, [e.target.name]: e.target.value })
   }

   const handleUpdateNote = (e) => {
      updateNote(note.id, note.etitle, note.edescription, note.etag)
      refClose.current.click()
      props.showAlert('Note updated successfully', 'success')
   }

   return (
      <>
         <AddNote showAlert={props.showAlert} />

         <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
         </button>

         <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
               <div className="modal-content">

                  <div className="modal-header">
                     <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>

                  <div className="modal-body">
                     <form>
                        <div className="mb-3">
                           <label htmlFor="etitle" className="form-label">Title</label>
                           <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={onChange} />
                        </div>

                        <div className="mb-3">
                           <label htmlFor="edescription" className="form-label">Description</label>
                           <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} />
                        </div>

                        <div className="mb-3">
                           <label htmlFor="etag" className="form-label">Tag</label>
                           <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                        </div>
                     </form>
                  </div>

                  <div className="modal-footer">
                     <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                     <button type="button" className="btn btn-primary" onClick={handleUpdateNote}>Update Note</button>
                  </div>

               </div>
            </div>
         </div>

         <div className="container row my-3">
            <h2>Your Notes</h2>
            {notes.length===0 && 'No notes to display'}

            {notes.map((note) => {
               return <NoteItem key={note._id} editNote={editNote} note={note} showAlert={props.showAlert} />
            })}
         </div>
      </>
   )
}

export default Notes
