import { useState } from 'react'
import NoteContext from './NoteContext'

const NoteState = (props) => {
  const host = 'http://localhost:5000'
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  const getNotes = async () => {
    // Fetch API
    const response = await fetch(`${host}/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwMWE3ZDk5MzMwOWUwZmVhYjFiM2VmIn0sImlhdCI6MTcxMTQzNTAyN30._X9j37p32OMMpQAl3tY9gHo_bESCH147B4-1Fxg7Q4Y"
      }
    })

    const json = await response.json()
    setNotes(json)
  }

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwMWE3ZDk5MzMwOWUwZmVhYjFiM2VmIn0sImlhdCI6MTcxMTQzNTAyN30._X9j37p32OMMpQAl3tY9gHo_bESCH147B4-1Fxg7Q4Y"
      },
      body: JSON.stringify({ title, description, tag }),
    })

    const note = await response.json()
    setNotes(notes.concat(note))
  }

  const updateNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwMWE3ZDk5MzMwOWUwZmVhYjFiM2VmIn0sImlhdCI6MTcxMTQzNTAyN30._X9j37p32OMMpQAl3tY9gHo_bESCH147B4-1Fxg7Q4Y"
      },
      body: JSON.stringify({ title, description, tag }),
    })

    let newNotes = JSON.parse(JSON.stringify(notes))

    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i];

      if (element._id === id) {
        newNotes[i].title = title
        newNotes[i].description = description
        newNotes[i].tag = tag
        break
      }
    }

    setNotes(newNotes)
  }

  const deleteNote = async (id) => {
    const response = await fetch(`${host}/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwMWE3ZDk5MzMwOWUwZmVhYjFiM2VmIn0sImlhdCI6MTcxMTQzNTAyN30._X9j37p32OMMpQAl3tY9gHo_bESCH147B4-1Fxg7Q4Y"
      }
    })

    const newNotes = notes.filter((note) => note._id !== id)
    setNotes(newNotes)
  }

  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, updateNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
