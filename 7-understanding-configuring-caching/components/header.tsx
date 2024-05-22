import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div id="logo">
        <Link href="/">NextCaching</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/messages">Messages</Link>
          </li>
          <li>
            <Link href="/messages/new">New Messages</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}