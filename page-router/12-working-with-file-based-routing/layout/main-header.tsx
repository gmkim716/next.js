import Link from "next/link";

import classes from '../styles/main-header.module.css';

export default function MainHeader() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href='/'>NextEvents</Link>
      </div>
      <nav className={classes.navigation}>
        <ul>
          <li>
            <Link href="/events">Browse ALl Event</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}