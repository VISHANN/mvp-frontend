import styles from '../../../work/[id]/page.module.css'


export default function TextareaInput({ value, handleChange }) {
  return (
    <textarea 
      className={styles.reviewText} 
      name="text"
      value={value} 
      onChange={handleChange} />
  )
}