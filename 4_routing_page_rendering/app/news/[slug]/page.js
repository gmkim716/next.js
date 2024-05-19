import { DUMMY_NEWS } from "@/dummy-news";

export default function NewsPage({ params }) {
  const newsSlug = params.id;
  const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.slug === newsSlug);

  return (
    <article className="news-article">
      f
      {/* <header>
        <img src={`./images/news/${newsItem?.image}`} alt={newsItem.title} />
        <h1>{newsItem.title}</h1>
        <time dateTime={newsItem.date}>{newsItem.date}</time>
      </header>
      <p>{newsItem.content}</p> */}
    </article>
  );
}
