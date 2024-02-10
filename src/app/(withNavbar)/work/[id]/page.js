import styles from './page.module.css'
import Image from 'next/image'
import ShelvesButton from '@/components/ShelvesBtn'
import PrimaryLink from '@/components/PrimaryLink'
import Description from './_components/Description'

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
        <section>
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
        <section>
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
            <div className={styles.banner}>
              96 pages 
              <span><span> • </span> First published in {work.publication.first_published}</span>
              <span><span> • </span> Published by {work.publication.publishers[0]}</span>
            </div>
          </div>
        </section>
      </div>
    </main> 
  )
}

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

  // new authorsList to replace data.authors
  // authorsList is a [{ given_name, key }]
  data.authors = authorsList;

  // get first publication data for workId
  console.log(data.key);
  data.publication = await getPublication(data.key.split('/')[2]);

  return data;
}

async function getPublication (workId) {
  // edition.entries is an array with structure as documented
  const editions = await fetch(`https://openlibrary.org/works/${workId}/editions.json`).then(res => res.json());
  
  const publication = {
    first_published: '2025',
    publishers: [],
  }

  for (const edition of editions.entries) {
    if (Number(edition.publish_date) < Number(publication.first_published)) {
      publication.first_published = edition.publish_date;
      publication.publishers = edition.publishers
    }
  }

  return publication;
}