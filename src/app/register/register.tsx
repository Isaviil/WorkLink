'use client';
import "./register.scss";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";



type mutaType = {
    name: string,
    lastname: string,
    email: string,
    password: string
}

type changeStateType = {
    changeState: Dispatch<SetStateAction<boolean>>;
}

export default function Register({changeState}: changeStateType){

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
            gsap.fromTo(registerRef.current, {
                opacity: 1
            }, {
                opacity: 0, duration: 1.2, ease: "power2.out", delay: 1.5,
                onComplete: ()=> {
                    changeState(false);
                }
            })
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


    //registerRef opacity 0 -> 1
    useEffect(()=>{

        if (registerRef.current){
            gsap.fromTo(registerRef.current, {opacity: 0}, {opacity: 1, duration: 1.5, ease: "power2.out"})
        }

    }, [])



    return (
        <div className="register" ref={registerRef}>
            <div className="register-container">
                <div className="register-container-text">
                    <h2>WorkLink</h2>
                    <h3>El mundo Está Esperando</h3>
                </div>

                <div className="register-container-form">

                    <h2>Regístrate</h2>

                    <form onSubmit={handleSubmit} noValidate>

                        <div className="form-element">
                        <label htmlFor="name">Nombre:</label>
                        <input id="name" type="text" name="name" required/>
                        </div>

                        <div className="form-element">
                        <label htmlFor="lastname">Apellido:</label>
                        <input id="lastname" type="text" name="lastname" required/>
                        </div>

                        <div className="form-element">
                        <label htmlFor="email">Correo electrónico:</label>
                        <input id="email" type="email" name="email" required/>
                        </div>

                        <div className="form-element">
                        <label htmlFor="password">Contraseña:</label>
                        <input id="password" type="password" name="password" required/>
                        </div>

                        <div className="buttons">
                            <button type="button" disabled={muta.isPending}
                            onClick={()=> {
                                gsap.fromTo(registerRef.current, {opacity: 1}, {opacity: 0, duration: 1, ease: "power2.out", onComplete: ()=> {
                                    changeState(false)
                                }})
                            }}>Regresar</button>
                            <button> {muta.isPending ? "Enviando..." : "Enviar"}</button>
                        </div>
                    </form>

                    {serverMsg?.error && <div className="error-msg"><p>{serverMsg.error}</p></div>}
                    {serverMsg?.message && <div className="error-msg"><p>{serverMsg.message}</p></div>}
                </div>
            </div>
        </div>
    )
}