"use client";
import ImagePicker from "@/components/image-picker/image-picker";
import classes from "./page.module.css";
import MealsFormSubmit from "@/components/meals/meals-form-submit";
import { useFormState } from "react-dom";
import { shareMeal } from "@/lib/actions";
import { useActionState } from "react";

export default function ShareMealPage() {
  // React18에서 useFormState, useActionState는 실험적으로 추가된 기능으로 보이며, 19버전에서는 공식적으로 제공한다.
  const [state, formAction] = useActionState(shareMeal, { message: null }); // {서버액션의 트리거, 초기값}

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        {/* useActionState 훅의 formAction 사용, action: 폼을 제출할 때 데이터가 전송될 URL 지정 */}
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows={10}
              required
            ></textarea>
          </p>
          {state.message && <p>{state.message}</p>}
          <ImagePicker label="your image" name="iamge" />
          <p className={classes.actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}
