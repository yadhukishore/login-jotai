export function setCookie(name, value, expiresInDays) {
  const date = new Date();
  date.setTime(date.getTime() + expiresInDays * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  const isSecure = globalThis.location.protocol === "https:";
  document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax${
    isSecure ? "; Secure" : ""
  }`;
}

export function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split("=");
    if (cookieName === name) return cookieValue;
  }
  return null;
}

export function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function isAuthenticated() {
  return !!getCookie("access_token");
}

export function isResetTokenValid() {
  return !!getCookie("resetToken");
}
