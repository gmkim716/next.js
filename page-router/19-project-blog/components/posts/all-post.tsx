import classes from './all-post.module.css';
import PostsGrid from './post-grid';


export default function AllPosts(props: { posts: any[] }) {
  return (
    <div className={classes.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={props.posts} />
    </div>
  )
}