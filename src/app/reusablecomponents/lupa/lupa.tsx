'use client';
import './lupa.scss';

export default function Lupa(){
    return (
        <div className="lupa">
            <input type="text" id="search" name="search" placeholder='Buscar'/>
            <i className="bi bi-search"></i>
        </div>
    )
}