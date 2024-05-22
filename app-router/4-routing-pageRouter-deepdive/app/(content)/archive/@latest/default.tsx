import NewsList from "@/components/news-list";
import { getLatestNews } from "@/lib/news";

export default function LatestNewsPage() {
  const latestNews = getLatestNews();

  return (
    <div>
      <h2>Latest News Page</h2>
      <NewsList news={latestNews} />
    </div>
  );
}
