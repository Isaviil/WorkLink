'use client';
import './homecustomers.scss';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function Homecustomers(){

    //const ref
    const commentsRef = useRef<HTMLDivElement>(null);
    const h2ref = useRef<HTMLHeadingElement>(null);
    const pRef = useRef<HTMLParagraphElement>(null);
    

    //array to loop
    const testimony = [
        {
            name: "Sora Vohinderkaiv",
            msg: "Pude encontrar la ayuda que buscaba rápidamente y muy buen servicio.",
            img: "https://cdn.pixabay.com/photo/2018/07/28/09/12/woman-3567588_1280.jpg"
        }, 
        {
            name: "May Chantelle",
            msg: "Encontré el apoyo que buscaba.",
            img: "https://cdn.pixabay.com/photo/2020/08/03/16/03/woman-5460395_1280.jpg"
        },
        {
            name: "Harold",
            msg: "El proceso fue tan bueno que no sé cómo no pense en la solución.",
            img: "https://cdn.pixabay.com/photo/2017/06/10/16/33/double-exposure-2390185_1280.jpg"
        }
    ]


    //Animating

    useEffect(()=>{

        const commentsArray = gsap.utils.toArray(".homecustomer-comments-display");

        const tl = gsap.timeline({   
                scrollTrigger: {
                trigger: commentsRef.current,
                start: 'top 80%',
                end: 'top 80%'
            }}
        )

        tl.fromTo(commentsRef.current, {opacity: 0}, {opacity: 1, duration: .5, ease: "power2.out"})
        .fromTo(h2ref.current, {opacity: 0, xPercent: -30}, {opacity: 1, xPercent: 0, ease: "power2.out", duration: .5})
        .fromTo(pRef.current, {opacity: 0, yPercent: 100}, {opacity: 1, yPercent: 0, ease: "power2.out", duration: 1})
        .fromTo(commentsArray, {opacity: 0, y: -50 }, {opacity: 1, y: 0, duration: 0.7, stagger: 0.4, ease: "power2.out" }
        )
    }, [])



    return (
        <div className="homecustomer" ref={commentsRef}>
            <div className="homecustomer-text">                
                <h2 ref={h2ref}>Nuestros clientes están satisfechos</h2>
                <p ref={pRef}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae, tenetur?</p>
            </div>

            <div className="homecustomer-comments">
                {
                    testimony.map((x, i)=> (
                        <div className="homecustomer-comments-display" key={i}>
                            <div className="homecustomer-comments-display-img">
                                <img src={x.img}/>
                            </div>
                            
                            <div className="homecustomer-comments-display-text">
                                <i className="bi bi-quote"></i>
                                <h3>{x.name}</h3>
                                <p>{x.msg}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}