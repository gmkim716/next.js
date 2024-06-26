# 13. Page pre-rendering & data fetching

## Summary 

- `getStaticProps`는 클라이언트 브라우저에서 실행되지 않는 코드를 실행할 수 있다 

- revalidate를 통해 이미 렌더링된 데이터를 업데이트 가능하다

- `getStaticPaths`는 동적 경로의 페이지를 미리 렌더링 하도록 설정할 수 있다 

- 항상 변하는 데이터를 전달하고 싶을 때 SSR 방식의 `getServerSideProps`를 사용할 수 있다.

- CSR 방식으로 데이터 페치를 진행할 때 `useSWR` 훅 사용을 고려해 볼 수 있다. 

## Note 

### NextJS pre-render by default

- NextJS는 기본적으로 정적 페이지를 사전에 미리 렌더링한다

### getStaticProps

- 미리 생성되어야 하는 페이지임을 알리는 함수 

- 페이지라 로딩된 후에 CSR로 데이터를 로딩하고 싶지 않을 때, 데이터를 미리 페치하기 위해 사용 

- async/await 사용 필수 

- 객체는 정적 props를 가져온다 

- client에게 데이터 페치 과정이 전달되는 것이 아니기 때문에 서버 측 작업을 숨긴 채 수행할 수 있다. 
 

```tsx
export async function getStaticProps(context: any) {
  
  return { 
    props: {  
      products: [{ id: 'p1', title: 'Product 1' }]  // dummy-backend.json 내부 데이터 
    },
    revalidate: 10,
     
    notFound: true,  // 특수 옵션1: 찾지못할 경우 404 에러 반환
    redirect: '/',  // 특수 옵션2: 다른 경로로 렌더링 가능 
  }
}
```

### ISR: 증분 정적 재생성

- 정적 페이지를 지속적으로 업데이트

- `revalidate` 옵션을 추가


### 라우터를 이용한 매개변수 추출과 getStaticProps의 차이

- 컴포넌트 함수에서 매개변수를 추출하면 컴포넌트 안에서 사용할 수 있다 (단, 브라우저 내에서만 가능)

- getStaticProps는 페이지 사전 렌더링을 위해 데이터를 준비할 때 사용되며, 서버에서 발생한다. 구성 요소 함수가 실행되기 전에 실행.

- 서버에서 페이지를 준비하거나, getStaticProps를 사용해 빌드 프로세스 중에 페이지를 준비하려는 경우 → getStaticProps 내부의 동적 경로 세그먼트에 대한 매개변수를 사용하도록 한다 

### getStaticPaths for Dynamic Pages

- Next는 페이지를 기본값으로 미리 생성하는 특징이 있다
 
- 그런데, 동적 페이지(이름에 대괄호를 갖는 페이지)는 미리 생성되는 페이지 대상이 아니다. 따라서 동적 페이지는 서버에서 호출 즉시 생성된다.

- 동적 페이지에 getStaticProps를 추가하면 페이지를 미리 렌더링하게 된다(호출 시 생성 x). node가 생성해야 하는 페이지 수와 필요한 동적 세그먼트의 값을 알 수 없다. → 동적 경로에 대해 Next를 제공해야 더 많은 정보를 얻을 수 있다 

- 어느 경로에 동적 페이지 인스턴스는 미리 생성되어야 하는지 알려야 함, 해당 페이지 청사진의 여러 인스턴스를 Next에서 미리 생성할 수 있다. = `getStaticPaths`

### getStaticPaths

- 페이지 구성 요소 파일에 추가 가능

- fallback 옵션: 미리 생성해야 하는 페이지가 많은 경우 도움이 된다. 자주 방문하는 페이지와 아닌 경우를 구분. 

### Loading path dynamically


### getServerSideProps for SSR 

- NextJS에서 SSR작업을 수행하도록 하는 매서드 

- 페이지 구성 파일에만 추가 가능 

- 데이터가 실시간으로 바뀌는 상황 사용에 적합 

```tsx
export async function getServerSideProps(context: any) {
  const { params, req, res } = context;

  return {
    props: {
      username: 'Max'
    }
  }
}
```

### CSR


### useSWR

- SWR : vercel에서 만든 앱, Next가 개발한 리액트 훅, stale-while-revalidate를 의미

- 기본값으로 fetch API를 사용해 http 요청을 전송

- 캐싱이나 자동 재조정 에러 같은 부가적인 기능을 제공  

#### 사용법

- 설치 : npm install swr

cf. fetcher를 적용해야 함 `useSWR(<request-url>, (url) => fetch(url).then(res => res.json()))`

