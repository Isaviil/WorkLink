'use client';
import "./register.scss";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Navbar from "../reusablecomponents/navbar/nav";
import { useMutation } from "@tanstack/react-query";



type mutaType = {
    name: string,
    lastname: string,
    email: string,
    password: string
}


export default function Register(){

    //ref
    const registerRef = useRef<HTMLDivElement>(null);

    //router
    const router = useRouter();


    useEffect(()=>{

        if (registerRef.current){
            gsap.fromTo(registerRef.current, {
                opacity: 0
            }, {
                opacity: 1, duration: 1.5, ease: "power2.out"
            })
        }

    }, [])


    //serverMsg type
    type serverMsgType = {
        message?: string,
        error?: string
    }


    //State to retrieve the message
    const [serverMsg, setServerMsg] = useState<serverMsgType | null>(null);



    //POST
    const muta = useMutation<{message: string}, {error: string}, mutaType>({
        mutationFn: async (toSend)=> {
            const res = await fetch("/api/professionals", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(toSend),
                credentials: "include"
            });
            if (!res.ok) throw await res.json();
            return await res.json();
        },
        onError: (error) =>{
            setServerMsg(error);
        },
        onSuccess: (data)=>{
            setServerMsg(data);
              gsap.delayedCall(1.5, () => {
                    router.push("/loginPage");
                });
        }
    });
    

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);

        const x: mutaType = {
            name: formData.get("name")?.toString() ?? "",
            lastname: formData.get("lastname")?.toString()?? "",
            email: formData.get("email")?.toString()?? "",
            password: formData.get("password")?.toString()?? ""    //TODO hash hash
        }

        muta.mutate(x);
    }


    return (
        <div className="register" ref={registerRef}>

            <Navbar/>

            <h2>Regístrate</h2>            

        <form onSubmit={handleSubmit}>
            {serverMsg?.error && <p className="error-message">{serverMsg.error}</p>}

            <div className="form-element">
                <label htmlFor="name">Nombre:</label>
                <input id="name" type="text" name="name" />                
            </div>

            <div className="form-element">
                <label htmlFor="lastname">Apellido:</label>
                <input id="lastname" type="text" name="lastname" />               
            </div>

            <div className="form-element">
                <label htmlFor="email">Correo electrónico:</label>
                <input id="email" type="email" name="email" />                
            </div>

            <div className="form-element">
                <label htmlFor="password">Contraseña:</label>
                <input id="password" type="password" name="password" />                
            </div>

            <div className="buttons">
                <button type="button" onClick={()=> router.push("/loginPage")}>Regresar</button>
                <button type="submit" disabled={muta.isPending}>
                    {muta.isPending ? "Creando..." : "Crear"}
                </button>
            </div>
        </form>

        {serverMsg?.message && <p className="register-sent">{serverMsg.message}</p>}
        </div>
    )
}