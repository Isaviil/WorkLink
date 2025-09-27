'use client';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRef } from 'react';
import './gallery.scss';
import UploadGallery from '../uploadGallery/uploadingG';
import { useSession } from 'next-auth/react';


type galleriesType = {
    id: number; 
    created_at: Date | null    
    professional_id: number; 
    image_url: string; 
}

type galleryProp = {
    galleries: galleriesType[],
    canEdit: boolean
}


export default function Gallery({galleries, canEdit}: galleryProp){

    //queryClient
    const queryClient = useQueryClient();


    //session
    const {data: session} = useSession();


    //POST 
    const muta = useMutation<void, void, {professional_id: number, image_url: string}[]>({
        mutationFn: async (newImages)=> {
            const res = await fetch("/api/galleries", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(newImages)
            })
            if (!res.ok) throw await res.json();
            return await res.json();
            },
            onSuccess: ()=>{
                queryClient.invalidateQueries({queryKey: ["perfil"]})
            }
        }
    );



    return (
        <div className="gallery-container">
            {canEdit && (
            <div className="gallery-container-upload">
                <UploadGallery
                professionalId={Number(session?.user.id)} 
                onUpload={(urls: string[]) => {
                    muta.mutate(urls.map(url => ({ professional_id: Number(session?.user.id), image_url: url })));
                }}
                />
            </div>
            )}

        {
            galleries.length === 0 && 
            <div className="gallery-container-empty">
                <h2>Aún no hay nada aquí</h2>
            </div>
        }

        {galleries.length>0 && 
            galleries.map((x,i) => (                
                <div className="gallery-container-items" key={i}>
                    <img src={x.image_url} />
                    <p>{x.created_at?.toLocaleString()}</p>
                </div>
            ))
        }
        </div>
    )

}



