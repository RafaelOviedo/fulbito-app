import style from './NavBar.module.css'
import { Link } from "react-router-dom";
import { useState } from 'react';

function NavBar() {
  const [isHomeSelected, setIsHomeSelected] = useState(true);
  const [isAboutSelected, setIsAboutSelected] = useState(false);

  const selectHome = () => {
    setIsHomeSelected(true);
    setIsAboutSelected(false);
  };
  const selectAbout = () => {
    setIsAboutSelected(true);
    setIsHomeSelected(false);
  };

  return (
    <nav className={style.navContainer}>
      <Link 
        to='/' 
        onClick={selectHome} 
        className={style.homeLink} 
        style={isHomeSelected ? { borderBottom: '2px solid #000' } : {}}
      >
      Home
      </Link>
      <Link 
        to='/about' 
        onClick={selectAbout}
        className={style.aboutLink} 
        style={isAboutSelected ? { borderBottom: '2px solid #000' } : {}}
      >
      About
      </Link>
    </nav>
  )
}

export default NavBar;