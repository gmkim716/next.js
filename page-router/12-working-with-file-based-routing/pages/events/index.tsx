import EventList from "@/components/events/event-list";
import EventSearch from "@/components/events/events-search";
import { getAllEvents } from "@/dummy-data";
import { useRouter } from "next/router";
import { Fragment } from "react/jsx-runtime";

export default function AllEventsPage() {
  const events = getAllEvents(); 
  const router = useRouter(); 

  function findEventsHandler(year: string, month: string) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath); 
  }


  return (
    <Fragment>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}
