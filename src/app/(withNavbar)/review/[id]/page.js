"use client"
import styles from '../../work/[id]/page.module.css'
import Image from 'next/image';
import PrimaryLink from '@/components/PrimaryLink';
import { useState } from 'react';
import { BsHandThumbsUp, BsHandThumbsDown, BsHandThumbsUpFill, BsHandThumbsDownFill } from "react-icons/bs";

export default function Review({ params, searchParams }) {
  const [review, setReview] = useState(generateInitialState);
  console.log(review);

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
                <h4>How would you rate this book? </h4>
                <div className={styles.ratingButtons}>
                  {[1,2,0].map(ratingId => {
                    return (
                      <div>
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
            </form>
          </div>
        </section>  
      </div>
    </article>
  )
  function handleRatingChange(e) {
    console.log(e.target.value);
    setReview(review => ({
      ...review,
      rating: e.target.value
    }))
  }
}

function generateInitialState () {
  return {
    rating: null,

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
