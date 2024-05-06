# 2장 Foodie 페이지 만들기

## PreView

## What I learned?

### 122. 이미지 파일 저장: buffer 이용

```tsx
import fs from 'node:fs'

export async function ... () {
  ...
  const extension = meal.image.split(".").pop();  // 확장자 추출
  const fileName = `${meal.slug}.${extension}`;  // 파일명 생성

  const steram = fs.createWriteStream(`public/images/${fileName}`);  // stream: node의 fs(파일 시스템) 모듈을 가져와 사용, createWriteStream: 특정 파일에 데이터를 쓸 수 있는 스트림 경로 설정
  const bufferedImage = await meal.image.arrayBuffer();  // bufferedImage: 이미지 객체를 담을 버퍼 생성

  // 버퍼 작성
  stream.write(Buffer.from(buffredImage), (error) => {
    if (error) {
      throw new Error('에러 내용');
    }
  })

  meal.image = `images/${fileName}`;

  db.prepare(  // 쿼리문 준비
    `... 쿼리문 ...`
  ).run(meal);  // 준비된 쿼리 실행
}
```

### 123. `useFormStatus`: 마지막 폼 제출의 상태 정보를 제공하는 Hook

```tsx
const {
  pending, // 폼이 제출중인지 아닌지를 나타내는 상태
  data,
  method,
  action,
} = useFormStatus();
```

- 사용 예시: meals-form-submit

```tsx
export default function MealsFormSubmit() {
  const { pending } = useFormStatus();

  return (
    // 제출 중일 때 다시 버튼 클릭하는 것을 방지
    <button disabled={pending}>
      {pending ? "Submitting..." : "Share Meal"}
    </button>
  );
}
```

### 124.유효성 검사

```tsx
<input type="text" id="name" name="name" required />
```

`required`를 통해 유효성 검사가 진행되지만, 개발자 도구에 들어가 required를 삭제하고 실행 시킬 우려가 존재, 백엔드에 원하지 않는 데이터 추가가 시도될 수 있다. 따라서 클라이언트 측 검증만으로 부족하고, 서버측에서 검증이 필요하다.

```tsx
// 유효성 검사 함수 작성
function isInvalidText(text: string) {
  return !text || text.trim() === ""; // text가 없거나 공백만 있는 경우
}

...
...

// 유효성 검사 진행
 if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.length === 0 // meal.image.size === 0
  ) {
    throw new Error("Invalid meal data");
  }
```

### 125. useFormState 안내

강의에서 적용된 useFormState(from react-dom) 대신 useActionState(from react)를 적용해야 함

ps. 24년 5월 5일 기준, useFormState, useActionState는 React19 버전에서 제공되는 훅으로 보이며, React18에서는 제공되지 않는다. 126강 이후의 실습 예제 실행에서 오류가 발생할 수 있으며, React19 버전에 맞춰 추후 수정이 필요하다. 일단 useFormState 훅 기준으로 에러가 발생한 상태로 코드 작성 진행.

### 126. `useActionState`: 유효성 검사를 더 우아하게 처리하는 방법

현재(125) 기준 방식에서는 유효성 검사를 통과하지 못할 때, 에러 자체가 반환되며 사용자 경험에 좋지 않은 영향을 준다. 이를 대신할 응답 객체를 반환하자

```tsx
// 서버측 유효성 검사
if (
  isInvalidText(meal.title) ||
  ...
) {
  return {
    message: "Invalid Input",
  };
}
```

#### useActionState()

페이지나 구성 요소의 상태를 관리하는 역할

```tsx
  // React18에서 useFormState, useActionState는 실험적으로 추가된 기능으로 보이며, 19버전에서는 공식적으로 제공한다.
  const [state, formAction] = useActionState(shareMeal, { message: null }); // {서버액션의 트리거, 초기값}

...

<form className={classes.form} action={formAction}>
</form>

...

{state.message && <p>{state.message}</p>}
```

- useActionState(, 초기값)

shareMeal 함수 수정, prevState 추가

```tsx
// * formData의 타입은 FormData일 수 있다. 실습과정의 원활한 진행을 위해 any로 설정
export async function shareMeal(prevState: any, formData: any) {
  const meal = {
    ...
  };
}
```

### 127. development > production 과정에서의 에러

development 환경에서 production 환경으로 넘어가면 문제가 발생

`npm run build`를 통해 빌드 후에 실행할 수 있도록 한다

```shell
npm run build  // build 실행
```

새로운 레시피를 추가하려고 시도하면 이상한 점이 발생

1. 새롭게 추가한 레시피가 등록되지 않음
2. 페이지 새로고침 시에 5초의 딜레이를 설정해두었지만, 화면이 바로 나타남

이유는, Nestjs의 공격적인 캐싱으로 인한 문제
build 과정에서 Next는 앱의 모든 정적인 페이지를 사전에 동작해둔다. 때문에 동적 기능이 동작하기 전에 정적인 화면을 먼저 반환한다. 미래 렌더링 된 페이지를 보여주며, 데이터가 변하면 문제가 된다.

### 128. 캐시 갱신 트리거

127에서의 문제점을 해결하는 방법? > 새로운 레시피를 추가할 때마다 캐시 저장소를 버리라고 명령해야 함: `revalidatePath`

