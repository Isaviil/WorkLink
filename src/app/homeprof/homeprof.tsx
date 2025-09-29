'use client';
import './homeprof.scss';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function Homeprofessional(){

    //refs
    const containerRef = useRef<HTMLDivElement>(null);
    const h2Ref = useRef<HTMLHeadingElement>(null);
    const h3Ref = useRef<HTMLHeadingElement>(null);
    const pRef = useRef<HTMLParagraphElement>(null);
    const imgContainerRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(()=>{

        const tl = gsap.timeline(
            {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                end: "top 70%"
            }}
        );

        tl.fromTo(containerRef.current, {opacity: 0}, {opacity: 1, duration: 1, ease: "power2.out"})
        .fromTo(imgContainerRef.current, {opacity: 0, yPercent: -50}, {opacity: 1, yPercent: 0, duration: .7, ease: "power2.out"}, '<+=.3')
        .fromTo(imgRef.current, {opacity: 0}, {opacity: 1, duration: .4, ease: "power2.out"})
        .fromTo(h2Ref.current, {opacity: 0, yPercent: 50}, {opacity: 1, yPercent: 0, duration: .4, ease: "power2.out"})
        .fromTo(h3Ref.current, {opacity: 0, yPercent: -50}, {opacity: 1, yPercent: 0, duration: .4, ease: "power2.out"})
        .fromTo(pRef.current, {opacity: 0, xPercent: -10}, {opacity: 1, xPercent: 0, duration: .4, ease: "power2.out"})

    }, [])

    return (
        <div className='homeprof' ref={containerRef}>
           <div className="homeprof-text">
                <h2 ref={h2Ref}>La guía favorita de los viajeros</h2>

                <div className="homeprof-text-description">
                    <h3 ref={h3Ref}>
                        Lucia Vargas
                    </h3>

                    <p ref={pRef}>
                    ¡Hola! Soy Lucía, guía turística en Lima, y disfruto mostrar a los viajeros la historia, el arte y la vida diaria de mi ciudad.
                    Comparto no solo la historia, sino también esas anécdotas y detalles curiosos que la hacen única.
                    Desde las callecitas bohemias de Barranco hasta la majestuosidad del Centro Histórico, pasando por los sabores de Miraflores y los rincones menos conocidos que guardan sorpresas, siempre busco que cada recorrido sea una experiencia cercana y memorable.  
                    </p>
                </div>
           </div>

           <div className="homeprof-img" ref={imgContainerRef}>
                <img src="/images/1.jpg" ref={imgRef}/>
           </div>
        </div>
        )
    }