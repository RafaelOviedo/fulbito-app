import GeneralInfo from '../GeneralInfo/GeneralInfo';
import PlayersList from '../PlayersList/PlayersList';
import style from './Home.module.css';

function Home({ currentMatchId, onGeneralInfoChange }) {
  return (
    <div className={style.homeContainer}>
      <GeneralInfo key={`general-info-${currentMatchId}`} onGeneralInfoChange={onGeneralInfoChange} />
      <PlayersList key={`players-list-${currentMatchId}`} />
    </div>
  )
}

export default Home;