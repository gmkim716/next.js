'use client';
import { DUMMY_NEWS } from "@/dummy-news";
import { notFound, useRouter } from "next/navigation";

export default function InterceptedImagePage({params} : {params: {slug: string}}) {

  const router = useRouter();  // from next/navigation, 라우터 객체에 액세스 권한을 부여
  
  const newsItemSlug = params.slug;
  const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.slug === newsItemSlug);

  if (!newsItem) {
    notFound();
  }

  return (
    <>
      <div className="modal-backdrop" onClick={router.back}/>
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
      </dialog>
    </>
  )
}