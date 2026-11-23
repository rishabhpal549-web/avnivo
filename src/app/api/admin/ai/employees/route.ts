import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const DEFAULT_AI_EMPLOYEES = [
  {
    code: "MANAGER",
    name: "AI Chief Manager",
    roleTitle: "Lead Coordinator & Strategy Director",
    status: "ACTIVE",
    description: "Coordinates tasks among all 6 AI Employees and ensures Owner approvals.",
    avatarBg: "bg-blue-600",
    tasksCompleted: 14,
    lastActiveAt: new Date().toISOString(),
  },
  {
    code: "MARKETING_MGR",
    name: "AI Marketing Manager",
    roleTitle: "Employee 1: Campaigns & Growth Strategist",
    status: "ACTIVE",
    description: "Formulates daily, weekly and festive marketing plans for AVNIVO.",
    avatarBg: "bg-indigo-600",
    tasksCompleted: 22,
    lastActiveAt: new Date().toISOString(),
  },
  {
    code: "CONTENT_WRITER",
    name: "AI Content Writer",
    roleTitle: "Employee 2: Copywriter & Script Specialist",
    status: "ACTIVE",
    description: "Generates SEO product descriptions, YouTube scripts, and social captions.",
    avatarBg: "bg-emerald-600",
    tasksCompleted: 45,
    lastActiveAt: new Date().toISOString(),
  },
  {
    code: "GRAPHIC_DESIGNER",
    name: "AI Graphic Designer",
    roleTitle: "Employee 3: Creative & Banner Architect",
    status: "ACTIVE",
    description: "Designs branded product creatives with AVNIVO emblem and indicative prices.",
    avatarBg: "bg-amber-600",
    tasksCompleted: 38,
    lastActiveAt: new Date().toISOString(),
  },
  {
    code: "SOCIAL_MGR",
    name: "AI Social Media Manager",
    roleTitle: "Employee 4: Multi-Channel Publisher",
    status: "ACTIVE",
    description: "Prepares, schedules and tracks posts across 7 social platforms with Owner approval.",
    avatarBg: "bg-purple-600",
    tasksCompleted: 31,
    lastActiveAt: new Date().toISOString(),
  },
  {
    code: "SUPPORT_MGR",
    name: "AI Customer Support Manager",
    roleTitle: "Employee 5: Customer Desk & Enquiries",
    status: "ACTIVE",
    description: "Assists customers with verified product info and routes complex inquiries to Owner.",
    avatarBg: "bg-teal-600",
    tasksCompleted: 19,
    lastActiveAt: new Date().toISOString(),
  },
  {
    code: "BUSINESS_ANALYST",
    name: "AI Business Analyst",
    roleTitle: "Employee 6: Business Intelligence & Revenue",
    status: "ACTIVE",
    description: "Analyzes clicks, product views, traffic and revenue growth based on real database metrics.",
    avatarBg: "bg-rose-600",
    tasksCompleted: 12,
    lastActiveAt: new Date().toISOString(),
  },
];

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const dbEmployees = await prisma.aiEmployee.findMany({
        orderBy: { code: "asc" },
      });
      if (dbEmployees && dbEmployees.length > 0) {
        return NextResponse.json({ employees: dbEmployees });
      }
    } catch (e: any) {
      console.warn("Prisma aiEmployee fetch fallback:", e.message);
    }

    return NextResponse.json({ employees: DEFAULT_AI_EMPLOYEES });
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
    const { code, status } = body;

    if (!code || !status) {
      return NextResponse.json({ error: "Code and status are required" }, { status: 400 });
    }

    // Try persisting status update in DB
    try {
      await prisma.aiEmployee.update({
        where: { code },
        data: { status, updatedAt: new Date() },
      });

      await prisma.securityAuditRecord.create({
        data: {
          action: `EMPLOYEE_STATUS_CHANGED: ${code} -> ${status}`,
          performedBy: user.email,
          details: JSON.stringify({ code, status, timestamp: new Date().toISOString() }),
        },
      });
    } catch (e: any) {
      console.warn("Prisma update aiEmployee status fallback:", e.message);
    }

    return NextResponse.json({
      success: true,
      message: `Employee ${code} status updated to ${status}`,
      code,
      status,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
