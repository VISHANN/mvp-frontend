"use client";

import { handleFetchResponse } from "@/app/lib";
import { useEffect } from "react";

export default function EditReview({ params }) {
  const reviewId = params.id;

  useEffect(() => {
    fetchReview(reviewId)
      .then((review) => console.log(review))
      .catch((err) => console.log(err));
  });

  return <article className={`container`}>{reviewId}</article>;
}

function fetchReview(reviewId) {
  return fetch(
    `${process.env.NEXT_PUBLIC_BASE_URI}/api/v1/review/${reviewId}`,
    {
      credentials: "include",
    }
  ).then((res) => handleFetchResponse(res));
}
