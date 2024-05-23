import { getFeaturedEvents } from "@/dummy-data";
import { Inter } from "next/font/google";

export default function Home() {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventList />
    </div>
  );
}
