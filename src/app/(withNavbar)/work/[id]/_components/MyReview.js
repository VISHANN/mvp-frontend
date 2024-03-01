import { useEffect, useState } from "react";
import ReviewButton from "./ReviewButton";
import Review from "./Review";
import PrimaryLink from "@/components/PrimaryLink";

export default function MyReview({ work }) {
  const [userReview, setUserReview] = useState([]);

  useEffect(() => {
    getUserReview(work.id).then((review) => setUserReview(review));
  }, []);

  console.log(userReview);

  return (
    <section>
      {userReview ? (
        <div>
          <Review review={userReview} />
          <PrimaryLink
            href={{
              pathname: `/review/${userReview._id}/edit`,
            }}
          >
            Edit your review
          </PrimaryLink>
        </div>
      ) : (
        <div>
          <h1 className="h4">
            Help others find their next read by reviewing this book
          </h1>
          <div>
            <ReviewButton
              workId={work.id}
              title={work.title}
              cover={work.cover}
              authors={work.authors}
            />
          </div>
        </div>
      )}
    </section>
  );
}

async function getUserReview(workId) {
  const userReviews = await getUserReviews();
  for (let review of userReviews) {
    if (review.work.olid === workId) {
      return review;
    }
  }
}

function getUserReviews() {
  return fetch(
    `${process.env.NEXT_PUBLIC_BASE_URI}/api/v1/u/activity/reviews`,
    {
      credentials: "include",
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
}
