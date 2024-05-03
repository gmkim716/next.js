import sql from "better-sqlite3";

import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

// slugify, xss 설치 후 진행
// slugify: 문자열을 슬러그로 변환, URL에 사용하기 적합한 문자열로 변환
// xss: 사용자 입력을 안전하게 처리
export function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
}
