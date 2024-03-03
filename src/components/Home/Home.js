import GeneralInfo from '../GeneralInfo/GeneralInfo';
import style from './Home.module.css';

function Home() {
  return (
    <div className={style.homeContainer}>
      <GeneralInfo />
    </div>
  )
}

export default Home;