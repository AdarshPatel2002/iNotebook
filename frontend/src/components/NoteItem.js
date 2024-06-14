import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'

const NoteItem = (props) => {
   const context = useContext(NoteContext)
   const { deleteNote } = context
   const { note, editNote } = props

   return (
      <div className='col-md-4'>
         <div className="card my-2">
            <div className="card-body">
               <div className="title d-flex">
                  <h5 className="card-title">{note.title}</h5>
                  <i className="fa-solid fa-pen-to-square mx-1 align-item-right" onClick={() => editNote(note)}></i>
                  <i className='fa-regular fa-trash-can mx-1 align-item-right' onClick={() => { deleteNote(note._id); props.showAlert('Note deleted successfully', 'success') }}></i>
               </div>
               <p className="card-text">{note.description}</p>
            </div>
         </div>
      </div>
   )
}

export default NoteItem
