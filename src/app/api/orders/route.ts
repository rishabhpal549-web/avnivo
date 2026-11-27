import { NextRequest, NextResponse } from "next/server";

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      productId,
      quantity = 1,
      customerName,
      customerPhone,
      customerEmail,
      customerAddress,
      city,
      state,
      pincode,
      paymentMethod = "COD",
      notes,
    } = body;

    // Validation
    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }
    if (!customerName || !customerName.trim()) {
      return NextResponse.json({ error: "Customer name is required" }, { status: 400 });
    }
    if (!customerPhone || customerPhone.trim().length < 10) {
      return NextResponse.json({ error: "A valid 10-digit mobile number is required" }, { status: 400 });
    }
    if (!customerAddress || !customerAddress.trim()) {
      return NextResponse.json({ error: "Delivery address is required" }, { status: 400 });
    }
    if (!pincode || pincode.trim().length < 6) {
      return NextResponse.json({ error: "A valid 6-digit delivery pincode is required" }, { status: 400 });
    }

    const qty = Math.max(1, parseInt(quantity, 10) || 1);

    // 1. Fetch product to get verified price & title
    const prodRes = await fetch(
      `${SUPABASE_URL}/rest/v1/Product?id=eq.${encodeURIComponent(productId)}&select=id,name,indicativePrice,images`,
      {
        headers: getHeaders(),
        cache: "no-store",
      }
    );

    if (!prodRes.ok) {
      return NextResponse.json({ error: "Could not find product details" }, { status: 404 });
    }

    const prods = await prodRes.json();
    if (!prods || prods.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const prod = prods[0];
    const unitPrice = Number(prod.indicativePrice) || 0;
    const totalAmount = unitPrice * qty;

    let thumbImage = "";
    try {
      const parsed = JSON.parse(prod.images);
      thumbImage = parsed[0] || "";
    } catch {
      thumbImage = prod.images || "";
    }

    // 2. Generate unique order IDs
    const nowIso = new Date().toISOString();
    const orderNumber = `AVN-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
    const orderId = `ord_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const itemId = `item_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // 3. Insert Order
    const orderPayload = {
      id: orderId,
      orderNumber,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: (customerEmail || "").trim() || null,
      customerAddress: customerAddress.trim(),
      city: (city || "").trim(),
      state: (state || "").trim(),
      pincode: pincode.trim(),
      paymentMethod: paymentMethod.toUpperCase() === "UPI" ? "UPI" : "COD",
      notes: (notes || "").trim() || null,
      status: "PENDING",
      totalAmount,
      currency: "INR",
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    const createOrderRes = await fetch(`${SUPABASE_URL}/rest/v1/Order`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(orderPayload),
    });

    if (!createOrderRes.ok) {
      const errText = await createOrderRes.text();
      console.error("Failed to insert Order:", createOrderRes.status, errText);
      return NextResponse.json({ error: "Failed to place order in system" }, { status: 500 });
    }

    // 4. Insert OrderItem
    const itemPayload = {
      id: itemId,
      orderId,
      productId: prod.id,
      productTitle: prod.name,
      productImage: thumbImage,
      quantity: qty,
      unitPrice,
      createdAt: nowIso,
    };

    const createItemRes = await fetch(`${SUPABASE_URL}/rest/v1/OrderItem`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(itemPayload),
    });

    if (!createItemRes.ok) {
      const errText = await createItemRes.text();
      console.error("Failed to insert OrderItem:", createItemRes.status, errText);
    }

    return NextResponse.json({
      success: true,
      order: {
        id: orderId,
        orderNumber,
        productName: prod.name,
        quantity: qty,
        unitPrice,
        totalAmount,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerAddress: customerAddress.trim(),
        city: city || "",
        state: state || "",
        pincode: pincode.trim(),
        paymentMethod: orderPayload.paymentMethod,
        createdAt: nowIso,
      },
    });
  } catch (err: any) {
    console.error("Order creation route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
