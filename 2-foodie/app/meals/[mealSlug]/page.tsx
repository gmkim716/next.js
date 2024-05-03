import { getMeal } from "@/lib/meals";
import classes from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";

export default function MealsDetailsPage({ params }: { params: any }) {
  const meal = getMeal(params.mealSlug);

  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
            {meal.description}
          </p>
          <p className={classes.summary}>{meal.summary}</p>
          <p
            className={classes.instructions}
            // dangerouslySetInnerHTML: React에서 HTML을 렌더링할 때 사용
            // __html: HTML 문자열을 포함하는 객체
            dangerouslySetInnerHTML={{ __html: meal.instructions }}
          />
        </div>
      </header>
    </>
  );
}
