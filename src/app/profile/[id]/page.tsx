"use client";
import Profile from "../profile";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams(); // client-side hook
  const id = Number(params.id);

  return <Profile id={id} />;
}