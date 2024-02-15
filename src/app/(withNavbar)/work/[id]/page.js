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
              {work.publication.number_of_pages} pages 
              {work.publication.first_published && <span><span> • </span> First published in {work.publication.first_published}</span>}
              {work.publication.publishers[0] && <span><span> • </span> Published by {work.publication.publishers[0]}</span>}
            </div>
          </div>
          <div className={styles.review}>
            <PrimaryLink
              href={{
                pathname: `/review/${params.id}`,
                query: {
                  img: `https://covers.openlibrary.org/b/id/${work.covers[0]}-M.jpg`,
                  title: work.title,
                  authors: JSON.stringify(work.authors)
                }
              }}>
              Review this work.
            </PrimaryLink>
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
  data.publication = await getPublication(data.key.split('/')[2]);

  return data;
}

async function getPublication (workId) {
  // edition.entries is an array with structure as documented
  const editions = await fetch(`https://openlibrary.org/works/${workId}/editions.json`).then(res => res.json());
  let latest_edition_year = -9999; let i = 0;
  
  const publication = {
    number_of_pages: null,
    first_published: '2025',
    publishers: [],
    latest_edition_index: -1,
  }

  for (const edition of editions.entries) {
    const publish_year = getPublishYear(edition.publish_date);

    // non negative publish_year means publish_year exists. see getPublishYear
    if ( publish_year < 0 ) continue;
    
    if (Number(publish_year) < Number(publication.first_published)) {

      publication.first_published = publish_year;
      
      // if edition.publishers doesn't exit publication.publishers will be undefined. Check for undefined on clientside
      publication.publishers = edition.publishers;
    } else if ( edition.number_of_pages && latest_edition_year < publish_year) { 

      // if edition has languages and its not english pass on the edition.
      if (edition.languages && edition.languages[0].key !== '/languages/eng'){
        continue;
      }

      // if publish year is bigger than latest_edition_year assign latest_edition_year to publish_year
      latest_edition_year = publish_year;

      publication.number_of_pages = edition.number_of_pages;
      publication.latest_edition_index = i;
    }

    // increment the loop iterable
    i++;
  }

  return publication;
}

function getPublishYear(publish_date) {
  if (!publish_date) return -1;

  // split publish_date string and get the last item.
  let publish_year = publish_date.split(' ').at(-1);

  // check if publish_year is purely numeric string return
  // else it is of two type: 2001-04-21 or 2002jhg

  if (/^[0-9]+$/.test(publish_year)) return publish_year;

  // case: 2001-04-24
  if (publish_year.indexOf('-') > -1) {
    publish_year.split('-').forEach(element => {
      element.length === 4 ? publish_year = element : null;
    });
  } else {
    // case: 3004jhg 
    // replace all non-digits with ''
    publish_year = publish_year.replace(/\D/g, '')
  }

  return publish_year;
}