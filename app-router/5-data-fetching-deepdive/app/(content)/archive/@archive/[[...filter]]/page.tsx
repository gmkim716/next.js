import NewsList from "@/components/news-list";
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/lib/news";
import Link from "next/link";
import { Suspense } from "react";

async function FilterHeader({year, month}: {year: string, month: string}) {
  const availableYears = await getAvailableNewsYears(); 
  let links = availableYears;

  if (year && !month) {
    links = getAvailableNewsMonths(year);
  }

  if (year && month) {
    links = [];
  }

  if (
    (year && !availableYears.includes(year)) ||
    (month &&
      !getAvailableNewsMonths(year).includes(month))
  ) {
    throw new Error("Invalid filter");  // error page 이동 
  }

  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map((link) => {
            const href = year
              ? `/archive/${year}/${link}`
              : `/archive/${link}`;

            return (
              <li key={link}>
                <Link href={href}>{link}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  )

}

export async function FilteredNews({year, month}: {year: string, month?: string}) {
  let news;

  if (year && !month) {
    news = await getNewsForYear(year);
  } else if (year && month) {
    news = await getNewsForYearAndMonth(year, month);
  }

  let newsContent = <p>No news found for the selected period.</p>;

  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }

  return newsContent;
}

export default async function FilteredNewsPage({
  params,
}: {
  params: { filter: string };
}) {
  const filter = params.filter; // [[...filter]]: catch-all 루트 파라미터

  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];

  return (
    <>
      {/* 일반적인 loading.tsx로 세분화하지 못하는 데이터 전송 로딩에 대해서 Suspense를 사용한다 */}
      {/* 아래 항목에 대해 하나의 Suspense로 관리하는 것도 가능  */}
      <Suspense fallback={<p>Loading filter...</p>}>
        <FilterHeader year={selectedYear} month={selectedMonth} />
      </Suspense>
      <Suspense fallback={<p>Loading news...</p>}> 
        <FilteredNews year={selectedYear} month={selectedMonth} />
      </Suspense>
    </>
  );
}
