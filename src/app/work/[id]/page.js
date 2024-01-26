import styles from './page.module.css'
import Image from 'next/image'
import ShelvesButton from '@/components/ShelvesBtn'
import PrimaryLink from '@/components/PrimaryLink'
import Description from './_components/Description'

const description = "Draws on more than forty interviews with Steve Jobs, as well as interviews with family members, friends, competitors, and colleagues, to offer a look at the co-founder and leading creative force behind the Apple computer company.\nThis biography shares the life and personality of a creative entrepreneur whose passion for perfection and ferocious drive revolutionized six industries: personal computers, animated movies, music, phones, tablet computing, and digital publishing."

async function getWorkMetadata() {
  const data = await fetch('https://openlibrary.org/works/OL45804W.json').then(res => res.json());
  return data;
}

export default async function Work() {
  const work = await getWorkMetadata();

  console.log(work); // delete
  if (!work) {
    return (
      <>Loadin...</>
    )
  }

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
              <h1  className={styles.title}>
                {work.title}
              </h1>
            </div>
            <div>
              <h2 className={styles.author}>
                <PrimaryLink 
                  href={"#"} >  
                  Walter Isaacson 
                </PrimaryLink>
              </h2>
            </div>
            <Description>
              {work.description}
            </Description>
          </div>
        </section>
      </div>
    </main> 
  )
}
