import { Fragment } from 'react';

import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';
import { getAllEvents, getEventById, getFeaturedEvents } from '@/helpers/api-util';

// 페이지 사전 생성 적용
export default function EventDetailPage(props: any) {

  const event = props.selectedEvent;

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}


// 데이터 사전 전달
export async function getStaticProps(context: any) {  // context: 어떤 페이지 이벤트 데이터를 로드해야 할지 알아야 함 
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  } 
}

// 동적 경로에 대한 사전 생성: 무한히 만들 수 있는 정적 페이지에 대해 제한을 두기 위해 사용
// fallback: 필수 옵션
//  true: getFeaturedEvents에서 가져오지 못한 동적 페이지가 있다는 것을 알림 
//  false: getFeaturedEvents에서 가져오지 못한 동적 페이지가 있다면 404 페이지를 보여줌
//  blocking: getFeaturedEvents에서 가져오지 못한 동적 페이지가 있다면, 요청한 페이지를 생성할 때까지 기다림
export async function getStaticPaths(context: any) {
  const events = await getFeaturedEvents();
   
  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: 'blocking', 
  }

}