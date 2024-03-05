"use client";

import { handleFetchResponse } from "@/app/lib";
import { useEffect, useState } from "react";
import styles from "../page.module.css";
import PrimaryLink from "@/components/PrimaryLink";
import Image from "next/image";
import Form from "../_components/ReviewForm";

export default function EditReview({ params }) {
  const reviewId = params.id;
  const [review, setReview] = useState(null);

  useEffect(() => {
    fetchReview(reviewId)
      .then((review) => setReview(review))
      .catch((err) => console.log(err));
  }, []);

  /*
    {
      "_id": "65df4fc08f35c3f18659b7c9",
      "work": {
        "_id": "65df4fc0df4f508e5cfd296d",
        "authors": [
          {
            "given_name": "Dahl, Roald.",
            "_id": "65df4fbf8f35c3f18659b7c6"
          }
        ],
        "cover": "6498519",
        "olid": "OL45804W",
        "title": "Fantastic Mr Fox",
        "__v": 0,
        "reviews": []
      },
      "author": "65df4d6bdf4f508e5cf6e50e",
      "rating": "0",
      "text": "",
      "moods": [],
      "pace": null,
      "createdAt": "2024-02-28T15:22:40.024Z",
      "__v": 0
    }
  */
  if (!review) {
    return <> Loading ... </>;
  }

  const { olid, cover, title, authors } = review.work;

  const authorLinks = authors.map((author) => {
    return (
      <PrimaryLink key={author.olid} href={"#"}>
        {author.given_name}
      </PrimaryLink>
    );
  });

  return (
    <article>
      <div className={styles.gridWrap}>
        <section>
          <div>
            <div className={styles.imgWrap}>
              <Image
                src={`https://covers.openlibrary.org/b/id/${cover}-M.jpg`}
                alt={title}
                fill={true}
              />
            </div>
          </div>
        </section>
        <section>
          <div className={styles.work}>
            <div>
              <h1 className={styles.title}>Review {title}</h1>
            </div>
            <div>
              <h2 className={styles.author}>{authorLinks}</h2>
            </div>
          </div>
          <div>
            <Form userReview={review} workId={olid} {...review.work} />
          </div>
        </section>
      </div>
    </article>
  );
}

function fetchReview(reviewId) {
  return fetch(
    `${process.env.NEXT_PUBLIC_BASE_URI}/api/v1/me/review/${reviewId}`,
    {
      credentials: "include",
    }
  ).then((res) => handleFetchResponse(res));
}
