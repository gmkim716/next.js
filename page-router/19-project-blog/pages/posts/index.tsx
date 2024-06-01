import AllPosts from "@/components/posts/all-post";
import { getAllPosts } from "@/lib/posts-util";

export default function AllPostPage(props: { posts: any[] }) {
  return (
    <AllPosts posts={props.posts} />
  )
}

export function getStaticProps() {
  const allPosts = getAllPosts(); 

  return {
    props: {
      posts: allPosts
    }
  }
}