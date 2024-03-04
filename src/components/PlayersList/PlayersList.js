import { useEffect, useState } from 'react';
import style from './PlayersList.module.css';
import axios from 'axios';

function PlayersList() {
  const [allPlayers, setAllPlayers] = useState(null);

  const getAllPlayers = async () => {
    const response = await axios.get('http://localhost:3001/matches');
    const currentPlayers = response.data[response.data.length - 1].players;
    console.log('CURRENT PLAYERS', currentPlayers);
    setAllPlayers(currentPlayers);
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
            <button className={style.playerConfirmButton}>&#10004;</button>
          </div>
        </div>

        <div className={style.listHeader}>
          <div className={style.listHeaderColumn}>Nombre</div>
          <div className={style.listHeaderColumn}>Pagó?</div>
          <div className={style.listHeaderColumn}>Comprobante</div>
        </div>

        <div className={style.playersListContainer}>
          {
            allPlayers && allPlayers.map((player) => (
              <div key={player._id} className={style.playerRow}>
                <div className={style.playerNameColumn}>{ player.name }</div>
                <div className={style.playerPaymentColumn}>{ player.payment ? 'Si' : 'No' }</div>
                <div className={style.playerVoucherColumn}>{ player.voucher ? 'Mostrar' : 'Subir' }</div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default PlayersList;