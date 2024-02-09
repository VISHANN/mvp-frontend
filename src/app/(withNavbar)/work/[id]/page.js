import styles from './page.module.css'
import Image from 'next/image'
import ShelvesButton from '@/components/ShelvesBtn'
import PrimaryLink from '@/components/PrimaryLink'
import Description from './_components/Description'

async function getWorkMetadata() {
  const data = await fetch('https://openlibrary.org/works/OL45804W.json').then(res => res.json());
  const authorsList = [];

  // data.authors is an array of objects described below:
  // {
  //   author: {key: '/authors/ol4580W'},
  //   type: {'/type/author_role'}
  // }
  
  // await while we fetch names of all the authors using their respective keys 
  for ( const e of data.authors ) {
    const author = await fetch(`https://openlibrary.org${e.author.key}.json`).then(res => res.json())
    authorsList.push({ given_name: author.personal_name, key: author.key});
  }

  // new authorsList to replace the authors in data.
  // authorsList is a [{ given_name, key }]
  data.authors = authorsList;

  return data;
}

export default async function Work({ params }) {
  const work = await getWorkMetadata();
  if (!work) {
    return (
      <>Loadin...</>
    )
  }

  const authorLinks = work.authors.map( author => {
    return (
      <PrimaryLink 
        key={author.key}
        href={"#"} >  
        {author.given_name} 
      </PrimaryLink>
    )
  })
  return (
    <main className={`container ${styles.main}`}>
      <div className={styles.gridWrap}>
        <section className={styles.col_9}>
          <div>
            <div className={styles.imgWrap}>
              <Image 
                src={`https://covers.openlibrary.org/b/id/${work.covers[0]}-M.jpg`}
                alt={work.title} 
                fill={true} />
            </div>
          </div>
          <div className={styles.btnGroup}>
            <div>
              <ShelvesButton 
                workId={params.id}/>
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
                {authorLinks}
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
