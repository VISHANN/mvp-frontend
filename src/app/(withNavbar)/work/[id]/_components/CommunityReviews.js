"use client";

import { useEffect, useState } from "react";
import MyReview from "./MyReview";
import { handleFetchResponse } from "@/app/lib";
import Review from "./Review";
import styles from "./index.module.css";

export default function Reviews({ work }) {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    // Fetch work's reviews from server
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URI}/api/v1/work/olid/${work.id}/reviews`
    )
      .then((res) => handleFetchResponse(res))
      .then((reviews) => {
        setReviews(reviews);
      })
      .catch((err) => console.log(err));
  }, []);

  if (reviews === null) {
    return <>Loading</>;
  }
  return (
    <article>
      <h1 className=".h2">Community Reviews</h1>
      <MyReview work={work} />
      <section className={styles.reviews}>
        {reviews.map((review) => (
          <Review key={review._id} review={review} />
        ))}
      </section>
    </article>
  );
}
