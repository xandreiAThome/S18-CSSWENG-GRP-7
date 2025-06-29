import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    return new Promise(resolve => {
      db.query("SELECT NOW() AS time", (err, results) => {
        if (err) {
          resolve(
            NextResponse.json(
              { error: "Query failed", details: err.message },
              { status: 500 }
            )
          );
        } else {
          resolve(
            NextResponse.json({
              message: "success",
              data: results,
              timestamp: new Date().toISOString(),
            })
          );
        }
      });
    });
  } catch {
    return NextResponse.json(
      { error: "Database connection failed" },
      { status: 500 }
    );
  }
}
