import style from './GeneralInfo.module.css'
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function GeneralInfo() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [aliasValue, setAliasValue] = useState('');
  const [selectedAlias, setSelectedAlias] = useState('');

  const selectLocation = (value) => {
    setSelectedLocation(value);
  }
  const selectDate = (value) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = value.$d.toLocaleDateString(undefined, options);

    setSelectedDate(formattedDate);
  }
  const handleAliasChange = (value) => {
    setAliasValue(value);
  }
  const selectAlias = () => {
    setSelectedAlias(aliasValue);
    setAliasValue('');
  }

  return (
    <div className={style.generalInfoComponent}>
      <div className={style.generalInfoTitleContainer}>
        <h3>Informacion General</h3>
      </div>

      <div className={style.generalInfoContainer}>
        <div className={style.inputsContainer}>
          <div className={style.inputsRowOneContainer}>
            <div className={style.locationInputContainer}>
              <label className={style.locationInputLabel}>Lugar del partido:</label>
              <select onChange={e => selectLocation(e.target.value)} className={style.locationSelect}>
                <option value="">Elegi una sede</option>
                <option value="El Predio - Arregui 2485">El Predio - Arregui 2540</option>
                <option value="El Poli - Other Address">El Poli</option>
                <option value="Futbol Comu">Futbol Comu</option>
              </select>
            </div>

            <div className={style.dateInputContainer} disabled>
              <label className={style.dateInputLabel}>Dia del partido:</label>
              <DatePicker onChange={selectDate} value={selectedDate} slotProps={{ textField: { size: 'small' } }} />
            </div>
          </div>

          <div className={style.inputsRowTwoContainer}>
            <div className={style.paymentAliasInputContainer} disabled>
              <label className={style.paymentAliasInputLabel}>Alias para el pago:</label>
              <div className={style.inputAndButtonContainer}>
                <input onChange={e => handleAliasChange(e.target.value)} className={style.paymentAliasInput} value={aliasValue} type='text' />
                <button onClick={selectAlias} className={style.paymentAliasConfirmButton}>&#10004;</button>
              </div>
            </div>
          </div>
        </div>

        <div className={style.summaryContainer}>
          <span><b>Cancha Elegida:</b> { selectedLocation }</span>
          <span><b>Fecha Elegida:</b> { selectedDate }</span>
          <span><b>Alias para el pago:</b> { selectedAlias }</span>
        </div>
      </div>
    </div>
  )
}

export default GeneralInfo;