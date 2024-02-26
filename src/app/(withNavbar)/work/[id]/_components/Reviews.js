import ReviewButton from "./ReviewButton";

export default function Reviews({ work }) {
  return (
    <article>
      <section>
        <h1 className="h4">
          Help others find their next read by reviewing this book
        </h1>
        <div>
          <ReviewButton
            workId={work.id}
            title={work.title}
            cover={work.cover}
            authors={work.authors}
          />
        </div>
      </section>
    </article>
  );
}
