import GeneralInfo from '../GeneralInfo/GeneralInfo';
import PlayersList from '../PlayersList/PlayersList';
import style from './Home.module.css';

function Home() {
  return (
    <div className={style.homeContainer}>
      <GeneralInfo />
      <PlayersList />
    </div>
  )
}

export default Home;