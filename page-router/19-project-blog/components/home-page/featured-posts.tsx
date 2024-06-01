import PostsGrid from '../posts/post-grid'
import classes from './featured-post.module.css'

export default function FeaturedPosts(props: { posts: any }) {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={props.posts} />
    </section>
  )
}