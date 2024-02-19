import { BsHandThumbsUp, BsHandThumbsDown, BsHandThumbsUpFill, BsHandThumbsDownFill } from "react-icons/bs";
import styles from './index.module.css'

export default function Ratings({ value, ratingProps, handleChange }) {
  return(
    <div className={styles.ratingButtons}>
      {ratingProps.map(rating => {
        return (
          <div key={rating.id}>
            <input 
              type="radio"
              name='rating'
              id={`rating_${rating.id}`}
              className={styles.rating}
              value={rating.id}
              checked={value === rating.id}
              onChange={handleChange} />
      
            <label htmlFor={`rating_${rating.id}`}>
              <RatingBtn 
                value={value}
                rating={rating} />
            </label>
        </div>
        )
      })}
    </div>
  )
}

function RatingBtn({ value, rating }) {
  let caption = rating.caption, icon;

  switch (rating.id) {
    case '0':
      icon = (value === '0' ? <BsHandThumbsDownFill /> : <BsHandThumbsDown />)
      break;
    case '1': 
      icon = (value === '1' ? <BsHandThumbsUpFill /> : <BsHandThumbsUp />)
      break;
    case '2':
      icon = (value === '2' ? <BsHandThumbsUpFill /> : <BsHandThumbsUp />)
      break;
  }
  return (
    <div className={styles.ratingBtn}>
      <div className={styles.thumbs}>
        {icon}
      </div>
      <p className={styles.caption}>
        {caption}
      </p>
    </div>
  )
}
