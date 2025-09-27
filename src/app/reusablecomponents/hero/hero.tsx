'use client';
import { useRouter } from 'next/navigation';
import './hero.scss';

export default function Hero(){

    const router = useRouter();

    return (
        <div className='hero'>
            <div className="hero-text">
                <h2>
                    El profesional que buscas está aquí!
                </h2>

                <h3>
                    Tan solo a un click de distancia. Tú decides!
                </h3>

                <button onClick={()=> router.push("/professionals")}>
                    Ver más
                </button>
            </div>
        </div>
    )
}   