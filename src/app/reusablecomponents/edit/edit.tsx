"use client";
import "./edit.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";


type infoType = {
        name?: string;
        lastname?: string;
        email?: string;
        description?: string | null;
        district?: string | null;
        city?: string | null;
        maps_url?: string | null;
        price?: string | null;
        phone?: string | null;
        profile_picture?: string;
    }

type dataType = {
    info: infoType;
    onClose: ()=> void;
}


export default function Edit({info, onClose}: dataType){

    const queryClient = useQueryClient();


    const muta = useMutation<{message: string}, void, infoType>({
        mutationFn: async (info)=>{
            const res = await fetch("/api/professionals", {
                method: "PUT",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(info),
                credentials: "include"
            })
            if (!res.ok) throw await res.json();
            return await res.json()
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: ["perfil"]});
        }
    });


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement)

        const x: infoType = {
            name: formData.get("name")?.toString() ?? "",
            lastname: formData.get("lastname")?.toString() ?? "",
            email: formData.get("email")?.toString() ?? "",
            description: formData.get("description")?.toString() || null,
            district: formData.get("district")?.toString() || null,
            city: formData.get("city")?.toString() || null,
            maps_url: formData.get("maps_url")?.toString() || null,
            price: formData.get("price")?.toString() || null,
            phone: formData.get("phone")?.toString() || null,
        }

        muta.mutate(x);
    }


    return (
        <form className="edit" onSubmit={handleSubmit}>

            <div className="edit-fields">
                <div className="edit-fields-element">
                    <label htmlFor="name">Nombre</label>
                    <input id="name" name="name" type="text" autoComplete="given-name" defaultValue={info.name}/>
                </div>

                <div className="edit-fields-element">
                    <label htmlFor="lastname">Apellido</label>
                    <input id="lastname" name="lastname" type="text" autoComplete="family-name" defaultValue={info.lastname}/>
                </div>

                <div className="edit-fields-element">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="text" autoComplete="email" defaultValue={info.email}/>
                </div>

                <div className="edit-fields-element">
                    <label htmlFor="district">Distrito</label>
                    <input id="district" name="district" type="text" defaultValue={info.district || ""}/>
                </div>

                <div className="edit-fields-element">
                    <label htmlFor="city">Ciudad</label>
                    <input id="city" name="city" type="text" defaultValue={info.city || ""}/>
                </div>

                <div className="edit-fields-element">
                    <label htmlFor="maps_url">Maps URL</label>
                    <input id="maps_url" name="maps_url" type="text" defaultValue={info.maps_url || ""}/>
                </div>

                <div className="edit-fields-element">
                    <label htmlFor="price">Precio</label>
                    <input id="price" name="price" type="number" defaultValue={info.price || ""}/>
                </div>

                <div className="edit-fields-element">
                    <label htmlFor="phone">Teléfono</label>
                    <input id="phone" name="phone" type="text" defaultValue={info.phone || ""}/>
                </div>

                <div className="edit-fields-area">
                    <label htmlFor="description">Descripción</label>
                    <textarea id="description" name="description" defaultValue={info.description || ""}/>
                </div>
            </div>

            <div className="edit-buttons">
                    <button disabled={muta.isPending}>{muta.isPending ? "Guardando..." : "Editar"}</button>
                    <button type="button" onClick={onClose}>Cerrar</button>
            </div>

            {muta.data?.message && <p>{muta.data?.message}</p>}
        </form>
    )
}