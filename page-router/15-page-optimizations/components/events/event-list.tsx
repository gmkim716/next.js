import EventItem from './event-item';
import classes from './event-list.module.css';

// SSR: 검색엔진에 노출되어야 하는 페이지, 로그인 여부가 중요하지 않음
export default function EventList(props: any) {
  const { items } = props;

  return (
    <ul className={classes.list}>
      {items.map((event: any) => (
        <EventItem
          key={event.id}
          id={event.id}
          title={event.title}
          location={event.location}
          date={event.date}
          image={event.image}
        />
      ))}
    </ul>
  );
}
