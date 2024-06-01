import Image from 'next/image';
import classes from './hero.module.css';

export default function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image src="/images/site/programmer.png" alt="An image showing Jayden" width={300} height={300} /> 
      </div>
      <h1>Hi, I'm Jayden</h1>
      <p>
        I blog about web development - especially frontend frameworks like
        Angular or React.
      </p>
    </section>
  )
}