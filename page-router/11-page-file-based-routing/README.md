# 11 Page & File based Routing

### 동적 라우팅

- [portfolio].tsx와 같은 파일 명으로 생성

- `useRouter`를 통해 경로의 변수를 가져올 수 있다

- 폴더 기반 라우터 vs 파일 기반 라우터 중에서 **파일 기반 라우팅** 방식이 조금 더 직관적이므로 사용을 권장

```tsx
const router = useRouter();

const pathname = router.pathname;
const query = router.query;
```
