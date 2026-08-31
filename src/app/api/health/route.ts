/**
 * Liveness probe for the container healthcheck and for the deploy script to
 * confirm the new image is actually serving before nginx keeps sending it
 * traffic. Kept dynamic so it reflects the running process, not build time.
 */
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ status: "ok", uptime: process.uptime() });
}
