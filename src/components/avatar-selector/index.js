import { getAuth, updateProfile } from 'firebase/auth';
import React, { useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { FaGreaterThan } from 'react-icons/fa'

import './avatar-selector.css'

export default function AvatarSelector ({ setAvatarSelectorToFalse, user }) {
  const [newIcon, setNewIcon] = useState('')
  const [confirm, setConfirm] = useState(false)

  const changeUserIcon = () => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      photoURL: newIcon,
    })
      .then(() => {
        setConfirm(false)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {!confirm && (
      <div className='selector'>
        <div className='selector__header'>
          <div className='selector__header-left'>
            <AiOutlineArrowLeft className='selector__header-leftArrow' onClick={setAvatarSelectorToFalse} />
            <div className='selector__header-title'>
              <h1>Edit Profile</h1>
              <h2>Choose an icon profile.</h2>
            </div>
          </div>
          <div className='selector__header-right'>
            <h2>{user.displayName}</h2>
            <img src={`/images/users/${user.photoURL}.png`} alt="avatar" />
          </div>
        </div>
        <div className='selector__rows'>
          <div className='selector__row'>{Array.from(Array(20), (e, i) => {
            return <img className='selector__row-icon' src={`../images/users/${i+1}.png`} alt="icon" onClick={() => { setNewIcon(i+1); setConfirm(true)}}/>
          })}</div>
        </div>
      </div>
      )}

      {confirm && (
        <div className='confirm'>
          <div className='confirm__header'>
            <h1>Change profile icon ?</h1>
          </div>
          <div className='separator' />
          <div className='confirm__body'>
            <img src={`/images/users/${user.photoURL}.png`} alt="old_icon" />
            <FaGreaterThan className='confirm__body-greaterThan' />
            <img src={`/images/users/${newIcon}.png`} alt="new_icon" />
          </div>
          <div className='separator' />
          <div className='confirm__footer'>
            <button className='selector__confirm-btnConfirm' type='button' onClick={() => changeUserIcon()}>Let's go</button>
            <button className='selector__confirm-btnCancel' type='button' onClick={() => setConfirm(false)}>Not yet</button>
          </div>
        </div>
      )}
    </>
  )
}