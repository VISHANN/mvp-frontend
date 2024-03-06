import {
  BsHandThumbsUpFill,
  BsHandThumbsDownFill,
  BsHandThumbsUp,
  BsHandThumbsDown,
} from "react-icons/bs";

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
    <div className="ratingBtn">
      <div className="ratingIcon">{icon}</div>
      <p className="caption">{caption}</p>
    </div>
  );
}

function DoubleThumbsUp() {
  return (
    <div className="doubleThumbsUp">
      <BsHandThumbsUpFill />
      <BsHandThumbsUpFill />
    </div>
  );
}
