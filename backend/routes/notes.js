const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes')
const fetchUser = require('../middleware/fetchUser')

router.post('/addnote', fetchUser, [
      body('title', 'Enter a valid title'),
      body('description', 'Enter a valid description')
   ],

   async (req, res) => {
      try {
         const errors = validationResult(req);
         if (!errors.isEmpty())
            return res.status(400).json( {errors: errors.array()} );
   
         const { title, description, tag } = req.body
         const note = new Notes({ title, description, tag, user: req.user.id })
         const savedNote = await note.save()
   
         res.json(savedNote)
      }
      catch (error) {
         console.error(error.message)
         res.status(500).send('Internal server error')
      }
   }
)

router.get('/fetchnotes', fetchUser, async (req, res) => {
   try {
      const notes = await Notes.find({user: req.user.id})
      res.send(notes)
   }
   catch (error) {
      console.error(error.message)
      res.status(500).send('Internal server error')
   }
})

router.put('/updatenote/:id', fetchUser, async (req, res) => {
   try {
      // Check whether the note to be updated is present or not
      let note = await Notes.findById(req.params.id)
      if(!note)
         return res.status(404).send('Note not found')
      
      // Check whether the user who is updating the note is the onwer of it or not
      if(note.user.toString() !== req.user.id)
         return res.status(401).send('Unauthorized access')

      // If the user is authorized & note is present, then update note
      const { title, description, tag } = req.body
      const newNote = {};

      if(title)
         newNote.title = title
      if(description)
         newNote.description = description
      if(tag)
         newNote.tag = tag

      note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
      res.json({note})    
   }
   catch (error) {
      console.error(error.message)
      res.status(500).send('Internal server error')
   }
})

router.delete('/deletenote/:id', fetchUser, async (req, res) => {
   try {
      // Check whether the note to be deleted is present or not
      let note = await Notes.findById(req.params.id)
      if(!note)
         return res.status(404).send('Note not found')
      
      // Check whether the user who is deleting the note is the onwer of it or not
      if(note.user.toString() !== req.user.id)
         return res.status(401).send('Unauthorized access')

      // If the user is authorized & note is present, then delete note
      note = await Notes.findByIdAndDelete(req.params.id)
      res.json({'Success': 'Note has been deleted'})   
   }
   catch (error) {
      console.error(error.message)
      res.status(500).send('Internal server error')
   } 
})

module.exports = router;