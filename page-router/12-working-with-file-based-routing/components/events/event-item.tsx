import classes from '../../styles/event-item.module.css';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';
import DateIcon from '../icons/date-icon';
import Button from "../ui/button";


export default function EventItem(props: {
  id: string;
  title: string;
  location: string;
  date: string;
  image: string;
}) {
  const humanReadableDate = new Date(props.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = props.location.replace(", ", "\n");
  const exploreLink = `/events/${props.id}`;

  return (
    <li className={classes.item}>
      <img src={"/" + props.image} alt={props.title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{props.title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div> 
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}
