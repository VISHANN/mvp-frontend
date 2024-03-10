import RatingIcon from "../RatingIcon";

export default function RatingButton({ value, rating }) {
  let caption = rating.caption;

  return (
    <div className="ratingBtn">
      <div className="thumbButton">
        <div className="thumbIcon">
          <RatingIcon ratingId={rating.id} active={value === rating.id} />
        </div>
      </div>
      <p className="caption">{caption}</p>
    </div>
  );
}
