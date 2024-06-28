import axios from 'axios'
import { useEffect, useState } from 'react';

function NoteList (props) {
  const [addingNewNote, setAddingNewNote] = useState(false);
  const [newNote, setNewNote] = useState("");

  const handleAddingNote = () => {
    setAddingNewNote(true)
  }

  const handleNewNoteContent = (e) => {
    setNewNote(e.target.value)
  }

  const handleNewNoteSubmit = async() => {
    // console.log(newNote)
    await axios.post('http://localhost:3000/notes', {noteText: newNote});
    setAddingNewNote(false);
    window.location.reload();
  }

  async function deleteHandler (props)  {
    await axios.delete(`http://localhost:3000/notes/${props}`);
    window.location.reload();
  }

  let notes = props.notes;
  notes = notes.map((note)=> {
    return <div key={note.id} className="note">
      {note.text}
      <button 
      type= "button"
      className="edit-btn"
      onClick={()=> props.editHandler(note.id)}
      > Edit</button>
      <button 
      type= "button"
      className="delete-btn"
      onClick={() => deleteHandler(note.id)}
      > Delete</button>
      {note.img? 
      <>
      <br />
        <a href={note.img[0].links.html}><img src={note.img[0].urls.small} /></a>
        <div>
          photo by {note.img[0].user.name}
        </div>
      </>:null}
    </div>});

  useEffect(()=> {
    setAddingNewNote(false);
  }, [])

  return (
    <>
    <h3>YANT</h3>
    <hr />
    {notes}
    <hr />
    {addingNewNote? 
    <>
      <input type="text" onChange={handleNewNoteContent}></input>
      <button onClick={handleNewNoteSubmit}>Add to notes</button>
    </>
    :
    <button onClick={handleAddingNote}>Add a new note</button>}
    
    </>
  )
}

export default NoteList;