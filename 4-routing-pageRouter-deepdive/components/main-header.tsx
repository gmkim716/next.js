"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NavLink from "./nav-link";

export default function MainHeader() {

  const path = usePathname();  // usePathname: 현재 활성화된 경로 확인

  return (
    <header id="main-header">
      <div id="logo">
        <Link href="/">NextNews</Link>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink href="/news">News</NavLink>
          </li>
          <li>
            <NavLink href="/archive">Archive</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
