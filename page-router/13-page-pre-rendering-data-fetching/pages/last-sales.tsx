'use client';
import { useEffect, useState } from "react"
import useSWR from "swr";

interface Sales {
  id: string;
  username: string;
  volume: number;
}

export default function LastSalesPage(props: any) {
  const [sales, setSales] = useState<Sales[]>(props.sales);
  const { data, error } = useSWR("https://nextjs-course-1e864-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json")  // useSWR: 데이터를 가져오는 훅, fetch 대신 사용
  
  useEffect(() => {
    const transformedSales = [];

    if (data) {
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    }
  }, [data]);

  if (error) {
    return <p>Failed to load</p>
  }

  if (!data && !sales) {
    return <p>Loading...</p>
  }

  return <ul>
    {sales.map((sale) => (
      <li key={sale.id}>
        {sale.username} - ${sale.volume}
      </li>
    ))}
  </ul>
}

export async function getStaticProps(context: any) {
  const response = await fetch("https://nextjs-course-1e864-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json");
  const data = await response.json()
    const transformedSales = [];

    for (const key in data) {
      transformedSales.push({
        id: key,
        username: data[key].username,
        volume: data[key].volume,
      });
    };

  return { props: { sales: transformedSales }, revalidate: 10 };
}