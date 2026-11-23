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
      const tasks = await prisma.aiTask.findMany({
        take: 30,
        orderBy: { createdAt: "desc" },
        include: { employee: true, logs: true },
      });
      return NextResponse.json({ tasks });
    } catch (e: any) {
      console.warn("Prisma aiTask findMany fallback:", e.message);
      return NextResponse.json({ tasks: [] });
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
    const { title, description, assignedTo, priority = "MEDIUM", inputData } = body;

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
    }

    const taskNumber = `TASK-${Date.now().toString().slice(-6)}`;
    const taskId = `task_${Date.now()}`;

    const newTask = {
      id: taskId,
      taskNumber,
      title,
      description,
      assignedTo: assignedTo || "MANAGER",
      priority,
      status: "IN_PROGRESS",
      inputData: inputData ? JSON.stringify(inputData) : null,
      approvalRequired: true,
      createdAt: new Date().toISOString(),
    };

    try {
      await prisma.aiTask.create({
        data: {
          id: taskId,
          taskNumber,
          title,
          description,
          assignedTo: assignedTo || "MANAGER",
          priority,
          status: "IN_PROGRESS",
          inputData: inputData ? JSON.stringify(inputData) : null,
          approvalRequired: true,
        },
      });

      await prisma.aiTaskLog.create({
        data: {
          id: `log_${Date.now()}`,
          taskId,
          employeeCode: assignedTo || "MANAGER",
          step: "TASK_INITIALIZED",
          message: `Owner initiated task ${taskNumber}: "${title}"`,
          logLevel: "INFO",
        },
      });
    } catch (dbErr: any) {
      console.warn("Prisma task create fallback:", dbErr.message);
    }

    return NextResponse.json({ success: true, task: newTask });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
