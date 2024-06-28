import { useEffect, useState } from "react";
import axios from "axios";
function Note () {
  const [note, setNote] = useState({});
  const [noteID, setNoteID] = useState(0);
  const [newNote, setNewNote] = useState()
  const [img, setImg] = useState(null);

  const taskInput = (e) => {
    setNewNote(e.target.value);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (img) {
      await axios.put(`http://localhost:3000/notes/${noteID}`, {
      text: newNote,
      img:[{
        urls: {small: [img[0].urls.small]},
        user: {name: img[0].user.name},
        links: {html: img[0].links.html}
      }]});
    } else {
      await axios.put(`http://localhost:3000/notes/${noteID}`, {
      text: newNote,
      img: null});
    }
    window.location.replace("http://localhost:5173/")
  }

  const generatingImage = async (e) => {
    e.preventDefault();
    let result = await axios.get("http://localhost:3000/unsplashimg/"+newNote)
    result = result.data.response.results;
    if(result.length === 1){
      setImg(result);
    } else {
      setImg(null)
    }
  }

  useEffect(() => {
    const url = window.location.toString();
    let id;
    let lastSlash = url.lastIndexOf('/')
    id = url.slice(lastSlash+1)
    setNoteID(id);

    (async() => {
      let result = await axios.get(`http://localhost:3000/notes/${id}`);
      result = result.data;
      setNote(result[0])
      setNewNote(result[0].text)
      if (result[0].img){
        setImg(result[0].img)
      }
    })()
  }, [])

  return (
    <>
    <h3>note id: {note.id}</h3>
    <hr />
    <form>
      <label>
        Task:
        <input type="text" name="taskName" id={noteID} defaultValue={note.text} onChange={taskInput}/>
      </label>
      <button onClick={generatingImage}>Generate an image</button>
      <button type="submit" onClick={handleSubmit}>Save</button>
      {img? <>
        <a href={img[0].links.html}>
          <img src={img[0].urls.small} />
        </a>
        <div>
          photo by {img[0].user.name}
        </div>
      </>:
        <div>Image not found</div>}
      
    </form>
    </>
  )
}

export default Note;