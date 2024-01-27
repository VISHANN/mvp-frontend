import styles from './index.module.css'

export default function Popup({ children }) {
  return(
    <article className={styles.popup}>
      {children}
    </article>
  )
}