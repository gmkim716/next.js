import Messages from "@/components/messages";
import { unstable_noStore } from "next/cache";


// export const revalidate = 5;  // revalidate: 새 요청이 전송될 때까지 기다리는 시간(초), NextJS가 받아들이는 지정된 변수명* 
// export const dynamic = 'force-static' ;  // 파일간 캐싱 피하기, NextJS가 받아들이는 지정된 변수명*, 기본값 'auth' 외에 'force-dynamic'/'force-static'도 가능 

export default async function MessagePage() {
  unstable_noStore(); // 캐싱 피하기
  const response = await fetch('http://localhost:8080/messages');
  const messages = await response.json();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}