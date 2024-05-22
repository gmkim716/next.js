# 8. Optimization

Image 태그를 통해 이미지 설정

- width, height 옵션을 통해서도 크기를 조절할 수 있지만, sizes 옵션을 사용하는 것을 더 권장

header에 위치한 로고 이미지의 경우, 항상 화면위에 떠있어야 하는 특징이 존재

  - Image 태그는 기본적으로 lazy loading으로 이미지를 로딩: 이미지가 보이는 경우에만 보이도록 하는 특징, 브라우저가 로딩 여부를 체크하는 과정을 배제하고 로딩할 수 있도록 해야 함
 
  - Image 태그의 `priority` 옵션: 로드에 대한 옵션 → NextJS에게 항상 보여야 하는 이미지임을 전달
  

### 사용자에 의해 추가된 이미지 

개발자가 의도(설정)한 이미지와는 처리 방식에 차이가 존재한다

- 사이즈에 대해 개발자가 알지 못함

- `fill` 옵션을 추가: 이미지가 제공하는 사이즈로 가능한 모든 공간을 채운다. 따라서 Image 태그를 보통 컨테이너 요소를 추가하거나 CSS를 통해 사이즐르 설정해준다. 
  
- `next.config.mjs`에 이미지 파일을 불러오는 경로에 대한 설정을 추가해야 에러가 발생하지 않는다  
  
```mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{hostname: 'res.cloudinary.com'}]  // 추가 
  }
};

export default nextConfig;
```

### Image Loader
cf. components/post.tsx 참고 

Cloudinary 시스템에서 이미지 크기를 조정, Cloudinary 기능을 사용하려면 이미지 소스로 설정된 URL을 조작해야 한다. 이때의 과정은 Next에서 진행한다

- `loader` 옵션: 이미지 경로를 판단하면 이미지가 제공되고 화면에 렌더링 되기 전에 덮어 쓸수 있는 값을 전달

- `quality` 옵션: 이미지 품질에 대한 설정, 0~100 사이의 값 입력 

## Metadata

Next가 메타데이터를 지원하는 방식, 크롤러에서 웹사이트가 어떻게 보일지를 결정

정적 메타데이터 / 동적 메타데이터

### 방법

가장 간단한 방법은 루트 경로의 page에 메타데이터를 추가하는 것 

```tsx
// page.tsx

// 정적 메타데이터
export const metadata = {
  // 구글 검색이 되었을 때 링크 아래에 표시될 내용들을 기입, 탭에 표시될 내용 
  title: "Hello Monkey",
  description: "Welcome back!",
};

// 동적 메타데이터
export async function generateMetadata() {
  const posts = await getPosts();
  const numberOfPosts = posts.length;
  return {
    title: `Browse all our ${numberOfPosts} posts!`,
    description: ''
  }
}
```

### Layout에 메타데이터를 설정
