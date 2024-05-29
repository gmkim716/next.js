import path from 'path';
import fs from 'fs/promises'
import Link from 'next/link';

export default function HomePage(props: any) {
  const { products } = props;
  return (
    <ul>{products.map((product: any) => (
      <li key={product.id}>
        <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
    ))}
    </ul>
  );
}

// getStaticProps: 페이지를 미리 렌더링하기 위해 데이터를 가져온다
export async function getStaticProps(context: any) {
  console.log('(Re-)Generating page...')
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');  // join: 경로를 합치는 메서드, cwd: 현재 작업 디렉토리 
  const jsonData = await fs.readFile(filePath); 
  const data = JSON.parse(jsonData.toString());

  return {
    // products의 data.products를 가져오기
    props: {
      products: data.products  
    },
    revalidate: 10  // ISR: 10초마다 재생성
  };
}
