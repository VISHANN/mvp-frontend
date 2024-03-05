"use client";
import styles from "./page.module.css";
import Image from "next/image";
import PrimaryLink from "@/components/PrimaryLink";
import Form from "./_components/ReviewForm";

export default function Review({ searchParams }) {
  const { workId, title, cover } = searchParams;

  const authors = JSON.parse(searchParams.authors);
  const authorLinks = authors.map((author) => {
    return (
      <PrimaryLink key={author.key} href={"#"}>
        {author.given_name}
      </PrimaryLink>
    );
  });

  return (
    <article>
      <div className={styles.gridWrap}>
        <section>
          <div>
            <div className={styles.imgWrap}>
              <Image
                src={`https://covers.openlibrary.org/b/id/${cover}-M.jpg`}
                alt={title}
                fill={true}
              />
            </div>
          </div>
        </section>
        <section>
          <div className={styles.work}>
            <div>
              <h1 className={styles.title}>Review {title}</h1>
            </div>
            <div>
              <h2 className={styles.author}>{authorLinks}</h2>
            </div>
          </div>
          <div>
            <Form
              workId={workId}
              title={title}
              authors={authors}
              cover={cover}
            />
          </div>
        </section>
      </div>
    </article>
  );
}
