'use client';
import { useRouter } from 'next/navigation';
import './hero.scss';

export default function Hero(){

    const router = useRouter();

    return (
        <div className='hero'>
            <div className="hero-text">
                <h2>
                   Buscas un profesional?
                </h2>

                <h3>
                    Encuéntralo en segundos.
                </h3>

                <button onClick={()=> router.push("/professionals")}>
                    Buscar
                </button>
            </div>
        </div>
    )
}   