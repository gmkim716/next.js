import PostHeader from "./post-header";
import ReactMarkdown from 'react-markdown';

import classes from './post-content.module.css';

export default function PostContent(props: { post: any }) {
  const { post } = props;

  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown>
        {post.content}
      </ReactMarkdown>
    </article>
  )
}