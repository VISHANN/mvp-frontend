import { handleFetchResponse } from "@/app/lib";
import { useEffect, useState } from "react";
import { Ratings, TextareaInput, Moods, Pace } from "./";

export default function Form({ workId, title }) {
  const [review, setReview] = useState(generateInitialState);
  const [reviewProps, setReviewProps] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/v1/review/props`)
      .then((res) => res.json())
      .then((reviewProps) => {
        setReviewProps(reviewProps);
        setReview((review) => ({
          ...review,
          moods: Array(reviewProps.moods.length).fill(false),
        }));
        return;
      })
      .catch((err) => console.log(err));
  }, []);

  if (!reviewProps) {
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
      <div>
        <button onClick={(e) => handleSubmit(e, workId, review)}>
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

function generateInitialState() {
  return {
    rating: null,
    text: "",
    moods: [],
    pace: null,
  };
}

function handleSubmit(e, workId, reviewState) {
  e.preventDefault();

  const review = { ...reviewState };

  if (review.rating === null) {
    return alert("Please rate the book before submitting");
  }

  review.moods = review.moods.reduce(
    (out, bool, index) => (bool ? out.concat(String(index)) : out),
    []
  );

  fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/v1/review/${workId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(review),
  })
    .then((res) => handleFetchResponse(res))
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}
