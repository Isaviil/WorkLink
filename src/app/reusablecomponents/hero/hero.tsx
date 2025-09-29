'use client';
import { useRouter } from 'next/navigation';
import './hero.scss';

export default function Hero(){

    const router = useRouter();

    return (
        <div className='hero'>
            <div className="hero-text">
                <h2>
                    Profesionales a tu disposición.
                </h2>

                <h3>
                    Conéctate en segundos.
                </h3>

                <button onClick={()=> router.push("/professionals")}>
                    Buscar
                </button>
            </div>
        </div>
    )
}   