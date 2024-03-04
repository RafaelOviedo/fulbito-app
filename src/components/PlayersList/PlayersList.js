import { useEffect, useState } from 'react';
import style from './PlayersList.module.css';
import axios from 'axios';

function PlayersList() {
  const [newPlayer, setNewPlayer] = useState('');
  const [allPlayers, setAllPlayers] = useState(null);
  const [currentMatchId, setCurrentMatchId] = useState(null);

  const getAllPlayers = async () => {
    const response = await axios.get('http://localhost:3001/matches');
    const currentMatchPlayers = response.data[response.data.length - 1].players;
    const currentMatchId = response.data[response.data.length - 1]._id;
    setAllPlayers(currentMatchPlayers);
    setCurrentMatchId(currentMatchId);
  }

  const addPlayerToList = async (matchId) => {
    const response = await axios.post(`http://localhost:3001/matches/${matchId}`, {});
    const updatedMatch = response.data;
    console.log('DATA', updatedMatch);
  }

  useEffect(() => {
    getAllPlayers();
  }, [])

  return (
    <div className={style.playersListComponent}>
      <div className={style.listTitleContainer}>
        <h3>Lista</h3>
      </div>

      <div className={style.listContainer}>
        <div className={style.playerInputContainer}>
          <label className={style.playerInputLabel}>Agregar jugador:</label>
          <div className={style.inputAndButtonContainer}>
            <input className={style.playerInput} type='text' />
            <button onClick={() => addPlayerToList(currentMatchId)} className={style.playerConfirmButton}>&#10004;</button>
            <div className={style.playersLengthContainer}>
              <span className={style.playersLength}><b>{allPlayers?.length}</b>/20 agregados</span>
            </div>
          </div>
        </div>

        <div className={style.listHeader}>
          <div className={style.listNameHeader}>Nombre</div>
          <div className={style.listPaymentHeader}>Pagó?</div>
          <div className={style.listVoucherHeader}>Comprobante</div>
        </div>

        <div className={style.playersListContainer}>
          {
            allPlayers && allPlayers.map((player) => (
              <div key={player._id} className={style.playerRow}>
                <div className={style.playerNameColumn}>{ player.name }</div>
                <div className={style.playerPaymentColumn}>{ player.payment ? 'Si' : 'No' }</div>
                <div className={style.playerVoucherColumn}>{ player.voucher ? 'Mostrar Comprobante' : 'Subir Comprobante' }</div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default PlayersList;