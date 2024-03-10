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
        <span
          style={styles}
          className={`ratingIcon ${active && "active"}`}
          id="ratingIcon-0"
        >
          {active ? <BsHandThumbsDownFill /> : <BsHandThumbsDown />}
        </span>
      );
    case "1":
      return (
        <span
          style={styles}
          className={`ratingIcon ${active && "active"}`}
          id="ratingIcon-1"
        >
          {active ? <BsHandThumbsUpFill /> : <BsHandThumbsUp />}
        </span>
      );
    case "2":
      return (
        <span
          style={styles}
          className={`ratingIcon twoThumbsUp ${active ? "active" : null}`}
          id="ratingIcon-2"
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
