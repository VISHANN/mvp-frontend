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
  
  useEffect(() => {
    fetch('http://localhost:8000/api/v1/u/shelves', {
      credentials: 'include'
    })
      .then(res => res.json())
      // .then(data => handleData(data))
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
        <MdBookmarkBorder /> 
        {shelfName}
      </button>
      <span className={styles.secondaryBtn}>
        <span className={styles.arrow}></span>
      </span>
    </div>
  )

  function ToggleShelf(shelf, workId) {
    fetch('http://localhost:8000/api/v1/u/shelves', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ targetShelfId: shelf.id, workId }),
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }
}

function checkShelfForWork(shelves) {
  for ( let i = 0; i < 4; i++) {
    const shelf = shelves[i];
  }
}