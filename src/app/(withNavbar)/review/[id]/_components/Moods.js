import styles from './index.module.css'

export default function Moods({ value, moodsList, handleChange }) {
  return (
    <ul className={styles.moods}>
      {moodsList.map(mood => (
        <li key={mood.id}>
          <input 
            name='moods'
            type='checkbox'
            value={mood.id}
            id={`mood_id_${mood.id}`}
            checked={value[mood.id]}
            onChange={handleChange} />

          <label htmlFor={`mood_id_${mood.id}`}>
            {mood.name}
          </label>
        </li>
      ))}
    </ul>
  )
}
