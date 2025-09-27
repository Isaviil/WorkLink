'use client';
import { useQuery } from '@tanstack/react-query';
import './filterlocation.scss';


type FilterLocProps = {
  onSelectDistrict: (district: string | null) => void;
};


export default function FilterLoc({onSelectDistrict}: FilterLocProps){


    type queryType = {
        locations: {
            district: string | null
        }[]
    }

    const {data, isLoading} = useQuery<queryType>({
        queryKey: ["city"],
        queryFn: async ()=> {
            const res = await fetch("/api/locations", {
                method: "GET",
                credentials: "include"
            });
            if (!res.ok) throw await res.json();
            return await res.json();
        },
        refetchOnWindowFocus: false,
        retry: false
    });


    return (
        <div className="filter-location">
            {isLoading && <div className='filter-location-loading'><h2>...</h2></div>}

            <h2>Distritos</h2>
            <div className="filter-location-options">

                {
                    data?.locations?.length 
                    &&
                    data.locations.map((x,i) => (
                        <button 
                        key={i} 
                        type='button' 
                        onClick={() => onSelectDistrict(x.district)}>{x.district}</button>
                    ))            
                }
                <button type="button" onClick={() => onSelectDistrict(null)}>
                    Mostrar todos
                </button>
            </div>
        </div>
    )
}