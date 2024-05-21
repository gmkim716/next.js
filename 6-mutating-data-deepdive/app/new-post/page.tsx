import { createPost } from '@/actions/posts';
import PostForm from '@/components/post-form';

export default function NewPostPage() {
  return (
    // 서버 측에서 처리해야 할 부분을 actions/posts.ts로 구분
    <PostForm action={createPost} />
  );
}
