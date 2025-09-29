'use client';
import './login.scss';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function Login(){

    //refs
    const loginRef = useRef<HTMLElement>(null);
    const loginModalRef = useRef<HTMLDivElement>(null);
    const h3Ref01 = useRef<HTMLHeadingElement>(null);
    const h3Ref02 = useRef<HTMLHeadingElement>(null);
    const h3Ref03 = useRef<HTMLHeadingElement>(null);
    const h3Ref04 = useRef<HTMLHeadingElement>(null);


    //router
    const router = useRouter();


    //Animando login & h3
    useEffect(()=>{
        if (loginRef){
            const tl = gsap.timeline();

            tl.fromTo(loginRef.current, 
                {opacity: 0, xPercent: 100},
                {opacity: 1, xPercent: 0, duration: .7, ease: "power2.out"})
            .fromTo(h3Ref01.current, 
                {opacity: 0, xPercent: 40},
                {opacity: 1, xPercent: 0, ease: "power2.out", duration: .5})
            .fromTo(h3Ref02.current, 
                {opacity: 0, xPercent: -60},
                {opacity: 1, xPercent: 0, ease: "power2.out", duration: .4})
            .fromTo(h3Ref03.current, 
                {opacity: 0, yPercent: 50},
                {opacity: 1, yPercent: 0, ease: "power2.out", duration: .4})
            .fromTo(h3Ref04.current , 
                {opacity: 0, yPercent: -70},
                {opacity: 1, yPercent: 0, ease: "power2.out", duration: .3})
        }        
    }, [])


    //logintype
    type login = {
        email: string,
        password: string
    }


    //*interface error
    interface errorType{
        user?: string,
        password?: string,
    }


    
    //*Retrieve the error with a state
    const [errorMSG, setError] = useState<errorType>();


    //NextAuth
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        const x: login = {
            email: formData.get("email")?.toString()?.trim()?? "",
            password: formData.get("password")?.toString()?? ""
        }


        const result = await signIn("credentials", {
            redirect: false,
            email: x.email,
            password: x.password
        })

        if (result?.error === "NOT_FOUND"){
            setError({user: "No se encontró el usuario", password: "La contraseña está vacía"});
        }

        if (result?.error === "INVALID"){  
            setError({password: "Tu contraseña no es válida"});
        }        

        if (result?.ok){
            gsap.fromTo(loginRef.current, 
                {
                    opacity: 1
                },
                {
                    opacity: 0, duration: 1.1, ease: "power2.out", onComplete: ()=>{
                        router.push("/homePage");
                    }
                })
        }
    }

    


    return (
        <section className="login" ref={loginRef}>
            <div className="login-text">
                <h3 ref={h3Ref01}>Crea tu perfil</h3>
                <h3 ref={h3Ref02}>Muestra tus servicios</h3>
                <h3 ref={h3Ref03}>Llega a más clientes</h3>
                <h3 ref={h3Ref04}>Empieza hoy</h3>
            </div>

            <div className="login-modal" ref={loginModalRef}>
                <div className="login-modal-title">
                    <h2>Iniciar sesión</h2>
                </div>

                <form className='login-modal-form' onSubmit={handleSubmit}>

                    <div className='login-modal-form-user'>
                        <label htmlFor="email">Email</label>
                        <input id='email' name='email' type='text'></input>
                        {errorMSG?.user && <p>{errorMSG.user}</p>}
                    </div>

                    <div className='login-modal-form-password'>
                        <label htmlFor="password">Contraseña</label>
                        <input id="password" name='password' type='password'></input>
                        {errorMSG?.password && <p>{errorMSG.password}</p>}                             
                    </div>

                    <div className='login-modal-form-btn'>                        
                        <button type='button' onClick={()=> router.push("/homePage")}>Regresar</button>
                        <button type='submit'>Ingresar</button>                                
                    </div>     

                </form>

                <div className="login-modal-reminder">
                    <p>Trabajas con nosotros? <button onClick={()=> {
                        const tl = gsap.timeline();
                        tl.fromTo(loginModalRef.current, {
                            xPercent: 0, opacity: 1}, {xPercent: 100, opacity: 0, duration: .5, ease: "power2.out"})
                        .fromTo(h3Ref01.current, {xPercent: 0, opacity: 1}, {xPercent: 100, opacity: 0, duration: .5, ease: "power2.out"})
                        .fromTo(h3Ref02.current, {xPercent: 0, opacity: 1}, {yPercent: -50, opacity: 0, duration: .4, ease: "power2.out"})
                        .fromTo(h3Ref03.current, {xPercent: 0, opacity: 1}, {xPercent: -50, opacity: 0, duration: .4, ease: "power2.out"})
                        .fromTo(h3Ref04.current, {xPercent: 0, opacity: 1}, {yPercent: 100, opacity: 0, duration: .3, ease: "power2.out", 
                            onComplete: ()=> {
                                router.push("/register")
                            }
                        })
                        
                    }}>Crea tu cuenta</button></p>
                </div>

            </div>
        </section>
    )
}