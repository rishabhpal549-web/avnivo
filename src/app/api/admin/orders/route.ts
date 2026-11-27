import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ibrzfiwskfhlkfdjbyfv.supabase.co";
const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlicnpmaXdza2ZobGtmZGpieWZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUyNjY1NjcsImV4cCI6MjExMDg0MjU2N30.XQALfrWAZbazKNZJpbxXAYr9DBr7IUURKE45jjsfF3o";

function getHeaders() {
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };
}

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  try {
    const endpoint = `${SUPABASE_URL}/rest/v1/Order?select=id,orderNumber,customerName,customerPhone,customerEmail,customerAddress,city,state,pincode,paymentMethod,notes,status,totalAmount,currency,createdAt,updatedAt,items:OrderItem(id,productId,productTitle,productImage,quantity,unitPrice)&order=createdAt.desc`;

    const res = await fetch(endpoint, {
      headers: getHeaders(),
      cache: "no-store",
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Supabase REST orders fetch failed:", res.status, errText);
      return NextResponse.json({ error: "Failed to fetch orders" }, { status: res.status });
    }

    const orders = await res.json();
    return NextResponse.json({ orders });
  } catch (err: any) {
    console.error("Orders GET error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Order ID and status are required" }, { status: 400 });
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/Order?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify({
        status,
        updatedAt: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Failed to update Order status:", res.status, errText);
      return NextResponse.json({ error: "Failed to update order status" }, { status: res.status });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Orders PATCH error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
