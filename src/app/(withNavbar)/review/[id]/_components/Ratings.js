import RatingButton from "@/components/RatingButton";
import styles from "./index.module.css";

export default function Ratings({ value, ratingProps, handleChange }) {
  return (
    <div className={styles.ratingButtons}>
      {ratingProps.map((rating) => {
        return (
          <div key={rating.id}>
            <input
              type="radio"
              name="rating"
              id={`rating_${rating.id}`}
              className={styles.rating}
              value={rating.id}
              checked={value === rating.id}
              onChange={handleChange}
            />

            <label htmlFor={`rating_${rating.id}`}>
              <RatingButton value={value} rating={rating} />
            </label>
          </div>
        );
      })}
    </div>
  );
}
