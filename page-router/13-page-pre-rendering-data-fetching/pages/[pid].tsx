import { Fragment } from "react";
import path from 'path';
import fs from 'fs/promises'

export default function ProductDetailPage(props: any) {
  const { loadedProduct } = props;

  return <Fragment>
    <h1>{loadedProduct.title}</h1>
    <p>{loadedProduct.description}</p>
  </Fragment>
}

// context 매개변수 사용 가능: 구체적인 매개변수 값을 가져온다
export async function getStaticProps(context: any) {
  const { params } = context;

  const productId = params.pid;  // 동적 경로를 [pid]와 같이 설정했기 때문에 params.pid로 값을 가져올 수 있다

  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath); 
  const data = JSON.parse(jsonData.toString());

  const product = data.products.find((product: any) => product.id === productId);

  return {
    props: {
      loadedProduct: product
    }
  }
}
