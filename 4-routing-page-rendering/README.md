# 4-routing-page-rendering

### 136. url 파라미터 사용하기

params로 값을 props 받고, 사용된 폴더명을 가져와 사용 가능하다

```js
export default function NewsPage({ params }) {
  const newId = params.id;
```
