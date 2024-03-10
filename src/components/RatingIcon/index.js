import {
  BsHandThumbsUpFill,
  BsHandThumbsDownFill,
  BsHandThumbsUp,
  BsHandThumbsDown,
} from "react-icons/bs";

export default function RatingIcon({ ratingId, active }) {
  switch (ratingId) {
    case "0":
      return (
        <span className="ratingIcon">
          {active ? <BsHandThumbsDownFill /> : <BsHandThumbsDown />}
        </span>
      );
    case "1":
      return (
        <span className="ratingIcon">
          {active ? <BsHandThumbsUpFill /> : <BsHandThumbsUp />}
        </span>
      );
    case "2":
      return (
        <span className={`ratingIcon twoThumbsUp ${active ? "active" : null}`}>
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
