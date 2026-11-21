import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  try {
    await prisma.product.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (err: any) {
    console.error("Delete product error:", err);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
