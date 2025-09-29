'use client';
import './homeprof.scss';

export default function Homeprofessional(){
    return (
        <div className='homeprof'>
           <div className="homeprof-text">
                <h2>La guía favorita de los viajeros</h2>

                <div className="homeprof-text-description">
                    <h3>
                        Lucia Vargas
                    </h3>

                    <p>
                    ¡Hola! Soy Lucía, guía turística en Lima, y disfruto mostrar a los viajeros la historia, el arte y la vida diaria de mi ciudad.
                    Comparto no solo la historia, sino también esas anécdotas y detalles curiosos que la hacen única.
                    Desde las callecitas bohemias de Barranco hasta la majestuosidad del Centro Histórico, pasando por los sabores de Miraflores y los rincones menos conocidos que guardan sorpresas, siempre busco que cada recorrido sea una experiencia cercana y memorable.  
                    </p>
                </div>
           </div>

           <div className="homeprof-img">
                <img src="/images/1.jpg" />
           </div>
        </div>
        )
    }