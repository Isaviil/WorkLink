'use client';
import { useEffect, useRef } from 'react';
import './steps.scss';
import gsap from 'gsap';

export default function Steps(){

    //const ref
    const containerRef = useRef<HTMLDivElement>(null);

    
    useEffect(()=>{
        const items = gsap.utils.toArray(".steps-container-element");

        if (containerRef.current){
            gsap.fromTo(items, { x: 100, opacity: 0},
            {x: 0, opacity: 1, duration: .5, stagger: .5, delay: .7 }
            );
        }

    }, [])


    return (
        <div className="steps">
            <h2>Es tan sencillo!</h2>

            <div className="steps-container" ref={containerRef}>
                <div className="steps-container-element">
                    <i className="bi bi-1-circle"></i>
                    <h3>Revisa nuestra lista</h3>
                    <p>Explora las opciones disponibles y encuentra lo que más se ajuste a lo que buscas.</p>
                </div>

                <div className="steps-container-element">
                    <i className="bi bi-2-circle"></i>
                    <h3>Selecciona</h3>
                    <p>Elige fácilmente entre nuestras alternativas, sin complicaciones ni pasos extra.</p>
                </div>

                <div className="steps-container-element">
                    <i className="bi bi-3-circle"></i>
                    <h3>Conecta</h3>
                    <p>Una vez elegido, ponte en contacto directo a través de WhatsApp.</p>
                </div>                                
            </div>
        </div>
    )

}