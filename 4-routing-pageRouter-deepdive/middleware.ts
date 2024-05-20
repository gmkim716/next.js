import { NextResponse } from "next/server";

export default function middleware(request: any) {
  // console.log(request); 
  return NextResponse.next(); 
}

export const config = {
  matcher: '/news',  // 미들웨어를 적용할 경로를 설정할 수 있다 
}