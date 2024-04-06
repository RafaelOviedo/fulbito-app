import { useEffect, useState, useRef, useCallback } from 'react';
import style from './PlayersList.module.css';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import 'primereact/resources/themes/saga-blue/theme.css';

function PlayersList({ matchTypeEndpoint }) {
  const MAX_LIST_PLAYERS = 20;

  const [newPlayer, setNewPlayer] = useState('');
  const [allPlayers, setAllPlayers] = useState(null);
  const [currentMatchId, setCurrentMatchId] = useState(null);
  const [playerID, setPlayerID] = useState(null);
  const [player, setPlayer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingVoucherUpload, setIsLoadingVoucherUpload] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const toast = useRef(null);

  const getAllPlayers = useCallback(async () => {
    const response = await axios.get(`${process.env.REACT_APP_PROD_API_FLO}/${matchTypeEndpoint()}`);
    const currentMatchPlayers = response.data[response.data.length - 1]?.players;
    const currentMatchId = response.data[response.data.length - 1]?._id;
    setAllPlayers(currentMatchPlayers);
    setCurrentMatchId(currentMatchId);
    setIsLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleNewPlayerClick = (value) => {
    setNewPlayer(value)
  }

  const addPlayerToList = async (matchId) => {
    if (!matchId) { 
      setShowErrorMessage(true);
      return; 
    };

    setIsLoading(true);

    try {
      await axios.post(`${process.env.REACT_APP_PROD_API_FLO}/${matchTypeEndpoint()}/${matchId}`, { name: newPlayer, payment: false, voucher: null });
      setNewPlayer('');
      getAllPlayers();
    } 
    catch (error) {
      setIsLoading(false);
      throw new Error(error);  
    }
  }

  const deleteMatchPlayer = async (matchId, playerId) => {
    setIsLoading(true);
    await axios.delete(`${process.env.REACT_APP_PROD_API_FLO}/${matchTypeEndpoint()}/${matchId}/player/${playerId}`);
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
    setImage(e.target.files[0]);
  };

  const showToast = () => {
    toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Comprobante subido!', life: 5000 });
  };

  const uploadPlayerPhoto = async (e) => {
    e.preventDefault();
    setIsLoadingVoucherUpload(true);

    const formData = new FormData();
    formData.append('image', image);

    await axios.patch(`${process.env.REACT_APP_PROD_API_FLO}/${matchTypeEndpoint()}/${(currentMatchId)}/player/${playerID}`, formData, { headers: { 'Content-Type': 'multipart/form-data' }});
    showToast();
    getAllPlayers();
    setIsModalOpen(false);
    setIsLoadingVoucherUpload(false);
  }

  const getVoucherImage = (bufferData) => {
    const blob = new Blob([new Uint8Array(bufferData)], { type: 'image/jpeg' });
    return URL.createObjectURL(blob);
  }

  const allPlayersHavePaid = () => {
    return allPlayers?.every((player) => player.payment === true);
  }

  useEffect(() => {
    getAllPlayers();
  }, [getAllPlayers])

  return (
    <div className={style.playersListComponent}>
      <Toast ref={toast} position="top-center" />

      <div className={style.listTitleContainer}>
        <h3>{ allPlayers?.length === MAX_LIST_PLAYERS && allPlayersHavePaid() ? <span style={{ color: 'red' }}>Lista Cerrada</span> : 'Lista' }</h3>
      </div>

      <div className={style.listContainer}>
        <div className={style.playerInputContainer} style={ allPlayers?.length === MAX_LIST_PLAYERS ? { pointerEvents: 'none', opacity: 0.5 } : {} }>
          <label className={style.playerInputLabel}>Agregar jugador:</label>
          <div className={style.inputAndButtonContainer}>
            <input onChange={e => handleNewPlayerClick(e.target.value)} value={newPlayer} className={style.playerInput} type='text' />
            <button onClick={() => addPlayerToList(currentMatchId)} className={style.playerConfirmButton} disabled={!newPlayer.length} style={!newPlayer.length ? { opacity: 0.5 } : {}}>&#10004;</button>
            <div className={style.playersLengthContainer}>
              <span className={style.playersLength}><b>{allPlayers?.length || 0}</b>/20 agregados</span>
            </div>
          </div>
        </div>

        { showErrorMessage ? <div className={style.noSelectedPlayersError}>No puedes agregar jugadores sin tener una partida seleccionada</div> : '' }

        <div className={style.listHeader}>
          <div className={style.listNameHeader}>Nombre</div>
          <div className={style.listPaymentHeader}>Pagó?</div>
          <div className={style.listVoucherHeader}>Comprobante</div>
          <div className={style.listActionHeader}>Acción</div>
        </div>

        {
          isLoading ? (
            <ProgressSpinner style={{width: '50px', height: '50px', marginTop: '10px'}} strokeWidth="4" />
          ) : (
            <div className={style.playersListContainer}>
              {
                !allPlayers?.length ? (
                  <div className={style.noPlayersDisplayed}>No se han agregado jugadores aun</div>
                ) :
                allPlayers && allPlayers?.map((player) => (
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
          )
        }

        {
          isModalOpen ?
            <div className={style.uploadShowPhotoModal}>
              <div className={style.closeModalButtonContainer}>
                <button className={style.closeModalButton} onClick={closeModal}>x</button>
              </div>
              
              <div className={style.modalContentContainer}>
                { !player.payment ?
                  <div className={style.voucherUploadContainer}>
                    <p style={{ textAlign: 'center' }}>Sube el comprobante del pago <br /> de la partida</p>

                    <form onSubmit={uploadPlayerPhoto} className={style.formContainer}>
                      <input id='image' type="file" onChange={handleImageChange} name='image' accept='image/*' className={style.uploadVoucherInput} placeholder='hehfjeh' />
                      <button type='submit' className={style.uploadButton} disabled={!image}>{ isLoadingVoucherUpload ? <ProgressSpinner style={{width: '35px', height: '35px'}} strokeWidth="4" /> : 'Subir Comprobante' }</button>
                    </form> 
                  </div>
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