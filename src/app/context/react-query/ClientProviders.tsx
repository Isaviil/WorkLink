'use client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import ThemeProv from "../theme/themeProvider";
//import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


interface childrenType{
    children: ReactNode;
}

const queryClient = new QueryClient();

export default function ClientProviders({children} : childrenType){
    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                <ThemeProv>
                    <main className="app-container">                
                        {children}
                    </main>
                </ThemeProv>                
            </QueryClientProvider>
        </SessionProvider>
    )
}