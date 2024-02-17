"use client"
import styles from '../../work/[id]/page.module.css'
import Image from 'next/image';
import PrimaryLink from '@/components/PrimaryLink';
import { useEffect, useState } from 'react';
import { BsHandThumbsUp, BsHandThumbsDown, BsHandThumbsUpFill, BsHandThumbsDownFill } from "react-icons/bs";

export default function Review({ params, searchParams }) {
  const [review, setReview] = useState(generateInitialState);
  const [moodsList, setMoodsList] = useState(null);
  
  console.log(review);
  
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/v1/review/moods`)
    .then(res => res.json())
    .then(data => {
      data.moods.sort((a, b) => a.id - b.id)
      setMoodsList(data.moods);
      setReview(review => ({
        ...review,
        moods: Array(data.moods.length).fill(false)
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
  
  if (!moodsList) {
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
                <h4 className={styles.h4}>How would you rate this book? </h4>
                <div className={styles.ratingButtons}>
                  {[1,2,0].map(ratingId => {
                    return (
                      <div key={ratingId}>
                        <label htmlFor={ratingId}>
                          <input 
                            className={styles.radio}
                            type="radio"
                            name='rating'
                            id={ratingId}
                            value={ratingId}
                            onChange={handleRatingChange} />
                  
                          <RatingBtn btnId={ratingId} />
                        </label>
                    </div>
                    )
                  })}
                </div>
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
                  moodsList={moodsList}
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
  }
}

function RatingBtn({ btnId }) {
  let caption, icon;

  switch (btnId) {
    case 0:
      icon = (<BsHandThumbsDown />)
      caption = 'dislike'
      break;
    case 1: 
      icon = (<BsHandThumbsUp />)
      caption = 'like';
      break;
    case 2:
      icon = (<BsHandThumbsUpFill />)
      caption = 'love it';
      break;
  }
  return (
    <div className={styles.ratingBtn}>
      <div className={styles.thumbs}>
        {icon}
      </div>
      <p className={styles.caption}>
        {caption}
      </p>
    </div>
  )
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

function Moods({ moodsList, handleChange }) {
  return (
    <ul className={styles.moods}>
      {moodsList.map((mood, index) => (
        <li key={mood.id}>
          <input 
            name='moods'
            type='checkbox'
            value={mood.id}
            id={`mood_id_${mood.id}`}
            onChange={(e) => handleChange(e)} />

          <label htmlFor={`mood_id_${mood.id}`}>
            {mood.name}
          </label>
        </li>
      ))}
    </ul>
  )
}