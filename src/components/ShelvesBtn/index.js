import styles from './index.module.css'
import { MdBookmarkBorder } from "react-icons/md"

export default function ShelfBtn() {
  return(
    <div className={styles.shelfBtn}>
      <button type='button' className={styles.primaryBtn}>
        <MdBookmarkBorder /> To read
      </button>
      <span className={styles.secondaryBtn}>
        <span className={styles.arrow}></span>
      </span>
    </div>
  )
}