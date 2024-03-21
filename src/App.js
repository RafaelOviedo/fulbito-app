import NavBar from "./components/NavBar/NavBar";
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import About from './components/About/About';
import style from './App.module.css'
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [currentMatchId, setCurrentMatchId] = useState(null);

  const getCurrentMatchId = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_PROD_API}/matches`);
      const currentMatchId = response.data[response.data.length - 1]?._id;
      setCurrentMatchId(currentMatchId);
    } 
    catch (error) {
      throw new Error(error);
    }
  }

  const createNewMatch = async (matchId) => {
    if(!matchId) { return; };

    try {
      await axios.delete(`${process.env.REACT_APP_PROD_API}/matches/${matchId}`);
    } 
    catch (error) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    getCurrentMatchId();
  }, [])

  return (
    <div className={style.appContainer}>
      <NavBar />
      <div class={style.titleContainer}>Organizador para los pibes del futbol</div>
      <button onClick={() => createNewMatch(currentMatchId)} className={style.createNewMatchButton} disabled={!currentMatchId} style={!currentMatchId ? { opacity: 0.5 } : {} }>+ Crear Nueva Partida</button>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
