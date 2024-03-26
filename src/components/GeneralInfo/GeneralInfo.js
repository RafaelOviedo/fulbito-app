import axios from 'axios';
import style from './GeneralInfo.module.css';
import { useEffect, useState, useCallback } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ProgressSpinner } from 'primereact/progressspinner';

function GeneralInfo({ onGeneralInfoChange }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [aliasValue, setAliasValue] = useState('');
  const [selectedAlias, setSelectedAlias] = useState('');
  const [isDataStored, setIsDataStored] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInfoLoading, setIsInfoLoading] = useState(false);

  const handleGeneralInfoChange = (data) => {
    onGeneralInfoChange(data);
  };

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
  }

  const getCurrentMatch = useCallback(async () => {
    setIsInfoLoading(true);

    const response = await axios.get(`${process.env.REACT_APP_PROD_API_FLO}/matches`);
    const currentMatch = response.data[response.data.length - 1];
    setSelectedLocation(currentMatch?.location);
    setSelectedDate(currentMatch?.date);
    setSelectedAlias(currentMatch?.alias);

    if(currentMatch?.location && currentMatch?.date && currentMatch?.alias) {
      setIsDataStored(true);
    }

    setIsInfoLoading(false);
  }, [])

  const saveGeneralInfo = async () => {
    setIsLoading(true);

    const generalInfoData = {
      location: selectedLocation,
      date: selectedDate,
      alias: selectedAlias,
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_PROD_API_FLO}/matches`, generalInfoData);
      setIsDataStored(true);
      handleGeneralInfoChange(true);

      setIsLoading(false)

      return response;
    } 
    catch (error) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    getCurrentMatch();
  }, [getCurrentMatch])

  return (
    <div className={style.generalInfoComponent} style={ isDataStored ? { height: '20%' } : { height: '30%' }}>
      <div className={style.generalInfoTitleContainer}>
        <h3>Informacion General</h3>
      </div>

      <div className={style.generalInfoContainer}>
        {
          isInfoLoading ? (
            <ProgressSpinner style={{width: '50px', height: '50px', marginTop: '10px'}} strokeWidth="4" />
          ) : (
            <div className={style.inputsContainer} style={ isDataStored ? { display: 'none' } : { height: '100%' }}>
              <div className={style.inputsRowOneContainer}>
                <div className={style.locationInputContainer}>
                  <label className={style.locationInputLabel}>Lugar del partido:</label>
                  <select onChange={e => selectLocation(e.target.value)} className={style.locationSelect}>
                    <option value="">Elegi una sede</option>
                    <option value="El Predio - Arregui 2485">El Predio - Arregui 2540</option>
                    <option value="El Poli">El Poli</option>
                    <option value="Futbol Comu">Futbol Comu</option>
                  </select>
                </div>

                <div className={style.dateInputContainer} disabled>
                  <label className={style.dateInputLabel}>Día del partido:</label>
                  <DatePicker onChange={selectDate} slotProps={{ textField: { size: 'small' } }} />
                </div>
              </div>

              <div className={style.inputsRowTwoContainer}>
                <div className={style.paymentAliasInputContainer} disabled>
                  <label className={style.paymentAliasInputLabel}>Alias para el pago:</label>
                  <div className={style.inputAndButtonContainer}>
                    <input onChange={e => handleAliasChange(e.target.value)} onBlur={selectAlias} className={style.paymentAliasInput} value={aliasValue} type='text' />
                  </div>
                </div>
              </div>

              <div className={style.saveGeneralInfoButtonContainer}>
                <button onClick={saveGeneralInfo} className={style.saveGeneralInfoButton} style={!selectedLocation || !selectedDate || !selectedAlias ? { opacity: 0.5, pointerEvents: 'none' } : {}} disabled={!selectedLocation || !selectedDate || !selectedAlias}>{ isLoading ? <ProgressSpinner style={{width: '35px', height: '35px'}} strokeWidth="4" /> : 'Guardar Informacion General'}</button>
              </div>
            </div>
          )
        }

        <div className={style.summaryContainer} style={ !isDataStored ? { display: 'none' } : { height: '100%' }}>
          <span><b>Cancha Elegida:</b> { selectedLocation }</span>
          <span><b>Fecha Elegida:</b> { selectedDate }</span>
          <span><b>Alias para el pago:</b> { selectedAlias }</span>
        </div>
      </div>
    </div>
  )
}

export default GeneralInfo;