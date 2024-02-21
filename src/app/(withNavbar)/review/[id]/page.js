"use client";
import styles from "./page.module.css";
import Image from "next/image";
import PrimaryLink from "@/components/PrimaryLink";
import Form from "./_components/Forms";

export default function Review({ params, searchParams }) {
  const authors = JSON.parse(searchParams.authors);
  const authorLinks = authors.map((author) => {
    return (
      <PrimaryLink key={author.key} href={"#"}>
        {author.given_name}
      </PrimaryLink>
    );
  });

  return (
    <article className={`container ${styles.main}`}>
      <div className={styles.gridWrap}>
        <section>
          <div>
            <div className={styles.imgWrap}>
              <Image
                src={searchParams.img}
                alt={searchParams.title}
                fill={true}
              />
            </div>
          </div>
        </section>
        <section>
          <div className={styles.work}>
            <div>
              <h1 className={styles.title}>Review {searchParams.title}</h1>
            </div>
            <div>
              <h2 className={styles.author}>{authorLinks}</h2>
            </div>
          </div>
          <div>
            <Form workId={params.id} title={searchParams.title} />
          </div>
        </section>
      </div>
    </article>
  );
}
