import NavBar from "./components/NavBar/NavBar";
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import About from './components/About/About';
import style from './App.module.css'

function App() {
  return (
    <div>
      <NavBar />
      <div class={style.titleContainer}>Organizador Maconha FC</div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
