"use client"; 
import Gallery from "./gallery";
import { useState } from "react";

export default function Page() {
  const [galleries, setGalleries] = useState([]); 
  const [canEdit, setCanEdit] = useState(false); 

  return <Gallery galleries={galleries} canEdit={canEdit} />;
}