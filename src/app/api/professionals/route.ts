import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/context/auth/authOptions";
import { getServerSession } from "next-auth";



export async function POST(req: Request){

    const body = await req.json();

    const { name, lastname, email, password } = body;

    if (!name || !lastname || !email || !password) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const addUser = await prisma.professionals.create({
      data: {
        name: body.name,
        lastname: body.lastname,
        email: body.email,
        password: body.password
      }
    })

    return NextResponse.json(
      { message: "Tu solicitud fue recibida" },
      { status: 201 }
    )
}



export async function GET(req: Request){

    //const session = await getServerSession(authOptions);

    const url = new URL(req.url);
    const id = Number(url.searchParams.get("id"));
    const limit = Number(url.searchParams.get("limit"));

    const found = await prisma.professionals.findMany({
        where: {
            ...(id? {id}: undefined)
        },
        take: limit? limit: undefined,
        include: {galleries: true}
    })

    //borrando la contraseña
    found.forEach(p => delete (p as Partial<typeof p>).password);

    const result = id? found[0]: found;
    console.log(result)

    return NextResponse.json({result});

}


export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  const body = await req.json();

    if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

  const updated = await prisma.professionals.update({
    where: { id: Number(session.user.id) },
    data: {
      name: body.name,
      lastname: body.lastname,
      email: body.email,
      description: body.description,
      district: body.district,
      city: body.city,
      maps_url: body.maps_url,
      price: body.price,
      phone: body.phone,
      profile_picture: body.profile_picture
    },
  });

  //ocultando la password
   delete (updated as Partial<typeof updated>).password;

    return NextResponse.json({
        result: {
        ...updated,
        price: updated.price ? updated.price.toString() : null,
        },
        message: "Datos actualizados"
    });
}