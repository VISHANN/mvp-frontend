"use client"
import styles from './page.module.css'
import Image from 'next/image'
import ShelvesButton from '@/components/ShelvesBtn'
import Link from 'next/link'
import PrimaryLink from '@/components/PrimaryLink'

const description = "Draws on more than forty interviews with Steve Jobs, as well as interviews with family members, friends, competitors, and colleagues, to offer a look at the co-founder and leading creative force behind the Apple computer company.\nThis biography shares the life and personality of a creative entrepreneur whose passion for perfection and ferocious drive revolutionized six industries: personal computers, animated movies, music, phones, tablet computing, and digital publishing."
function truncate (text) {
  // vary the length of truncated text based on screen sizes.
  const MAX = (document.documentElement.clientWidth < 760) ? 160 : 308;

  if ( text.length < MAX) {
    return text;
  } else {
    let subString = text.slice(0, MAX);
    return (<>{subString.slice(0, subString.lastIndexOf(' '))} &hellip;</>);
  }
}

export default function Work() {
  return (
    <main className={`container ${styles.main}`}>
      <div className={styles.gridWrap}>
        <section className={styles.col_9}>
          <div>
            <div className={styles.imgWrap}>
              <Image 
                src="https://covers.openlibrary.org/b/id/12680694-L.jpg" 
                alt="Steve Jobs Biography" 
                fill={true} />
            </div>
          </div>
          <div className={styles.btnGroup}>
            <div>
              <ShelvesButton />
            </div>
          </div>
        </section>
        <section className={styles.col_9}>
          <div className={styles.work}>
            <div>
              <h1  className={styles.title}>Steve Jobs</h1>
            </div>
            <div>
              <h2 className={styles.author}>
                <PrimaryLink 
                  href={"#"} >  
                  Walter Isaacson 
                </PrimaryLink>
              </h2>
            </div>
            <div className={styles.description}>
              <p>
                {truncate(description)}
              </p>
              <PrimaryLink 
                href={'#'}> 
                Show more
              </PrimaryLink>
            </div>
          </div>
        </section>
      </div>
    </main> 
  )
}