'use client';

import { useRouter } from "next/router";

export default function ModalBackdrop() {
  const router = useRouter();  // from next/navigation, 라우터 객체에 액세스 권한을 부여

  return (
    <div className="modal-backdrop" onClick={router.back}></div>
  );
}