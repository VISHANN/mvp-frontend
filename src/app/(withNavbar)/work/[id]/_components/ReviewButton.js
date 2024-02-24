"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PrimaryLink from "@/components/PrimaryLink";

export default function ReviewButton({ workId, coverId, title, authors }) {
  const [isReviewed, setIsReviewed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getUserReviews().then((reviews) => {
      for (let review of reviews) {
        if (review.workId === workId) {
          return setIsReviewed(true);
        }
      }
    });
  }, []);

  if (isReviewed) {
    return <> You have already reviewed this project. here is your review</>;
  } else {
    return (
      <PrimaryLink
        href={{
          pathname: `/review/${workId}`,
          query: {
            coverId: coverId,
            title: title,
            authors: JSON.stringify(authors),
          },
        }}
      >
        Review this work.
      </PrimaryLink>
    );
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
