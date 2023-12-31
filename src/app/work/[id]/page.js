"use client"
import styles from './page.module.css'

export default function Work() {
  return (
    <main className={`container ${styles.main}`}>
      <div className={styles.gridWrap}>
        <section className={styles.col_9}>
          <div>
            <div className={styles.imgWrap}>
              <img src="https://covers.openlibrary.org/b/id/12680694-L.jpg" alt="Steve Jobs Biography" />
            </div>
          </div>
          <div className="button-group">
            <button>to read</button>
          </div>
        </section>
        <section className={styles.col_9}>
          <div className={styles.work}>
            <div className={styles.title}>
              <h1>Steve Jobs</h1>
            </div>
            <div className={styles.author}>
              <h2> Walter Isaacson </h2>
            </div>
            <div className={styles.description}>
              <p className="lead">
                Draws on more than forty interviews with Steve Jobs, as well as interviews with family members, friends, competitors, and colleagues, to offer a look at the co-founder and leading creative force behind the Apple computer company.

                This biography shares the life and personality of a creative entrepreneur whose passion for perfection and ferocious drive revolutionized six industries: personal computers, animated movies, music, phones, tablet computing, and digital publishing.
              </p>
              <button> Show more</button>
            </div>
          </div>
        </section>
      </div>
    </main> 
  )
}
