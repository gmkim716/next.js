"use client"

import { formatDate } from '@/lib/format';
import LikeButton from './like-icon';
import { togglePostLikeStatus } from '@/actions/posts';
import { useOptimistic } from 'react';

function Post({ post, action }: { post: any, action: any }) {
  return (
    <article className="post">
      <div className="post-image">
        <img src={post.image} alt={post.title} />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{' '}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            {/* action: useOptimistic을 적용한 메서드, bind: 함수의 this 값을 설정하거나 인자들을 고정하는데 사용  */}
            <form action={action.bind(null, post.id)} className={post.isLiked ? 'liked' : ''}>
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }: { posts: any[] }) {

  // useOptimistic 훅을 사용하여 포스트 업데이트 시 상태 변경
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(posts, (prevPosts: any, updatedPostId: any) => {
    const updatedPostIndex = prevPosts.findIndex((post: any) => post.id === updatedPostId)
    
    if (updatedPostIndex === -1) {  // 업데이트된 포스트가 없으면 이전 포스트를 반환
      return prevPosts
    }

    const updatedPost = { ...prevPosts[updatedPostIndex] };  // 업데이트된 포스트 복사
    updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1);  // 좋아요 상태에 따라 좋아요 수 변경
    updatedPost.isLiked = !updatedPost.isLiked;   // 좋아요 상태 변경
    const newPosts = [...prevPosts];  // 이전 포스트 복사 
    newPosts[updatedPostIndex] = updatedPost;  // 업데이트된 포스트로 변경

    return newPosts;
  })


  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  async function updatePost(postId: any) {
    updateOptimisticPosts(postId);
    await togglePostLikeStatus(postId);
  }

  return (
    <ul className="posts">
      {optimisticPosts.map((post: any) => (
        <li key={post.id}>
          <Post post={post} action={updatePost}/>
        </li>
      ))}
    </ul>
  );
}
