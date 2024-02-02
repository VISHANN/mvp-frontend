'use client'

import styles from './index.module.css'
import { MdBookmarkBorder } from "react-icons/md"
import { useEffect, useState } from 'react'

const defaultShelf = {
  id: 0, 
  isShelved: false,
}

export default function ShelfBtn({ workId }) {
  const [shelf, setShelf] = useState(defaultShelf);

  console.log(workId);
  
  useEffect(() => {
    fetch('http://localhost:8000/api/v1/u/shelves', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => handleData(data, workId))
      .catch(err => console.log(err))
  }, [])

  let shelfName = ''
  switch (shelf.id) {

    case 0: 
      shelfName = 'To Read';
      break;
    case 1:
      shelfName = 'Reading Now';
      break;
    case 2:
      shelfName = 'Have Read';
      break;
    case 3:
      shelfName = "Didn't Finish";
      break;
  }

  return(
    <div className={styles.shelfBtn}>
      <button 
        type='button' 
        className={styles.primaryBtn}
        onClick={() => ToggleShelf(shelf, workId)}>
        {shelf.isShelved ? "S" : <MdBookmarkBorder /> }
        {shelfName}
      </button>
      <span className={styles.secondaryBtn}>
        <span className={styles.arrow}></span>
      </span>
    </div>
  )

  function updateShelves(update) {
    // update = {
    //   type: 'ADD' || 'MOVE' || 'REMOVE',
    //   payload: data
    // }
    let body = {}, handleSuccess = {};

    // set body and handleSuccess according to update type
    switch (update.type) {
      case 'ADD':
        body = { targetShelfId: update.payload.shelfId, workId: update.payload.workId };
        handleSuccess = (data) => {
          if (data.code === 'success') {
            setShelf((state) => ({...state, isShelved: true}))
          }
        }
        break;

      case 'REMOVE':
        body = { currentShelfId: update.payload.shelfId, workId: update.payload.workId }
        handleSuccess = (data) => {
          if (data.code === 'success') {
            setShelf((state) => ({...state, isShelved: false}))
          }
        }
        break;
    }
  
    // fetch backend with body set by switch
    fetch('http://localhost:8000/api/v1/u/shelves', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => handleSuccess(data))
      .catch(err => console.log(err));
  }

  function ToggleShelf(shelf, workId) {
    if (shelf.isShelved) {
      // remove workId from the shelf
      updateShelves({ type: 'REMOVE', payload: {shelfId: shelf.id, workId: workId}})
    } else {
      updateShelves({ type: 'ADD', payload: {shelfId: shelf.id, workId: workId}})
    }
  }

  function handleData (shelves, workId) {
    const { ownerShelfId } = checkShelvesForWork(shelves, workId);
    console.log(ownerShelfId);

    if (ownerShelfId > -1) {
      // means the work is present in shelf with id as ownerShelfId. 
      setShelf({id: ownerShelfId, isShelved: true})
    }
    return ;
  }
}

function checkShelvesForWork(shelves, workId) {
  for ( let i = 0; i < 4; i++) {
    const shelf = shelves[i];
    
    if (shelf.includes(workId)) {
      return { ownerShelfId: i }
    }
  }
  return { ownerShelfId: -1 };
}