import logo from '@/assets/logo.png';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header id="main-header">
      <Link href="/">
        <Image src={logo} 
          // width={100}
          // height={100}
          sizes="10vw"  // width, height 대신 사용 권장
          priority 
          alt="Mobile phone with posts feed on it" />  {/* next/image의 이미지 태그 사용 */}
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/feed">Feed</Link>
          </li>
          <li>
            <Link className='cta-link' href="/new-post">New Post</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
