import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, type, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const user = await getCurrentUser();

    const inquiry = await prisma.supportInquiry.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : null,
        subject: subject || "Customer Inquiry",
        type: type || "GENERAL",
        message: message.trim(),
        userId: user ? user.userId : null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Your inquiry has been received. Ticket ID: #" + inquiry.id.slice(-6).toUpperCase(),
      id: inquiry.id,
    });
  } catch (err: any) {
    console.error("Support submission error:", err);
    return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 });
  }
}
