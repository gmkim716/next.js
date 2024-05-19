// 서버에서 사용되는 action들을 정의
"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text: string) {
  return !text || text.trim() === ""; // text가 없거나 공백만 있는 경우
}

// * formData의 타입은 FormData일 수 있다. 실습과정의 원활한 진행을 위해 any로 설정
export async function shareMeal(prevState: any, formData: any) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"), // id="name"인 요소
    creator_email: formData.get("email"), // id="email"인 요소
  };

  // 서버측 유효성 검사
  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Invalid input.",
    };
  }

  await saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
}