기본값으로 경로만 재조정되고 중첩된 경로는 없다.(\* /meals 경로 아래 중첩된 경록가 있거나, /meals 페이지가 여러 하위 컴포넌트와 데이터를 공유하는 경우 경로만 캐시하는 것을 충분치 않을 수 있다) 두번째 요소를 추가해 중첩된 평가 대상을 설정할 수 있으며, layout도 가능하다(page가 기본) > 해당 평가 대상과 관련된 캐시를 버린다는 의미

```ts
await saveMeal(meal);
revalidatePath("/meals", "layout"); // 추가 {경로, 평가요소}
redirect("/meals");
```

### 129. 파일 시스템에 파일을 저장하지 마세요

현재까지 이미지들은 public/images 폴더에 저장되어 있는 이미지들을 사용

개발단계에서는 프로젝트 내의 폴더를 이용하지만 배포단계에서는 그럴 수 없다.

Nextjs 공식 홈페이지를 보면 AWS S3와 같은 파일 저장 서비스를 이용해서, 런타임에 생성되는 이미지 파일을 모두 저장하도록 권장한다. 다음 강의에서 설명할 예정

### 130. S3에 저장하는 방법

1. AWS 계정 생성

2. S3 버킷을 생성한다

3. 더미 이미지 파일을 업로드한다

4. 서비스 제공이 사용되는 이미지들을 위한 S3 설정법

- `Block all pulbic access` 해제

- `Saving Changes`를 통해 저장

- `Bucket Policy` 추가

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicRead",
      "Effect": "Allow",
      "Principal": "*",
      "Action": ["s3:GetObject", "s3:GetObjectVersion"],
      "Resource": ["arn:aws:s3:::DOC-EXAMPLE-BUCKET/*"]
    }
  ]
}
```

- `DOC-EXAMPLE-BUCKET`에 버킷 이름으로 수정

5. nextjs 코드 업데이트

- `public/images` 폴더를 삭제 (`public/` 폴더만 남도록 한다)

- `.next` 폴더를 삭제하고, `localhost:3000/meals`를 접속하면 이미지가 기존과 달리 연결되지 않는 모습을 확인 가능

- `initdb.js` 파일을 업데이트 한다
  ex) `image: '/images/burder.jpg'를 image: 'burger.jpg'와 같이 수정

- 이미지 파일들의 경로를 수정한다

`componetns/meals/meal-item.js` 파일로 이동해서 src를 수정한다 (src의 경로를 bucket 객체로 수정)

예시

```tsx
<Image
  src={`https://maxchwarzmueller-nextjs-demo-users-image.s3.amazonaws.com/${image}`}
  alt={title}
  fill
>
```

데이터를 리셋시키기 위해 `meals.db` 파일을 삭제하고, nod initdb.js를 재실행해준다. 이후 `npm run dev`로 실행해서 에러를 확인한다

6. 5번 과정에서 에러가 발생하는 것은 NextJS가 이미지 태그에 사용된 외부 URL에 대해 허용하지 않고 있기 때문이다. 따라서 `next.config.js` 파일을 수정해준다

```tsx
const nextConfig = {
  images; {
    remotePatterasn: [
      {
        protocol: 'https',
        hostname: 'maxschwarz...nextjs-demo-users-image.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      }
    ]
  }
}
```

S3 URL은 할당받은 버킷 명으로 한다. 이후 다시 `/meals` 페이지를 방문하면 이미지들이 정상적으로 뜨는 것을 확인 가능

7. 업로드된 이미지를 S3에 저장하기

- `@aws-sdk/client-s3` 패키지를 사용하면 가능하다. 설치를 위해 `npm install @aws-sdk/client-s3`를 실행한다.

- `lib/meals.js 파일로 이동해서 AWS S3 SDK를 import 하고, 코드를 작성한다

```tsx
import { S3 } from "@aws-sdk/client-s3";

const s3 = new S3({
  region: "us-east-1",
});
const db = sql("meals.db");
```

- `saveMeal()` 함수를 수정한다. local file system에 관련된 모든 코드를 삭제하고 아래 코드를 추가한다

```tsx
s3.putObject({
  Bucket: "maxsche...-nextjs-demo-users-image",
  Key: fileName,
  Body: Buffer.from(bufferedImage),
  ContentTyep: meal.iamge.type,
});
```

- `meal.image`를 저장해서 사용하도록 하자. 잘 따라왔다면 아래와 같은 코드가 완성되어 있을 것

```tsx
export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const bufferedImage = await meal.image.arrayBuffer();

  s3.putObject({
    Bucket: "maxschwarzmueller-nextjs-demo-users-image",
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  meal.image = fileName;

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
  ).run(meal);
}
```

8. NextJS에 AWS 허용 설정

`.env.local` 파일에 2개의 key-value 쌍을 추가

```
AWS_ACCESS_KEY_ID=<your aws access key>
AWS_SECRET_ACCESS_KEY=<your aws secret access key>
```

### 130. 정적 메타데이터 추가

참고: 공식 문서에서 메타데이터에 관련된 내용이 게시되어 있음

metadata를 컴포넌트에서 선언해서 사용할 수 있으며, 페이지 검사를 해보면 메타데이터 조회되는 모습을 확인할 수 있다

```tsx
export const metadata = {
  title: "All Meals",
  description: "Browse the deleicious meals shared by out bivrant clients",
};
```

### 132. 동적 메타데이터 추가

```tsx
export async function generateMatadata({ params }) {
  const meal = getMeal(params.mealSlug);

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}
```

### 133. NextJS 요약
