import { Fragment } from "react";
import path from 'path';
import fs from 'fs/promises'

export default function ProductDetailPage(props: any) {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return <p>Loading...</p>
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  ) 
}

export async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath); 
  const data = JSON.parse(jsonData.toString());

  return data;
}

// context 매개변수 사용 가능: 구체적인 매개변수 값을 가져온다
export async function getStaticProps(context: any) {
  const { params } = context;
  
  const productId = params.pid;  // 동적 경로를 [pid]와 같이 설정했기 때문에 params.pid로 값을 가져올 수 있다

  const data = await getData();
  
  const product = data.products.find((product: any) => product.id === productId);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: { 
      loadedProduct: product
    }
  }
}

// 동적 페이지의 인스턴스를 미리 생성
export async function getStaticPaths() {
  const data = await getData(); 
  
  const ids = data.products.map((product: any) => product.id);
  const pathsWithParams = ids.map((id: any) => ({ params: { pid: id } })); 

  return {
    paths: pathsWithParams,  // paths: []: 미리 생성할 페이지의 경로를 설정
    fallback: true,    // fallback: true, false, 'blocking': 404 페이지를 보여줄지, 미리 생성할 페이지를 보여줄지, 로딩 중에 보여줄지 결정
  }
}