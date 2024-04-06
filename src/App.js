import NavBar from "./components/NavBar/NavBar";
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home/Home';
import About from './components/About/About';
import style from './App.module.css'
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { ProgressSpinner } from 'primereact/progressspinner';

function App() {
  const route = useLocation();
  const [isGeneralInfoChanged, setIsGeneralInfoChanged] = useState(0);
  const [isMatch8Type, setIsMatch8Type] = useState(true);
  const [currentMatchId, setCurrentMatchId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changeGeneralInfo = (data) => {
    setIsGeneralInfoChanged(data);
    getCurrentMatchId();
  };

  const changeMatchType = (data) => {
    setIsMatch8Type(data);
    getCurrentMatchId();
  };

  const matchTypeEndpoint = useCallback(() => {
    return isMatch8Type ? 'matches_8' : 'matches_5';
  }, [isMatch8Type]);

  const getCurrentMatchId = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_PROD_API_FLO}/${matchTypeEndpoint()}`);
      const currentMatchId = response.data[response.data.length - 1]?._id;
      setCurrentMatchId(currentMatchId);
    } 
    catch (error) {
      throw new Error(error);
    }
  }, [matchTypeEndpoint]);

  const createNewMatch = useCallback(async (matchId) => {
    if(!matchId) { return; };

    setIsLoading(true);

    try {
      await axios.delete(`${process.env.REACT_APP_PROD_API_FLO}/${matchTypeEndpoint()}/${matchId}`);
      setCurrentMatchId(currentMatchId);
      getCurrentMatchId();
      setIsLoading(false);
      closeModal();
    } 
    catch (error) {
      throw new Error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchTypeEndpoint])

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const buttonStyle = {
    display: route.pathname === '/about' ? 'none' : '',
    opacity: !currentMatchId ? 0.5 : 1
  };

  useEffect(() => {
    getCurrentMatchId();
  }, [getCurrentMatchId, createNewMatch, isGeneralInfoChanged, isMatch8Type])

  return (
    <div className={style.appContainer}>
      <NavBar />
      <div class={style.titleContainer}>Organizador para los pibes del futbol</div>
      <button onClick={openModal} className={style.createNewMatchButton} disabled={!currentMatchId} style={buttonStyle}>{ isMatch8Type ? '+ Crear Nueva Partida Fut 8' : '+ Crear Nueva Partida Fut 5' }</button>
      <Routes>
        <Route path='/' element={<Home currentMatchId={currentMatchId} onGeneralInfoChange={changeGeneralInfo} onMatchTypeChange={changeMatchType} matchTypeEndpoint={matchTypeEndpoint} />} />
        <Route path='/about' element={<About />} />
      </Routes>

      {
        isModalOpen ? (
          <div className={style.createMatchModal}>
            <div className={style.closeModalButtonContainer}>
              <button className={style.closeModalButton} onClick={closeModal}>x</button>
            </div>

            <div className={style.modalContentContainer}>
              <div className={style.modalMessageContainer}>
                <p style={{ textAlign: 'center' }}>Si creas una nueva partida, se borrarán los datos anteriores</p>
                <b>¿Deseas continuar?</b>
              </div>  

              <div className={style.modalButtonsContainer}>
                <button className={style.cancelModalButton} onClick={closeModal}>Cancelar</button>
                <button className={style.createMatchModalButton} onClick={() => createNewMatch(currentMatchId)}>{ isLoading ? <ProgressSpinner style={{width: '30px', height: '30px'}} strokeWidth="4" /> : 'Crear Partida' }</button>
              </div>
            </div>
          </div>
        ) : ''
      }
    </div>
  );
}

export default App;
