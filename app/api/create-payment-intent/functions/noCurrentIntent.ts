import { NextResponse } from "next/server";

export default function noCurrentIntent() {
  console.error("Error in retrieving payment intent");
  return NextResponse.json(
    { error: "Error in retrieving payment intent" },
    { status: 400 }
  );
}
