import style from './Home.module.css'
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function Home() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const selectLocation = (value) => {
    setSelectedLocation(value);
  }
  const selectDate = (value) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = value.$d.toLocaleDateString(undefined, options);

    setSelectedDate(formattedDate);
  }

  return (
    <div className={style.homeContainer}>
      <div className={style.generalInfoTitleContainer}>
        <h3>Informacion General</h3>
      </div>

      <div className={style.generalInfoContainer}>
        <div className={style.inputsContainer}>
          <div className={style.locationInputContainer}>
            <label className={style.locationInputLabel}>Lugar del partido:</label>
            <select onChange={e => selectLocation(e.target.value)} className={style.locationSelect}>
              <option value="">Elegi una sede</option>
              <option value="El Predio - Arregui 2485">El Predio - Arregui 2540</option>
              <option value="El Poli - Other Address">El Poli</option>
            </select>
          </div>

          <div className={style.dateInputContainer} disabled>
            <label className={style.dateInputLabel}>Dia del partido:</label>
            <DatePicker onChange={selectDate} value={selectedDate} slotProps={{ textField: { size: 'small' } }} />
          </div>
        </div>

        <div className={style.summaryContainer}>
          <span>Cancha Elegida: { selectedLocation }</span>
          <span>Fecha Elegida: { selectedDate }</span>
          <span><b>Alias para el pago:</b> Algun Alias</span>
        </div>
      </div>
    </div>
  )
}

export default Home;