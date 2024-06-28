import express from 'express';
import { getNotes, addNote, editNote, removeNote } from '../presistence.js'
import { v4 } from "uuid";

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
const newId = v4();

router.get("/", (req, res) => {
  const notes = getNotes();
  res.send(notes);
})

router.get("/:id", (req, res) => {
  let notes = getNotes();
  notes = notes.filter((note) => note.id === req.params.id);
  res.send(notes);
})

router.post('/', (req, res) => {
  const newNote = {
    id: v4(),
    text: req.body.noteText
  }
  addNote(newNote);
  res.status(200).send();
});

router.put('/:id', (req, res) => {
  editNote(req.params.id, req.body);
  res.status(200).send();
})

router.delete('/:id', (req, res)=> {
  removeNote(req.params.id);
  res.status(200).send();
});

export default router;