import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.formData();
  const name = data.get("name") || "friend";
  const favorite = data.get("favorite") || "cute things";
  const message = data.get("message") || "Sending a smile!";

  return NextResponse.json({
    status: "success",
    text: `Thanks, ${name}! BIGEM loves ${favorite} and received your message: “${message}”`,
  });
}
