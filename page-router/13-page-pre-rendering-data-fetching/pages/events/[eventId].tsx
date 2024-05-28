import { useRouter } from "next/router";

export default function EventDetailPage() {
  // router hook을 통해 매개변수 추출
  const router = useRouter(); 

  const eventId = router.query.eventId;

  return (
    <div>
      <h1>Event Detail</h1>
    </div>
  )
}