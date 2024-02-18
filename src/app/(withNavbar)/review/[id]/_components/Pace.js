import styles from './index.module.css'

export default function Pace({ value, paceProps, handleChange }) {
  let paceOptions = paceProps.map(pace => (
    <li key={pace.id}>
        <input 
          id={`pace_${pace.id}`}
          name='pace'
          type="radio"
          value={pace.id}
          onChange={handleChange}
          checked={value === pace.id} />
        <label htmlFor={`pace_${pace.id}`}>
          {pace.name} 
        </label>
      </li>
  ))
  return (
    <ul className={styles.moods}>
      {paceOptions}
    </ul>
  )
}