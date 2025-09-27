'use client';
import './profile.scss';
import Navbar from '../reusablecomponents/navbar/nav';
import { useSession } from 'next-auth/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Edit from '../reusablecomponents/edit/edit';
import { useState, useRef, useEffect } from 'react';
import UploadImage from "../reusablecomponents/uploadImg/uploading";
import Gallery from '../reusablecomponents/gallery/gallery';
import gsap from 'gsap';


type idType = {
    id: number;
}

type galleriesType = {
    id: number; 
    created_at: Date | null    
    professional_id: number; 
    image_url: string; 
}

type queryType = {
    result: {
        id: number,
        name: string,
        lastname: string,
        email: string,
        profile_picture: string | null,
        description: string | null,
        district: string | null,
        city: string | null,
        maps_url: string | null,
        price: string | null,
        phone: string | null,
        created_at: Date | null,
        role: string | null,
        galleries: galleriesType[]
    }
}




export default function Profile({id}:idType){

    //queryclient
    const queryClient = useQueryClient();

    //session de auth
    const {data: session} = useSession();

    //Si se envía un id al dumb component, se usará eso; si no, la sesión.
    const profileId = id?? session?.user.id;

    //Get method
    const {data, isLoading} = useQuery<queryType>({
        queryKey: ["perfil", profileId],
        queryFn: async ()=> {
            const res = await fetch(`/api/professionals?id=${profileId}`, {
                method: "GET",
                credentials: "include"
            })
            if (!res.ok) throw await res.json();
            return await res.json();
        },
        refetchOnWindowFocus: false,
        retry: false
    })


    //Update img
    const muta = useMutation<void, void, string>({
        mutationFn: async (url)=> {
            const res = await fetch("/api/professionals", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ profile_picture: url })
            })
            if (!res.ok) throw await res.json();
            return await res.json();
            },
            onSuccess: ()=>{
                queryClient.invalidateQueries({queryKey: ["perfil"]})
            }
        }
    );



    //Editar
    const canEdit = Number(session?.user?.id) === data?.result.id;


    const [editar, setEditar] = useState(false);

    //state para el editar
    const toggleEdit = () =>{
        setEditar(x => !x)
    }


    //container ref
    const profileRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        if (profileRef.current){
            gsap.fromTo(profileRef.current, {
                opacity: 0
            }, {
                opacity: 1,
                duration: 2,
                ease: "power2.out"
            })
        }
    }, [])

    
    
    return (
        <div className="profile" ref={profileRef}>

            {isLoading && <div className='isLoading'><p>Cargando...</p></div>}


            {
                data?.result  &&
                    <>
                        <Navbar/>
                        <div className="profile-me">

                            <div className="profile-me-info">
                                {
                                    editar && 
                                        <Edit info={{
                                            name: data.result.name,
                                            lastname: data.result.lastname,
                                            email: data.result.email,
                                            description: data.result.description,
                                            district: data.result.district,
                                            city: data.result.city,
                                            maps_url: data.result.maps_url,
                                            price: data.result.price,
                                            phone: data.result.phone                                       
                                        }} onClose={()=> setEditar(false)}/>
                                }

                                <div className="profile-me-info-img">
                                    <img src={data.result.profile_picture || "/images/av01.png"} alt=""/>
                                    {canEdit && (
                                    <UploadImage
                                        currentImage={data.result.profile_picture || "/images/av01.png"}
                                        onUpload={(url) => muta.mutate(url)}
                                        />
                                    )}
                                </div>

                                <div className="profile-me-info-data">
                                    <h2>{data.result.name} {data.result.lastname}</h2>
                                    <p>{data.result.city}</p>   
                                    <p>{data.result.district}</p>
                                    <p>{data.result.description}</p>
                                    <p>Precios desde {data.result.price?.toString()} soles</p>
                                    {canEdit && <i onClick={toggleEdit} className="bi bi-pencil"></i>}
                                </div>                    
                            </div>

                            <div className="profile-me-buttons">
                                <a href={data.result.maps_url?? ""} target="_blank" rel="noopener noreferrer"><i className="bi bi-geo-alt-fill"></i></a>
                                <a href={`https://wa.me/${data.result.phone}`} target="_blank" rel="noopener noreferrer"><i className="bi bi-whatsapp"></i></a>
                            </div>

                            <div className="profile-me-gallery">
                                <Gallery galleries={data.result.galleries} canEdit={canEdit}/>
                            </div>
                        </div>                    
                    </>
            }

        </div>
    )
}
