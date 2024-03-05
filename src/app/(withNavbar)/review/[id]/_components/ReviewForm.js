import { handleFetchResponse } from "@/app/lib";
import { useEffect, useState } from "react";
import { Ratings, TextareaInput, Moods, Pace } from ".";
import { useRouter } from "next/navigation";
import styles from "./index.module.css";

export default function Form({ workId, title, authors, cover, userReview }) {
  const [review, setReview] = useState(null);
  const [reviewProps, setReviewProps] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/v1/review/props`)
      .then((res) => res.json())
      .then((reviewProps) => {
        setReviewProps(reviewProps);
        setReview(pullState(reviewProps, userReview));
      })
      .catch((err) => console.log(err));
  }, []);

  if (!reviewProps || !review) {
    return (
      <main className="container">
        <h4 className="h4">Loading ...</h4>
      </main>
    );
  }

  return (
    <form>
      <div>
        <h4 className="h4">How would you rate this book?</h4>
        <Ratings
          value={review.rating}
          ratingProps={reviewProps.rating}
          handleChange={handleChange}
        />
      </div>
      <div>
        <h4 className="h4">
          Tell us more about your experience of reading {title}.
        </h4>
        <TextareaInput value={review.text} handleChange={handleChange} />
      </div>
      <div>
        <h4 className="h4">
          This book would be perfect for someone who is in the mood for
          something
        </h4>
        <Moods
          value={review.moods}
          moodsList={reviewProps.moods}
          handleChange={handleChange}
        />
      </div>
      <div>
        <h4 className="h4">How would you say was the pace of the book?</h4>
        <Pace
          value={review.pace}
          paceProps={reviewProps.pace}
          handleChange={handleChange}
        />
      </div>
      <div className={styles.submitBtn}>
        <button
          onClick={(e) =>
            handleSubmit(
              e,
              workId,
              title,
              authors,
              cover,
              review,
              router,
              userReview
            )
          }
          className="btn btn-primary"
          disabled={review.rating === null}
        >
          Submit Review
        </button>
      </div>
    </form>
  );

  function handleChange(e) {
    if (e.target.name === "moods") {
      let targetMoodId = e.target.value,
        updatedMoods = [...review.moods];

      updatedMoods[targetMoodId] = !updatedMoods[targetMoodId];

      setReview({
        ...review,
        moods: updatedMoods,
      });
      return;
    }

    setReview((review) => ({
      ...review,
      [e.target.name]: e.target.value,
    }));
  }
}

function pullState(reviewProps, userReview) {
  // declare an array of false values length of reviewProps.moods
  let moods = Array(reviewProps.moods.length).fill(false);

  if (userReview) {
    // review.moods: ["1", "8", "9"]
    // We must convert it to array of bools, indicating true for the indices as in review.moods

    // each element in review.moods is moodId String
    for (let moodId of userReview.moods) {
      // convert moodId to number indices to access moods array
      moods[Number(moodId)] = true;
    }

    // return new review state generated from userReview
    return {
      ...userReview,
      moods: moods,
    };
  }

  // userReview would be undefined for adding review for first time. Return intial review state
  return {
    rating: null,
    text: "",
    moods,
    pace: null,
  };
}
function genIntialReview() {
  return {
    rating: null,
    text: "",
    moods: [],
    pace: null,
  };
}

function handleSubmit(
  e,
  workId,
  title,
  authors,
  cover,
  reviewState,
  router,
  userReview
) {
  e.preventDefault();

  const review = { ...reviewState };
  const work = {
    id: workId,
    title,
    authors,
    cover,
  };

  // IMPROVE
  if (review.rating === null) {
    return alert("Please rate the book before submitting");
  }

  // get indices of truthy values from review.moods
  review.moods = review.moods.reduce(
    (out, bool, index) => (bool ? out.concat(String(index)) : out),
    []
  );

  fetch(
    `${process.env.NEXT_PUBLIC_BASE_URI}/api/v1/review/${
      userReview ? userReview._id : ""
    }`,
    {
      method: userReview ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ review, work }),
    }
  )
    .then((res) => handleFetchResponse(res))
    .then((data) => handleSuccess())
    .catch((err) => console.log(err));

  function handleSuccess() {
    return router.back();
  }
}
