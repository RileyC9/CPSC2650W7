import { useEffect, useState } from 'react'
import {createBrowserRouter, Outlet, RouterProvider, Route, Routes, createRoutesFromElements} from "react-router-dom"
import axios from 'axios';
import Navbar from './component/Navbar.jsx';
import NoteList from './pages/NoteList.jsx';
import About from './pages/About.jsx';
import Note from './pages/Note.jsx';
import './App.css'



function App() {
  // useState Hooks
  const [notes, setNote] = useState([]);
  const [noteID, setNoteID] = useState(-1);

  const editHandler = (id) => {
    setNoteID(id);
    console.log(id);
    // window.location.reload();
    // window.location.assign(`http://localhost:5173/note/${id}`)
    window.location.replace(`http://localhost:5173/note/${id}`)
  }

  // Load notes from server on first rendering and store in note useState Hook
  useEffect(() => {
    let result;
    (async() => {
      result = await axios.get("http://localhost:3000/notes/");
      setNote(result.data);
    })()
  }, []);
  useEffect(() => {

  }, [noteID])

  const router = createBrowserRouter(
  createRoutesFromElements (
    <>
      <Route element={
        <div className='grid grid-cols-20 grid-rows-20 h-screen gap-0'>
          <Navbar />
          <Outlet />
        </div>
        }>
        <Route path="/" element={<NoteList notes={notes} editHandler={editHandler}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/note/:id" element={<Note />} />
      </Route>
      </>
  )
)

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
