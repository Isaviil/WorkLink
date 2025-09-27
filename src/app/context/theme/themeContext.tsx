import { createContext } from "react";
import React from "react";

interface contextType{
    theme: string,
    displayTheme: ()=> void
}

export const contextTheme = createContext<contextType | null>(null);

export default function UseTheme(){
    const x = React.useContext(contextTheme);
    if (!x){
        throw new Error("No existe un contexto para el tema");
    }
    return x;
}