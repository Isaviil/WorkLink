'use client';
import UseTheme from '@/app/context/theme/themeContext';
import './nav.scss';
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

export default function Navbar(){

    //toggle del tema
    const {theme, displayTheme} = UseTheme();

    //router
    const router = useRouter();

    //refs
    const menuRef = useRef<HTMLElement>(null);
    const navRightRef = useRef<HTMLDivElement>(null);
    const ulRef = useRef<HTMLUListElement>(null);
    const closeRef = useRef<HTMLElement>(null);

    //avoid spam
    const isAnimating = useRef<boolean>(false);

    //states
    const [isOpen, setIsOpen] = useState(false)

    //Cambiando los colores del tema
    useEffect(()=>{

        document.body.setAttribute("data-theme", theme==="dark"? "dark": "light");

        gsap.to(document.body, {
            duration: .5,
            ease: "power2.out",
            css: {
                "--color-regular-text": theme === "light"? "black" : "white",
                "--color-01": theme === "light"? "#ece5e5ec" : "#131618e7",
                "--color-02": theme === "light"? "rgb(228, 228, 228)" : "#111821",
                "--color-06": theme === "light"? "rgb(204, 204, 204)": "rgb(34, 34, 34)"
            }
        })

    }, [theme])

    
    //Cambiando el overflow del body según el estado del nav-right
    useEffect(()=>{

        if (window.innerWidth <= 768){

            document.body.style.overflow = isOpen? "hidden": "auto";
            return () => {
                document.body.style.overflow = ""; //Reiniciamos a default
            };
        }

    }, [isOpen])

    
    //Animando el modal
    useEffect(()=>{

        if (isOpen){

            isAnimating.current = true;

            const tl = gsap.timeline();

            tl.fromTo(navRightRef.current, 
                {opacity: 0}, 
                {opacity: 1, duration: .5})
            .fromTo(ulRef.current, 
                {opacity: 0, xPercent: 100}, 
                {opacity: 1, xPercent: 0}, "<=.1")
            .fromTo(closeRef.current, 
                {opacity: 0}, 
                {opacity: 1, onComplete: ()=>{
                    isAnimating.current = false;
                }}
            )
        } 

    }, [isOpen])



    //Mostrar o ocultar el modal según el tamaño de la ventana.
    useEffect(() => {
    const handleResize = () => {
        const isLarge = window.innerWidth >= 768;
        setIsOpen(isLarge); 
    };

    handleResize(); 

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    }, []);


    //Sesión
    const {data: session} = useSession();

    return (
        <nav>

            <div className="nav-left">
                <h3 onClick={()=> router.push("/homePage")}>Logo</h3>

                <button className='nav-left-btn' onClick={displayTheme}>
                    {
                        theme === "light"?
                        <i className="bi bi-moon"></i>
                        :
                        <i className="bi bi-sun"></i>  
                    }
                </button>
            </div>

            <i className="bi bi-list" ref={menuRef} onClick={()=> {
                
                if (isAnimating.current)return;
                isAnimating.current = true;
                setIsOpen(true)
            }}></i>    

            {
            isOpen && 
            <div className="nav-right" ref={navRightRef} >                                                            
                <i className="bi bi-x-lg"  ref={closeRef}
                    onClick={()=> 
                        {   
                            if (isAnimating.current)return;
                            isAnimating.current = true;

                            const tl = gsap.timeline();

                            tl.to(closeRef.current, {opacity: 0, duration: .3})
                            .fromTo(ulRef.current, 
                                {opacity: 1, xPercent: 0}, 
                                {opacity: 0, xPercent: 100, duration: .5})
                            .fromTo(navRightRef.current, 
                                {opacity: 1}, 
                                {opacity: 0, duration: .3, 
                                    onComplete: ()=> {
                                        isAnimating.current = false;
                                        setIsOpen(false)}
                                    })
                        }                                
                    }></i>

                <ul ref={ulRef}>                    
                    <li onClick={()=> router.push("/homePage")}>Inicio</li>
                    <li onClick={()=> router.push("/professionals")}>Profesionales</li>
                    {
                        session?.user &&
                        <li onClick={()=> router.push(`/profile/${session?.user.id}`)}>Mi perfil</li>
                    }

                    {
                        !session?.user?
                        <li onClick={()=> {
                            router.push("/loginPage");
                            setIsOpen(false);                            
                        }}>Iniciar sesión</li>
                        :
                        <li onClick={()=> {
                            signOut({callbackUrl: "/homePage"})
                        }}>Cerrar sesión</li> 
                    }                 
                </ul>
            </div>
            }

        </nav>
    )

}