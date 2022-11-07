import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { updateFavorite } from '../listingSlice';
import filledHeart from '../../../images/heart.png'
import emptyHeart from '../../../images/heart_empty.png'

import '../../../style/_albumItem.css';

const customStyles = {
  content: {
    top: '20%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    borderRadius: '20px',
    margin: '15% auto',
    width: '400px',
    padding: '0px',
    height: '800px',
    border: 'none'
  },
};

export function AlbumItem(props) {

  const {onFav, id, url, artist, name, releaseDate, category, isFavorite} = props.item;
  const [modalIsOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  function updateFav() {
    dispatch(updateFavorite({id, isFavorite: !isFavorite}));
  }
  function openModal() {
        setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div key={`${name}`} id={`${name}`} className="card">
        <img className="image" src={url} />
        {!onFav && <img src={isFavorite ? filledHeart : emptyHeart} className="fav" onClick={updateFav}/>}
        <div className="footer">
          <div className="content">
            <button onClick={openModal}>Read More</button>
          </div>
        </div>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            overlayClassName="Overlay"
        >
          <div className="modal-content">
            <img className="modal-image" src={url} />
            <div className="album-details">
              <div className='data'>
                <label>Album Name: </label><span>{name}</span>
              </div>
              <div className='data'>
                <label>Category: </label><span>{category}</span>
              </div>
              <div className='data'>
                <label>Release Date: </label><span>{releaseDate}</span>
              </div>
              <div className='data'>
                <label>Artists: </label><span>{artist}</span>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        </Modal>
    </div>
  );
}
