"use client";
import { useQuery } from "@tanstack/react-query";
import "./homeloc.scss";
import { Decimal } from "@prisma/client/runtime/library";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);


    type galleryType = {
        id: number,
        professional_id: number,
        image_url: string,
        created_at: Date | null,
    }


    type dataType = {
        result: {
            id: number;
            name: string;
            lastname: string;
            email: string;
            profile_picture: string | null;
            description: string | null;
            district: string | null;
            city: string | null;
            maps_url: string | null;
            price: Decimal | null;
            phone: string | null;
            created_at: Date | null;
            role: string | null;
            galleries: galleryType[]
        }[]
    }


export default function Homelocation(){


    //router
    const router = useRouter();


    //fetching the locations
    const {data, isLoading} = useQuery<dataType>({
            queryKey: ["professionals"],
            queryFn: async () => {
            const res = await fetch("/api/professionals");
            if (!res.ok) throw await res.json();
            return await res.json();
        }
    });



    //refs
    const locationRef = useRef<HTMLDivElement>(null);
   //const dispRef = useRef<HTMLDivElement>(null);

    useEffect(()=> {

        if (data?.result && data?.result.length>0){

            const displayArray = gsap.utils.toArray(".homelocation-worker-display-element")

            const tl = gsap.timeline(
                {
                    scrollTrigger: {
                        trigger: locationRef.current,
                        start: "top 50%",
                        end: "top 50%"
                    }
                }
            )

           tl.fromTo(displayArray, {opacity: 0, xPercent: 50}, {opacity: 1, xPercent: 0, stagger: .7, ease: "power2.out"})
        }

    }, [data?.result])
    




    return (

        <div className="homelocation-worker" ref={locationRef}>
            <h2>Algunos de nuestros miembros</h2>

            {isLoading && <div className="homelocation-worker-loading"><h3>Cargando...</h3></div>}

            <div className="homelocation-worker-display">
                {
                data?.result && 
                    data?.result.length > 0 &&                         
                    (data.result.slice(0, 3).map((x, i)=> (
                        <div className="homelocation-worker-display-element" key={i}>
                            <div className="homelocation-worker-display-element-img" onClick={()=> router.push(`/profile/${x.id}`)}>
                                <img src={x.profile_picture || "/images/av01.png"} alt="" />
                            </div>

                            <div className="homelocation-worker-display-element-text">
                                <h3>{x.name} {x.lastname}</h3>                                    
                                <p>{x.district}</p>
                                <p>{x.description}</p>
                            </div>

                            <button type="button" onClick={()=> router.push(`/profile/${x.id}`)}> Ver perfil </button>                                
                        </div>
                    )))
                }
            </div>
        </div>    
    )
}