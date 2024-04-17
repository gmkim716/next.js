import path from 'path';  // from node.js
import fs from 'fs/promises';  // from node.js

function HomePage(props: any) {
  const { products } = props;

  return (
    <ul>
      {products.map((product: any) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

// getStaticProps: 페이지를 그려내기 전에 먼저 데이터를 가져오는 함수
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');  // cwd: Current Working Directory 
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString()); 

  return { 
    props: {
      products: data.products
    }
  };
}

export default HomePage;