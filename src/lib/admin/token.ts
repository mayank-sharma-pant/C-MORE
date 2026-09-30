const COOKIE_NAME = "cmore_admin";
const SESSION_DAYS = 7;

function getSecret() {
  return process.env.ADMIN_SECRET || "cmore-travel-change-this-secret";
}

function base64UrlEncode(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(value: string) {
  const padded = value + "=".repeat((4 - (value.length % 4)) % 4);
  const binary = atob(padded.replace(/-/g, "+").replace(/_/g, "/"));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function sign(data: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return base64UrlEncode(new Uint8Array(signature));
}

export async function createSessionToken() {
  const payload = { exp: Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000 };
  const data = base64UrlEncode(new TextEncoder().encode(JSON.stringify(payload)));
  return `${data}.${await sign(data)}`;
}

export async function verifySessionToken(token: string | undefined | null) {
  if (!token) return false;
  const [data, signature] = token.split(".");
  if (!data || !signature) return false;
  if (signature !== (await sign(data))) return false;
  try {
    const payload = JSON.parse(new TextDecoder().decode(base64UrlDecode(data))) as {
      exp: number;
    };
    return payload.exp > Date.now();
  } catch {
    return false;
  }
}

export { COOKIE_NAME, SESSION_DAYS };
