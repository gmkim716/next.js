import Image from 'next/image';
import Link from 'next/link';

import classes from './post-item.module.css';

export default function PostItem(props: { post: any }) {
  const { title, image, excerpt, date, slug } = props.post;
  
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const imagePath = `/images/posts/${slug}/${image}`;

  return (
    <li className={classes.post}>
      <Link href={imagePath}>
        <div className={classes.image}>
          <Image src={imagePath} alt={title} width={300} height={200} layout="responsive" />
        </div>
        <div className={classes.content}>
          <h3>TITLE</h3>
          <time>{formattedDate}</time>
          <p>{excerpt}</p>
        </div>
      </Link>
    </li>
  )
}