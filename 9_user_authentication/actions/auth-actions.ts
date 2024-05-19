"use server";

import { createAuthSession, destorySession } from "@/lib/auth";
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { createUser, getUserByEmail } from "@/lib/user";
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
    const id = createUser(email, hashedPassword).toString();
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

export async function login(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return {
      errors: {
        email: "등록되지 않은 이메일입니다",
      },
    };
  }

  const isValidPassword = verifyPassword(
    existingUser.password,
    password as string
  );

  if (!isValidPassword) {
    return {
      errors: {
        password: "비밀번호가 일치하지 않습니다",
      },
    };
  }

  await createAuthSession(existingUser.id);
  redirect("/training");
}

export async function auth(mode: string, prevState: any, formData: FormData) {
  if (mode === "login") {
    return login(prevState, formData);
  }
  return signup(prevState, formData);
}

export async function logout() {
  await destorySession();
  redirect("/");
}
