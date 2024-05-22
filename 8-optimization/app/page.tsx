import { Suspense } from "react";
import { getPosts } from "@/lib/posts";
import Posts from "@/components/posts";

// 정적 메타데이터
// export const metadata = {
//   // 구글 검색이 되었을 때 링크 아래에 표시될 내용들을 기입, 탭에 표시될 내용 
//   title: "Hello Monkey",
//   description: "Welcome back!",
// };

// 동적 메타데이터

export async function generateMetadata() {
  const posts = await getPosts();
  const numberOfPosts = posts.length;
  return {
    title: `Browse all our ${numberOfPosts} posts!`,
    description: ''
  }
}


async function LatestPosts() {
  const latestPosts = await getPosts(2);
  return <Posts posts={latestPosts} />;
}

export default function Home() {
  return (
    <>
      <h1>Welcome back!</h1>
      <p>Here's waht you might've missed.</p>
      <section id="latest-posts">
        <Suspense fallback={<p>Loading...</p>}>
          <LatestPosts />
        </Suspense>
      </section>
    </>
  );
}
