import styles from "./index.module.css";
import UserProfile from "@/components/UserProfile";
import RatingIcon from "@/components/RatingIcon";

export default function Review({ review, children }) {
  return (
    <div className={styles.review}>
      <div className={styles.gridWrap}>
        <div className={styles.left}>
          <UserProfile src={review.author.picture} />
        </div>
        <div className={styles.right}>
          <div className={styles.header}>
            <span>{review.author.username}</span>
            <span> • </span>
            <span className={styles.ratingIcon}>
              <RatingIcon ratingId={review.rating} active={true} />
            </span>
          </div>
          <div>
            <p>{review.text}</p>
          </div>
          <div>
            <span className={styles.time}>
              {Date(review.createdAt).substring(4, 15)}
            </span>
            {children && <span> • </span>}
            <span className={styles.time}>{children}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
