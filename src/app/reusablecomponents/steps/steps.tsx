'use client';
import './steps.scss';

export default function Steps(){

    return (
        <div className="steps">
            <h2>Es tan sencillo!</h2>

            <div className="steps-container">
                <div className="steps-container-element">
                    <i className="bi bi-1-circle"></i>
                    <h3>Revisa nuestra lista</h3>
                    <p>Explora las opciones disponibles y encuentra lo que más se ajuste a lo que buscas.</p>
                </div>

                <div className="steps-container-element">
                    <i className="bi bi-2-circle"></i>
                    <h3>Selecciona</h3>
                    <p>Elige fácilmente entre nuestras alternativas, sin complicaciones ni pasos extra.</p>
                </div>

                <div className="steps-container-element">
                    <i className="bi bi-3-circle"></i>
                    <h3>Conecta</h3>
                    <p>Una vez elegido, ponte en contacto directo a través de WhatsApp.</p>
                </div>                                
            </div>
        </div>
    )

}