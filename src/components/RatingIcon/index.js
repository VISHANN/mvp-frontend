import {
  BsHandThumbsUpFill,
  BsHandThumbsDownFill,
  BsHandThumbsUp,
  BsHandThumbsDown,
} from "react-icons/bs";

export default function RatingIcon({ ratingId, active, styles }) {
  switch (ratingId) {
    case "0":
      return (
        <span style={styles} className="ratingIcon">
          {active ? <BsHandThumbsDownFill /> : <BsHandThumbsDown />}
        </span>
      );
    case "1":
      return (
        <span style={styles} className="ratingIcon">
          {active ? <BsHandThumbsUpFill /> : <BsHandThumbsUp />}
        </span>
      );
    case "2":
      return (
        <span
          style={styles}
          className={`ratingIcon twoThumbsUp ${active ? "active" : null}`}
        >
          <DoubleThumbsUp />
        </span>
      );
  }
}

function DoubleThumbsUp() {
  return (
    <>
      <BsHandThumbsUpFill />
      <BsHandThumbsUpFill />
    </>
  );
}
