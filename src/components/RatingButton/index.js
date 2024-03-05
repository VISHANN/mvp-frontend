import {
  BsHandThumbsUpFill,
  BsHandThumbsDownFill,
  BsHandThumbsUp,
  BsHandThumbsDown,
} from "react-icons/bs";
import styles from "./index.module.css";

export default function RatingButton({ value, rating }) {
  let caption = rating.caption,
    icon;

  switch (rating.id) {
    case "0":
      icon = value === "0" ? <BsHandThumbsDownFill /> : <BsHandThumbsDown />;
      break;
    case "1":
      icon = value === "1" ? <BsHandThumbsUpFill /> : <BsHandThumbsUp />;
      break;
    case "2":
      icon = <DoubleThumbsUp />;
      break;
  }
  return (
    <div className={styles.ratingBtn}>
      <div className={styles.thumbs}>{icon}</div>
      <p className={styles.caption}>{caption}</p>
    </div>
  );
}

function DoubleThumbsUp() {
  return (
    <div className={styles.doubleThumbsUp}>
      <BsHandThumbsUpFill />
      <BsHandThumbsUpFill />
    </div>
  );
}
