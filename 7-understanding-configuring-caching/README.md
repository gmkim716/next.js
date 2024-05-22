# Understand & Configuring Caching

NextJS는 꽤나 공격적인 캐싱을 진행한다

### 4개의 캐싱 방법

#### 1. Request Memoization

  - NextJS가 데이터 요청을 저장
  - 중복 요청을 피하도록 한다. 

#### 2. Data Cache

  - 별도의 데이터 캐시 
  - 데이터 소스에 페치된 데이터를 재사용. 
  - revalidate 되기 전까지 사용

#### 3. Full Route Cache

  - 전체 HTML 코드에 대응하는 서버 구성 요소 페이로드를 내부에서 관리하고 해당 페이지를 렌더링하는데 사용. 
  - 전제 HTML에 대한 재 렌더링을 방지
  - 관련 데이터를 재할당 될 때까지 지속 
  
#### 4. Router Cache

  - 클라이언트 쪽에 서 관리하는 캐시

### Request Memoization

.. 음.. 잘 이해가 안되서 따로 정리 필요 ..

```tsx
// 기존
export default async function MessagePage() {
  const response = await fetch('http://localhost:8080/messages', {
    headers: {
      'X-ID': 'page',
    },
  });
  ...
}

export default async function MessagesLayout({ children }: { children: React.ReactNode }) {
  const response = await fetch('http://localhost:8080/messages', {
    headers: {
      'X-ID': 'layout',
    },
  });
  ...
}
```

```shell
2024-05-22T01:27:47.629Z: EXECUTING /messages on backend from layout
2024-05-22T01:31:41.141Z: EXECUTING /messages on backend from page
2024-05-22T01:56:37.816Z: EXECUTING /messages on backend from undefined
```

```tsx
// 변경: header 제거
export default async function MessagePage() {
  const response = await fetch('http://localhost:8080/messages');
  const messages = await response.json();
  ...
}

export default async function MessagesLayout({ children }: { children: React.ReactNode }) {
  const response = await fetch('http://localhost:8080/messages');
  const messages = await response.json();
  const totalMessages = messages.length;
  ...
}
```

### Data Cache

fetch 함수 설정을 통해 캐싱을 컨트롤할 수 있다. 또는 파일 간 세팅을 추가할 수도 있다.

요청을 수동으로 구성하는 대신 단계별로 전체 파일을 위한 구성을 설정할 수도 있다. 2개의 특별한 상수를 사용해 가능 

지정된 변수명을 통해 header에 cache 옵션을 더욱 편하게 설정 가능
- revalidate
- dynamic

unstable_noStore 등에 대해 업데이트 예정이므로 공식문서 참고하며 사용할 것 


### revalidatePath()

- 캐시 재설정에 대해 개발자가 의도한 시점에 동작시킬 수 있다는 점이 큰 장점 

### revalidateTag() 

- 해당 태그가 있는 캐시 데이터(fetch 메서드로 옵션(next)에 설정한 태그)에 해당하는 데이터를 버릴 수 있다 

# ※ 내용이 쉽게 이해되지 않아서 강의부터 수강 후 다시 공부하기..!!