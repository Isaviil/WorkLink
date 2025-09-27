'use client';
import Edit from "./edit";

export default async function Page() {
  
  const info = {
    name: "Nombre",
    lastname: "Apellidos",
    email: "email",
    description: null,
    district: null,
    city: null,
    maps_url: null,
    price: null,
    phone: null,
  };

  return <Edit info={info} onClose={() => {}} />;
}