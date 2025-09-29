"use client";
import Hero from '../reusablecomponents/hero/hero';
import Steps from '../reusablecomponents/steps/steps';
import './homepage.scss';
import gsap from 'gsap';
import { useRef, useEffect } from 'react';
import Navbar from '../reusablecomponents/navbar/nav';
import Homeprofessional from '../homeprof/homeprof';
import Homelocation from '../homelocations/homeloc';
import FooterPage from '../reusablecomponents/footer/foot';
import Homecustomers from '../homecustomers/homecustomers';


export default function Homepage(){

    //refs
    const homeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!homeRef.current) return;

        gsap.fromTo(
        homeRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 3, ease: "power2.out" }
        );
    }, []);


    return (
        <section className='home' ref={homeRef}>
            <Navbar/>
            <Hero/>
            <Steps/>
            <Homeprofessional/>
            <Homelocation/>
            <Homecustomers/>
            <FooterPage/>
        </section>
    )
}