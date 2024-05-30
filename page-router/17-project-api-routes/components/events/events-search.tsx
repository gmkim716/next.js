import Button from '../ui/button';
import classes from './events-search.module.css';

import { ChangeEvent, FormEvent, useRef } from 'react'; // Import the necessary types

function EventsSearch(props: { onSearch: (year: string, month: string) => void }) { // Define the type for the 'props' parameter
  const yearInputRef = useRef<HTMLSelectElement | null>(null); // Specify the type for 'yearInputRef'
  const monthInputRef = useRef<HTMLSelectElement | null>(null); // Specify the type for 'monthInputRef'

  function submitHandler(event: FormEvent) { // Define the type for the 'event' parameter
    event.preventDefault();

    const selectedYear = yearInputRef.current?.value ?? ''; // Use optional chaining and provide a default value
    const selectedMonth = monthInputRef.current?.value ?? ''; // Use optional chaining and provide a default value

    props.onSearch(selectedYear, selectedMonth);    
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor='year'>Year</label>
          <select id='year' ref={yearInputRef}>
            <option value='2021'>2021</option>
            <option value='2022'>2022</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor='month'>Month</label>
          <select id='month' ref={monthInputRef}>
            <option value='1'>January</option>
            <option value='2'>February</option>
            <option value='3'>March</option>
            <option value='4'>April</option>
            <option value='5'>May</option>
            <option value='6'>June</option>
            <option value='7'>July</option>
            <option value='8'>August</option>
            <option value='9'>Septemer</option>
            <option value='10'>October</option>
            <option value='11'>November</option>
            <option value='12'>December</option>
          </select>
        </div>
      </div>
      <Button>Find Events</Button>
    </form>
  );
}

export default EventsSearch;
