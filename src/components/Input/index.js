import styles from './index.module.css'

export default function Input({ value, handleChange, placeholder}) {
  return(
    <div className={styles.wrap}>
      <input 
        type="text"
        value={value} 
        placeholder={placeholder}
        onChange={handleChange} />
    </div>
  )
}