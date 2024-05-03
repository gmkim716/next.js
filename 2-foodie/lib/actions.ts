// 서버에서 사용되는 action들을 정의
"use server";

export async function shareMeal(formData: FormData) {
  // "use server"; // 서버에서만 실행되는 코드, async 함수 내부에서만 사용 가능

  const meal = {
    title: formData.get("titile"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"), // id="name"인 요소
    creator_email: formData.get("email"),
  };

  console.log(meal);
}
