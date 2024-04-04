import { useState } from 'react';
import GeneralInfo from '../GeneralInfo/GeneralInfo';
import PlayersList from '../PlayersList/PlayersList';
import style from './Home.module.css';

function Home({ currentMatchId, onGeneralInfoChange, onMatchTypeChange, matchTypeEndpoint }) {
  const [isFut8Match, setIsFut8Match] = useState(true);

  const setMatch8Option = () => {
    setIsFut8Match(true);
    handleMatchTypeChange(true);
  }
  const setMatch5Option = () => {
    setIsFut8Match(false);
    handleMatchTypeChange(false);
  }

  const handleMatchTypeChange = (data) => {
    onMatchTypeChange(data);
  };

  return (
    <div className={style.homeContainer}>
      <div className={style.toggleMatchTypeContainer}>
        <button onClick={setMatch8Option} className={style.matchTypeButton} style={ isFut8Match ? { borderBottom: '2px solid #000' } : {} }>Partida Fut 8</button>
        <button onClick={setMatch5Option} className={style.matchTypeButton} style={ !isFut8Match ? { borderBottom: '2px solid #000' } : {} }>Partida Fut 5</button>
      </div>

      {
        isFut8Match ? (
          <div className={style.match8Container}>
            <GeneralInfo key={`general-info-${currentMatchId}`} onGeneralInfoChange={onGeneralInfoChange} matchTypeEndpoint={matchTypeEndpoint} />
            <PlayersList key={`players-list-${currentMatchId}`} matchTypeEndpoint={matchTypeEndpoint} />
          </div>
        ) : (
          <div className={style.match5Container}>
            <GeneralInfo key={`general-info-${currentMatchId}-5`} onGeneralInfoChange={onGeneralInfoChange} matchTypeEndpoint={matchTypeEndpoint} />
            <PlayersList key={`players-list-${currentMatchId}-5`} matchTypeEndpoint={matchTypeEndpoint} />
          </div>
        )
      }
    </div>
  )
}

export default Home;