import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/context/auth/authOptions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const images: { professional_id: number; image_url: string }[] = await req.json();

  const created = await prisma.galleries.createMany({
    data: images,
  });

  return NextResponse.json({ result: created, message: "Images added" });
}