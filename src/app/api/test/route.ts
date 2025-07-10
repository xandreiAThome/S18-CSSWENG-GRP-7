import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const results = await new Promise<any[]>((resolve, reject) => {
      db.query("SELECT NOW() AS time", (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
    return NextResponse.json({
      message: "success",
      data: results,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Query failed", details: err?.message ?? String(err) },
      { status: 500 }
    );
  }
}
