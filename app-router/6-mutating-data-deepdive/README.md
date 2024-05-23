# Data Mutation
- 데이터를 바꾸고 저장하는 방법 
- Server Action 사용

### Data fetch 방식 

#### 1. 실행형으로 분리된 백엔드 API 만들기 

외부 api로 데이터를 전달, 데이터 소스를 직접 보유하지 않은 경우 선택 

#### 2. NextJS app 통합형

NextJS에서 백엔드 구축, 데이터 소스를 직접 보유한 경우 선택 

### Server action 만들기

함수 내에서 'use server';를 붙이는 것만으로도 서버 측 액션을 생성할 수 있다

cf. 'use server'가 절대적으로 서버에서만 동작하는 것을 보장하는 것은 아니다. 'only server'를 적용해서 서버에서만 동작하도록 보장할 수는 있다.

### 이미지 저장: Cloudinary

이미지를 NextJS 프로젝트에 저장할 수 없다. 이를 대신해 저장하기 위해서 `AWS S3`나 `Cloudinary` 서비스를 사용하는 것을 추천.

링크 : https://console.cloudinary.com

- `npm install cloudinary` 설치

- lib/cloudinary.ts 생성

- 환경 변수 설정 (.evn.local)

### 좋아요 기능

### 페이지 데이터 캐싱

NextJS는 꽤나 공격적으로 페이지 데이터를 캐싱한다. → 페이지 기본값으로 반영된 데이터의 변화를 감지하지 않는다 (db에 변화가 적용됨에도 페이지가 업데이트되지 않음)

`revalidatePath`를 통해 해당 경로에 있는 캐시를 재생성할 수 있도록 설정해줘야 한다

```ts
export async function togglePostLikeStatus(postId: any) {
  await updatePostLikeStatus(postId, 2);
  revalidatePath('/', 'layout');  // 페이지 캐시 재생성, 두번째 파라미터로 layout을 넘기면 모든 페이지가 재생성됨
}
```

### UX 증대

좋아요 기능 클릭 시 db에 적용, 업데이트 된 내용이 revalidatePath를 통해 화면에 적용되기까지 시차가 발생 → 유저 화면에 선반영해서 UX를 증대시킬 수 있다. `useOptimistic`

#### useOptimistic

비동기 작업의 낙관적 업데이트를 쉽게 구현할 수 있도록 돕는 React Hook, 사용자의 작업 결과가 실제 서버 응답을 기다리지 않고 UI에 즉시 반영되도록 하는데 사용

### caching difference : develop vs production

production 모드로 실행해보자 (`npm start`). 게시글 업로드 시, 기본 화면에서 업로드 된 내역이 보이지 않는다. NextJS의 공격적인 캐싱 때문

따라서, NextJS에게 데이터를 바꿀 때마다 페이지 일부를 다시 렌더링하도록 지시해줄 필요가 있다 : revalidatePath