// const { MongoClient } = require('mongodb');
let _notes = [
  { id: "2", text: "CPSC 2650", img:null },
  { id: "1", text: "An awesome web dev Note", img:null },
];

// TODO: implement addNote and removeNote

// class DataAccessLayer {
//   constructor () {
//     this.client = new MongoClient(process.env.MONGO_URL, { useUnifiedTopology: true });
//     this.db = null;
//   }
// }
const getNotes = () => {
  return _notes;
}

const addNote = (note) => {
  _notes.push({id:note.id, text:note.text, img:note.img})
}

const editNote = (noteId, updates) => {
  // console.log("server:" +noteId + updates.text)
  _notes.forEach(note => {
    if (note.id == noteId) {
      note.text = updates.text,
      note.img = updates.img
    }
  });
}

const removeNote = (noteId) => {
  _notes = _notes.filter((note) => note.id !== noteId);
}
// For fun: why do we export a function instead of notes directly?
const notes = () => _notes;

export { notes, getNotes, addNote, editNote, removeNote };