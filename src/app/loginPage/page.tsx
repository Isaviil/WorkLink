import { getServerSession } from "next-auth/next";
import Login from "./login";
import { authOptions } from "../context/auth/authOptions";
import { redirect } from "next/navigation";



export default async function Page(){

    const session = await getServerSession(authOptions);

    if (session){
        redirect("/homePage");
    }

    return <Login/>
}