const mcpUrl = process.env.SUPABASE_MCP_URL || "https://mcp.supabase.com/mcp";
const projectRef = process.env.SUPABASE_MCP_PROJECT_REF;
const secret = process.env.SUPABASE_MCP_SECRET_KEY;

export async function mcpHealth() {
  if (!projectRef || !secret) {
    return { ok: false, status: 503, error: "Missing MCP configuration" };
  }
  const url = `${mcpUrl}?project_ref=${projectRef}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${secret}` },
    cache: "no-store",
  });
  let body: unknown = null;
  try {
    body = await res.json();
  } catch {
    body = await res.text();
  }
  return { ok: res.ok, status: res.status, body };
}
