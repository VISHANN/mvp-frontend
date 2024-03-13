"use client";

import MyReview from "./MyReview";

export default function Reviews({ work }) {
  return (
    <article>
      <h1 className=".h2">Community Reviews</h1>
      <MyReview work={work} />
    </article>
  );
}
