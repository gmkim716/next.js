# Next Authentication

## 유저 생성

유저를 생성할 때 비밀번호는 `해싱된 값`을 이용하도록 한다

### Third Pary Tool : Lucia Auth

Lucia Auth 툴 사용, 참고: https://lucia-auth.com/
NextAuth도 있지만 현재(24년 4월 강의) 기준, Next14와 App Router 간의 에러가 발생

```shell
  npm install lucia
```

## 코드 적용

1. form 태그와 useFormState를 연결: /components/auth-form

```tsx
export default function AuthForm() {
  // useFormState 추가, signup 메서드를 연결하고, 초기값으로 errors를 입력해준다.
  const [formState, formAction] = useFormState(signup, {
    errors: { email: "", password: "" },
  });
  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      ...
      {formState?.errors && ( // formState에 error값이 있을 경우 나타나도록 하는 안내 문구
        <ul id="form-errors">
          {Object.keys(formState.errors).map((error) => (
            <li key={error}>{formState.errors[error]}</li>
          ))}
        </ul>
      )}
    </form>
  );
}
```

2. signup 메서드 생성: /actions/auth-actions

```ts
"use server"; // 서버 컴포넌트 선언

import { createAuthSession } from "@/lib/auth";
import { hashUserPassword } from "@/lib/hash";
import { createUser } from "@/lib/user";
import { redirect } from "next/navigation";

interface Errors {
  email?: string;
  password?: string;
}

export async function signup(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  let errors: Errors = {};

  // 유효성 검사 진행
  if (!email.includes("@")) {
    errors.email = "유효한 이메일을 입력해주세요";
  }

  if (password?.trim().length < 8) {
    errors.password = "비밀번호는 8자 이상이어야 합니다";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  // 비밀번호 해싱 후 사용자 생성
  const hashedPassword = hashUserPassword(password);
  try {
    const id = createUser(email, hashedPassword).toString(); // cf. toString() 메서드 필수 여부가 불명확
    await createAuthSession(id);
    redirect("/training");
  } catch (error: any) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      errors.email = "이미 사용 중인 이메일입니다";
      return {
        errors: {
          email: "이미 사용 중인 이메일입니다.",
        },
      };
    }
    throw error;
  }
}
```

3. createAuthSession: /lib/auth.ts

Application에 auth_session이 해시값으로 저장된 기록을 확인할 수 있다
![](./capture/스크린샷%202024-05-18%20오후%204.31.25.png)

Cookie에 auth_session 기록이 추가된 것을 확인할 수 있다
![](./capture/스크린샷%202024-05-18%20오후%204.34.58.png)

## 유저가 로그인했을 때만 보이는 layout

- `(auth)` 폴더(라우터) 생성
- auth 경로로 접속했을 때만 보이는 레이아웃 설정이 가능하다
