"use client"
import styles from '../../work/[id]/page.module.css'
import Image from 'next/image';
import PrimaryLink from '@/components/PrimaryLink';
import { useEffect, useState } from 'react';
import { Ratings } from './_components';

export default function Review({ params, searchParams }) {
  const [review, setReview] = useState(generateInitialState);
  const [reviewProps, setReviewProps] = useState(null);
  
  console.log(review);
  
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/v1/review/props`)
    .then(res => res.json())
    .then(reviewProps => {
      setReviewProps(reviewProps);
      setReview(review => ({
        ...review,
        moods: Array(reviewProps.moods.length).fill(false)
      }));
      return;
    })
    .catch(err => console.log(err))
  }, [])
  
  const authors = JSON.parse(searchParams.authors);
  const authorLinks = authors.map( author => {
    return (
      <PrimaryLink 
        key={author.key}
        href={"#"} >  
          {author.given_name} 
        </PrimaryLink>
    )
  })
  
  if (!reviewProps) {
    return (
      <main className='container'>
        <h4 className="h4">
          Loading ...
        </h4>
      </main>
    )
  }

  return(
    <article className={`container ${styles.main}`}>
      <div className={styles.gridWrap}>
        <section>
          <div>
            <div className={styles.imgWrap}>
              <Image 
                src={searchParams.img}
                alt={searchParams.title} 
                fill={true} />
            </div>
          </div>
        </section>
        <section>
          <div className={styles.work}>
            <div>
              <h1  className={styles.title}>
                Reviewing {searchParams.title}
              </h1>
            </div>
            <div>
              <h2 className={styles.author}>
                {authorLinks}
              </h2>
            </div>
          </div>
          <div>
            <form>
              <div>
                <h4 className={styles.h4}>
                  How would you rate this book? 
                </h4>
                <Ratings 
                  value={review.rating}
                  ratingProps={reviewProps.rating}
                  handleChange={handleRatingChange} />
              </div>
              <div>
                <h4 className={styles.h4}>
                  Tell us more about your experience of reading {searchParams.title}.
                </h4>
                <TextareaInput 
                  value={review.text} 
                  handleChange={handleRatingChange} />
              </div>
              <div>
                <h4 className={styles.h4}>
                  This book would be perfect for someone who is in the mood for something
                </h4>
                <Moods 
                  value={review.moods}
                  moodsList={reviewProps.moods}
                  handleChange={handleRatingChange} />
              </div>
              <div>
                <h4 className={styles.h4}>
                  How would you say was the pace of the book?
                </h4>
                <Pace 
                  value={review.pace}
                  paceProps={reviewProps.pace}
                  handleChange={handleRatingChange} />
              </div>
            </form>
          </div>
        </section>  
      </div>
    </article>
  )
  function handleRatingChange(e) {
    if (e.target.name === 'moods') {

      let targetMoodId = e.target.value,
        updatedMoods = [...review.moods];

      updatedMoods[targetMoodId] = !updatedMoods[targetMoodId];

      setReview({
        ...review,
        moods: updatedMoods,
      });
      return ;
    }

    setReview(review => ({
      ...review,
      [e.target.name]: e.target.value
    }))
  }
}

function generateInitialState () {
  return {
    rating: null,
    text: '',
    moods: [],
    pace: null
  }
}


function TextareaInput({ value, handleChange }) {
  return (
    <textarea 
      className={styles.reviewText} 
      name="text"
      value={value} 
      onChange={handleChange} />
  )
}

function Moods({ value, moodsList, handleChange }) {
  return (
    <ul className={styles.moods}>
      {moodsList.map((mood, index) => (
        <li key={mood.id}>
          <input 
            name='moods'
            type='checkbox'
            value={mood.id}
            id={`mood_id_${mood.id}`}
            checked={value[mood.id]}
            onChange={handleChange} />

          <label htmlFor={`mood_id_${mood.id}`}>
            {mood.name}
          </label>
        </li>
      ))}
    </ul>
  )
}

function Pace({ value, paceProps, handleChange }) {
  let paceOptions = paceProps.map(pace => (
    <li key={pace.id}>
        <input 
          id={`pace_${pace.id}`}
          name='pace'
          type="radio"
          value={pace.id}
          onChange={handleChange}
          checked={value === pace.id} />
        <label htmlFor={`pace_${pace.id}`}>
          {pace.name} 
        </label>
      </li>
  ))
  return (
    <ul className={styles.moods}>
      {paceOptions}
    </ul>
  )
}