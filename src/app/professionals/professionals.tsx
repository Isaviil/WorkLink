'use client';
import { useQuery } from '@tanstack/react-query';
import Navbar from '../reusablecomponents/navbar/nav';
import './professionals.scss';
import { useRouter } from 'next/navigation';
import FilterLoc from '../reusablecomponents/filterLocation/filterlocation';
import { useState } from 'react';
import FooterPage from '../reusablecomponents/footer/foot';
import Lupa from '../reusablecomponents/lupa/lupa';

export default function Professionals(){

    //router
    const router = useRouter();


    type GalleriesType = {
        id: number;
        created_at: Date | null;
        professional_id: number;
        image_url: string;
    };

    type ProfessionalType = {
        id: number;
        name: string;
        lastname: string;
        email: string;
        profile_picture: string | null;
        description: string | null;
        district: string | null;
        city: string | null;
        maps_url: string | null;
        price: number | null;
        phone: string | null;
        created_at: Date | null;
        role: string | null;
        galleries: GalleriesType[];
    };

    type queryType = {result: ProfessionalType[]};


    const {data, isLoading} = useQuery<queryType>({
        queryKey: ["professionals"],
        queryFn: async ()=> {
            const res = await fetch("/api/professionals", {
                method: "GET",
                credentials: "include"
            })
            if (!res.ok) throw await res.json();
            return await res.json();
        },
        refetchOnWindowFocus: false,
        retry: false
    });




    //filter 
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

    const filteredProfessionals = selectedDistrict? data?.result.filter(p => p.district === selectedDistrict)
    : data?.result;


    return (
        <div className="professionals">
            <Navbar/>
            
            <div className="professionals-display">

                <div className="professionals-display-config">
                    <FilterLoc onSelectDistrict={setSelectedDistrict}/>
                </div>                
                
                <div className="professionals-display-elements">
                    
                    {
                    isLoading && 
                    <div className='professionals-display-elements-isLoading'><p>Cargando...</p></div>
                    }

                    <Lupa/>

                    <div className="professionals-display-elements-container">
                        {
                            filteredProfessionals?.map((x, i) => (
                                <div className='professionals-display-elements-container-user' key={i}>
                                    <div className="professionals-display-elements-container-user-img">
                                        <img src={x.profile_picture || "/images/av01.png"} />
                                    </div>

                                    <div className="professionals-display-elements-container-user-text">
                                        <h2>{x.name}</h2>
                                        <p>{x.city?? "Sin ciudad"}</p>
                                        <p>{x.district?? "Sin distrito"}</p>
                                        <p>Desde S/. {x.price?? "0"}</p>
                                        <button onClick={() => router.push(`/profile/${x.id}`)}>Ver más</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>


            <FooterPage/>
        </div>
    )
}