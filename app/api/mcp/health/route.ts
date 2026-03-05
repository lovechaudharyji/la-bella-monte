import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Basic connectivity test
    // We try to list buckets as a generic admin check since we don't know specific table names yet
    // Or we can just return ok: true as per basic instructions, 
    // but the user's "Step 6" suggests adding a DB test.
    // Since I don't know a valid table name for sure, I'll stick to the basic health check 
    // but add a comment about where to add the DB test.
    
    // However, the prompt Step 4 says "return NextResponse.json({ ok: true })" 
    // and Step 6 is "Optional". I will implement Step 4 first to ensure success.
    
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
