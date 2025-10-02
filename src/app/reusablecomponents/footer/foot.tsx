'use client';
import './foot.scss';
import gsap from 'gsap';
import { useRef, useEffect } from 'react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function FooterPage(){

    //refs
    const footerRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const copyrightRef = useRef<HTMLDivElement>(null);
    

    useEffect(()=>{

        const displayArray = gsap.utils.toArray(".footer-container-elements-display");

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top 80%",
                end: "top 80%"
            }            
        })

        if (titleRef.current){
            tl.fromTo(titleRef.current, {opacity: 0, xPercent: -20}, {opacity: 1, xPercent: 0, duration: .7, ease: "power2.out"})        
        }

        tl.fromTo(displayArray, {opacity: 0, xPercent: -20}, {opacity: 1, xPercent: 0, ease: "power2.out", stagger: .2})

        if (copyrightRef.current){
            tl.fromTo(copyrightRef.current, {opacity: 0, yPercent: 20}, {opacity: 1, yPercent: 0, duration: .8, ease: "power2.out"})   
        }

    }, [])

    return (
        <footer className='footer-container' ref={footerRef}>

            <div className="footer-container-title" ref={titleRef}>
                <h2>WorkLink</h2>
            </div>

            <div className="footer-container-elements">
                <div className="footer-container-elements-display">
                    <h3>Compañia</h3>
                    <a href='#'>Nosotros</a>
                </div>

                <div className="footer-container-elements-display">
                    <h3>Síguenos</h3>

                    <div className="footer-container-elements-display-socials">
                        <a href="#">Facebook</a>
                        <a href="#">Instagram</a>
                        <a href="#">Twitter/X</a>
                    </div>
                </div>

                <div className="footer-container-elements-display">
                    <h3>Github</h3>
                    <a href='https://github.com/Isaviil/WorkLink' target="_blank" rel="noopener">Repo</a>
                </div>                
            </div>

            <div className="footer-container-copyright" ref={copyrightRef}>
                <hr />
                <p>WorkLink, inc 2025</p>
            </div>

        </footer>
    )
}