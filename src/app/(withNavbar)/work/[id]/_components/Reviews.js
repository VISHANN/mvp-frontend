"use client";

import MyReview from "./MyReview";

export default function Reviews({ work }) {
  return (
    <article>
      <MyReview work={work} />
    </article>
  );
}
