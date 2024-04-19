import Link from "next/link";

import classes from "./page.module.css";
import { getMeals } from "@/lib/meals";
import MealsGrid from "@/components/meals/meals-grid";

export default async function MealsPage() {
  const meals = await getMeals();
  console.log("meals", meals);

  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>Choose your favorite recipe and cook it yourself. It is easy</p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share your favorite Recipe</Link>
        </p>
      </header>

      <main className={classes.main}>
        <MealsGrid meals={meals} />
      </main>
    </>
  );
}
