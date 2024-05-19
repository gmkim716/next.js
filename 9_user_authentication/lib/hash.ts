import crypto from "node:crypto";

export function hashUserPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");

  const hashedPassword = crypto.scryptSync(password, salt, 64);
  return hashedPassword.toString("hex") + ":" + salt;
}

export function verifyPassword(
  storedPassword: string,
  suppliedPssword: string
) {
  const [hashedPassword, salt] = storedPassword.split(":");
  const hashedPasswordBuffer = Buffer.from(hashedPassword, "hex");
  const suppliedPasswordBurffer = crypto.scryptSync(suppliedPssword, salt, 64);
  return crypto.timingSafeEqual(hashedPasswordBuffer, suppliedPasswordBurffer);
}
