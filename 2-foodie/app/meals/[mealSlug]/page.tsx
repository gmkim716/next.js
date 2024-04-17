import classes from './page.module.css';

export default function MealsPage() { 

  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{' '}
          <span className={classes.highlight}></span>
        </h1>
      </header>
    </>
  )
}
