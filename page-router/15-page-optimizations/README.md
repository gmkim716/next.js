# 15. Page Optimizations

- Meta 데이터 추가, Head 태그

- 컴포넌트, 로직, 설정 재사용 

- 이미지 최적화

## Head Metadata

- NextJS에서 제공하는 <Head> 컴포넌트가 있다

- 상단 탭에 children이 표기됨

- <meta> 태그를 안에 포함해서 name, content 포함할 수 있다 

- {}를 이용해서 동적 정보를 입력 가능


```tsx
<Head>
  <meta 
    name="description"
    content="Find a lot of greate events that allow you to evolve..."
  />
</Head>
```

### __app.tsx

- _app.tsx에서 Head를 설정하면 편리하다

### __document.tsx

- 애플리케이션 셸을 다뤘던 __app.tsx와 달리 __document.tsx는 전체 HTML 문서에 대한 사용자 지정을 할 수 있게 해준다

### Image 최적화

- 이미지 최적화 작업을 하지 않으면, 페이지를 로딩할 때 원본 이미지 데이터가 전송된다 (대체로 MB 사이즈를 갖는다). Chrome은 렌더링 되는 이미지에 대한 최적화된 이미지 형식(webp)을 지원한다. 

```tsx
<Image src={'/'+image} alt={title} width={250} height={250} />
```

- 지연로딩 : 이미지가 보이지 않아도 되는 때는 데이터를 받아오지 않지만, 보여져야 할 때 데이터를 받아올 수 있도록 함
    
  ex) 좁은 가로 화면에서 이미지가 표시되지 않지만, 넓은 화면에서 이미지가 보이는 페이지를 구성한 경우

- 자세한 옵션은 NextJS 문서를 참고하도록 하자