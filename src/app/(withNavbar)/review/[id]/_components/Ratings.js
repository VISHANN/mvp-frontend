import { BsHandThumbsUp, BsHandThumbsDown, BsHandThumbsUpFill, BsHandThumbsDownFill } from "react-icons/bs";
import styles from '../../../work/[id]/page.module.css'

function RatingBtn({ btnId }) {
  let caption, icon;

  switch (btnId) {
    case '0':
      icon = (<BsHandThumbsDown />)
      caption = 'dislike'
      break;
    case '1': 
      icon = (<BsHandThumbsUp />)
      caption = 'like';
      break;
    case '2':
      icon = (<BsHandThumbsUpFill />)
      caption = 'love it';
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
              className={styles.radio}
              value={rating.id}
              checked={value === rating.id}
              onChange={handleChange} />
      
            <label htmlFor={`rating_${rating.id}`}>
              <RatingBtn btnId={rating.id} />
            </label>
        </div>
        )
      })}
    </div>
  )
}