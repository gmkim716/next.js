import { getFeaturedEvents } from '@/helpers/api-util';
import EventList from '../components/events/event-list';

export default function HomePage(props: any) {  // props: getStaticProps에서 전달
  return (
    <div>
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,  // 30분마다 재생성
  }
}