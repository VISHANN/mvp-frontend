"use client"

import styles from './UserProfile.module.css'

export default function UserProfile({ src }) {
  
  return(
    <div className={styles.imgWrap}>
      <img src={src} alt="your profile pic" />
    </div>
  )
}