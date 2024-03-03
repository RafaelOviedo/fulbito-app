import style from './PlayersList.module.css'

function PlayersList() {
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
          <div className={style.playerRow}>
            <div className={style.playerColumn}>Jugador 1</div>
            <div className={style.playerColumn}>No</div>
            <div className={style.playerColumn}>Agregar comprobante</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayersList;