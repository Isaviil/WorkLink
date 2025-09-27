import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request){


    //const url = new URL(req.url);
    //const id = Number(url.searchParams.get("id"));

    const locations = await prisma.professionals.findMany({
    select: { district: true },
    distinct: ["district"]
    });

    return NextResponse.json({locations});
}

