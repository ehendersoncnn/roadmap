/**
 * Sets a non-HttpOnly cookie from the browser (module scope) so React Compiler
 * immutability rules do not flag event handlers.
 */
export function writeRoadmapUiCookie(cookieName: string, encodedPayload: string) {
  document.cookie = `${cookieName}=${encodedPayload};path=/;max-age=31536000;SameSite=Lax`;
}
