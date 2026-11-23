import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const [channels, recentPosts] = await Promise.all([
        prisma.socialChannelAccount.findMany({
          orderBy: { createdAt: "asc" },
        }),
        prisma.socialMediaPost.findMany({
          take: 20,
          orderBy: { createdAt: "desc" },
        }),
      ]);

      return NextResponse.json({ channels, recentPosts });
    } catch (dbErr: any) {
      console.warn("Prisma social lookup fallback:", dbErr.message);
      return NextResponse.json({ channels: [], recentPosts: [] });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized. Owner only." }, { status: 401 });
    }

    const body = await req.json();
    const { action, platform, accountHandle, accountName, profileUrl, isConnected } = body;

    if (action === "UPDATE_CHANNEL") {
      if (!platform) {
        return NextResponse.json({ error: "Platform is required" }, { status: 400 });
      }

      const updated = await prisma.socialChannelAccount.upsert({
        where: { platform },
        update: {
          accountHandle,
          accountName,
          profileUrl,
          isConnected: isConnected !== undefined ? isConnected : true,
          authStatus: isConnected ? "CONNECTED" : "NOT_CONFIGURED",
          lastSyncAt: new Date(),
        },
        create: {
          platform,
          accountHandle,
          accountName,
          profileUrl,
          isConnected: isConnected || false,
          authStatus: isConnected ? "CONNECTED" : "NOT_CONFIGURED",
        },
      });

      // Audit log
      await prisma.securityAuditRecord.create({
        data: {
          action: `UPDATE_CHANNEL: ${platform}`,
          performedBy: user.email,
          details: JSON.stringify({ platform, accountHandle, isConnected }),
        },
      });

      return NextResponse.json({ success: true, channel: updated });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
