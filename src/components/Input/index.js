import styles from './index.module.css'

export default function Input({ value, handleChange, placeholder, isValid }) {
  return(
    <div className={`${styles.wrap} ${isValid ? styles.valid : styles.invalid}`}>
      <input 
        type="text"
        value={value} 
        placeholder={placeholder}
        onChange={handleChange} />
    </div>
  )
}