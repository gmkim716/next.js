'use server';

import { uploadImage } from "@/lib/cloudinary";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(preState: any, formData: any) {

  // form 태그 내부에 name이 설정된 값들이 필수 
  const title = formData.get('title') as string;
  const image = formData.get('image') as File;
  const content = formData.get('content') as string;

  // console.log(title, image, content);  // 서버 측 콘솔에서 확인 가능

  // 유효성 검사를 서버측에서 진행, 클라이언트가 개발자도구로 변경 가능함을 방지
  let errors = [];

  if (!title || title.trim().length === 0) {
    errors.push("Title is required.");
  }

  if (!content || content.trim().length === 0) {
    errors.push("Content is required.");
  }
  
  if (!image || image.size === 0) {
    errors.push("Image is required.");
  }

  if (errors.length > 0) {
    return { errors }
  }

  let imageUrl;

  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    throw new Error("Image upload failed, post was not created. Please try again later.")
  }

  await storePost({
    imageUrl: imageUrl,  // imageUrl 설정
    title,
    content,
    userId: 1
  })

  revalidatePath('/', 'layout');  // 배포 단계에서 캐시 재생성을 위해 설정 
  redirect('/feed'); 
}

export async function togglePostLikeStatus(postId: any) {
  await updatePostLikeStatus(postId, 2);
  revalidatePath('/', 'layout');  // 페이지 캐시 재생성, 두번째 파라미터로 layout을 넘기면 모든 페이지가 재생성됨
}