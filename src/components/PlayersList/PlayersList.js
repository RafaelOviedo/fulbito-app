import { useEffect, useState, useRef } from 'react';
import style from './PlayersList.module.css';
import axios from 'axios';
import { Toast } from 'primereact/toast';

function PlayersList() {
  const [newPlayer, setNewPlayer] = useState('');
  const [allPlayers, setAllPlayers] = useState(null);
  const [currentMatchId, setCurrentMatchId] = useState(null);
  const [playerID, setPlayerID] = useState(null);
  const [player, setPlayer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const toast = useRef(null);

  const getAllPlayers = async () => {
    const response = await axios.get(`${process.env.REACT_APP_PROD_API}/matches`);
    const currentMatchPlayers = response.data[response.data.length - 1].players;
    const currentMatchId = response.data[response.data.length - 1]._id;
    setAllPlayers(currentMatchPlayers);
    setCurrentMatchId(currentMatchId);
  }

  const handleNewPlayerClick = (value) => {
    setNewPlayer(value)
  }

  const addPlayerToList = async (matchId) => {
    await axios.post(`${process.env.REACT_APP_PROD_API}/matches/${matchId}`, { name: newPlayer, payment: false, voucher: null });
    setNewPlayer('');
    getAllPlayers();
  }

  const deleteMatchPlayer = async (matchId, playerId) => {
    await axios.delete(`${process.env.REACT_APP_PROD_API}/matches/${matchId}/player/${playerId}`);
    getAllPlayers();
  }

  const openModal = (player) => {
    setPlayerID(player._id);
    setPlayer(player);
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
  }

  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const showToast = () => {
    toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
  };

  const uploadPlayerPhoto = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);

    await axios.patch(`${process.env.REACT_APP_PROD_API}/matches/${(currentMatchId)}/player/${playerID}`, formData, { headers: { 'Content-Type': 'multipart/form-data' }});
    showToast();
    getAllPlayers();
  }

  function getVoucherImage(bufferData) {
    const blob = new Blob([new Uint8Array(bufferData)], { type: 'image/jpeg' });
    return URL.createObjectURL(blob);
  }

  useEffect(() => {
    getAllPlayers();
  }, [])

  return (
    <div className={style.playersListComponent} style={ allPlayers?.length === 20 ? { cursor: 'not-allowed', opacity: 0.5 } : {} }>
      <div className={style.listTitleContainer}>
        <h3>Lista</h3>
      </div>

      <div className={style.listContainer}>
        <div className={style.playerInputContainer}>
          <label className={style.playerInputLabel}>Agregar jugador:</label>
          <div className={style.inputAndButtonContainer}>
            <input onChange={e => handleNewPlayerClick(e.target.value)} value={newPlayer} className={style.playerInput} type='text' />
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
          <div className={style.listActionHeader}>Acción</div>
        </div>

        <div className={style.playersListContainer} style={ allPlayers?.length === 20 ? { opacity: '0.5', background: 'lightgrey'} : {} }>
          {
            allPlayers && allPlayers.map((player) => (
              <div key={player._id} className={style.playerRow}>
                <div className={style.playerNameColumn}>{ player.name }</div>
                <div className={style.playerPaymentColumn}>{ player.payment ? 'Sí ✅' : 'No ❌' }</div>
                <button onClick={() => openModal(player)} className={style.playerVoucherColumn}>{ player.payment ? 'Mostrar' : 'Subir' }</button>
                <div className={style.playerActionColumn}>
                  <button 
                    onClick={() => deleteMatchPlayer(currentMatchId, player._id)} 
                    className={style.deletePlayerButton} 
                    disabled={player.payment} 
                    style={ player.payment ? { opacity: 0.5 } : {} }>x</button>
                </div>
              </div>
            ))
          }
        </div>

        {
          isModalOpen ?
            <div className={style.uploadShowPhotoModal}>
              <div className={style.closeModalButtonContainer}>
                <button className={style.closeModalButton} onClick={closeModal}>x</button>
              </div>
              
              <div className={style.modalContentContainer}>
                <Toast ref={toast} />

                { !player.payment ?
                  <form onSubmit={uploadPlayerPhoto} className={style.formContainer}>
                    <input id='image' type="file" onChange={handleImageChange} name='image' accept='image/*' className={style.uploadVoucherInput} placeholder='hehfjeh' />
                    <button type='submit' className={style.uploadButton}>Subir Comprobante</button>
                  </form> 
                  :
                  <div className={style.voucherImageContainer}>
                    <span>Comprobante de { player.name }</span>
                    <img className={style.voucherImage} src={getVoucherImage(player.voucher?.data)} alt="voucher" />
                  </div>
                }
              </div>
            </div> 
        : ''
        }
      </div>

    </div>
  )
}

export default PlayersList;