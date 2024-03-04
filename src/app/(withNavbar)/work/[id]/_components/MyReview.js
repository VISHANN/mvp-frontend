"use client ";

import { useEffect, useState } from "react";
import ReviewButton from "./ReviewButton";
import Review from "./Review";
import PrimaryLink from "@/components/PrimaryLink";
import { handleFetchResponse } from "@/app/lib";

export default function MyReview({ work }) {
  const [userReview, setUserReview] = useState(null);

  useEffect(() => {
    getUserReview(work.id)
      .then((review) => setUserReview(review))
      .catch((err) => console.log(err));
  }, []);

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
            <ReviewButton work={work} />
          </div>
        </div>
      )}
    </section>
  );
}

async function getUserReview(workId) {
  const userReviews = await getUserReviews();

  // return if userReviews is an empty array [].
  if (!userReviews) return null;

  for (let review of userReviews) {
    if (review.work.olid === workId) {
      return review;
    }
  }
}

function getUserReviews() {
  return fetch(
    `${process.env.NEXT_PUBLIC_BASE_URI}/api/v1/me/activity/reviews`,
    {
      credentials: "include",
    }
  ).then((res) => handleFetchResponse(res));
}
