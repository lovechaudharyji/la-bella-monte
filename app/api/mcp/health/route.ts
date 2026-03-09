import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const missing: string[] = []
    if (!process.env.SUPABASE_URL) missing.push('SUPABASE_URL')
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) missing.push('SUPABASE_SERVICE_ROLE_KEY')

    if (missing.length) {
      return NextResponse.json({ ok: false, missing }, { status: 500 })
    }

    return NextResponse.json({
      ok: true,
      env: {
        SUPABASE_URL: true,
        SUPABASE_SERVICE_ROLE_KEY: true,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
