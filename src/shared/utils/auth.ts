import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  sub: string;
  exp: number;
}

const CREDENTIALS = {
  email: "fatema.ahmed@student.manahil.edu",
  password: "009-555-1003",
  deviceId: "web-app",
} as const;

// ── IMPORTANT: Find the real login URL in Swagger and update this ──────────
// Common patterns to try if current one gives 404:
//   /api/v1/Auth/Login
//   /api/v1/Account/Login
//   /api/v1/Identity/login
//   /api/v1/Users/login
const LOGIN_URL = "/api/v1/users/login";
// ─────────────────────────────────────────────────────────────────────────────

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function saveToken(token: string): void {
  localStorage.setItem("token", token);
}

function isTokenValid(token: string): boolean {
  try {
    const { exp } = jwtDecode<TokenPayload>(token);
    return exp > Date.now() / 1000 + 10;
  } catch {
    return false;
  }
}

export async function ensureToken(): Promise<string> {
  const stored = getToken();
  if (stored && isTokenValid(stored)) return stored;

  const response = await axios.post<{ accessToken: string }>(
    LOGIN_URL,
    CREDENTIALS
  );
  const token = response.data.accessToken;
  saveToken(token);
  return token;
}

export function getAuthUserId(): string | null {
  const token = getToken();
  if (!token) return null;
  try {
    return jwtDecode<TokenPayload>(token).sub;
  } catch {
    return null;
  }
}
