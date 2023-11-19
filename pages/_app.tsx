import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Maven_Pro } from "next/font/google";
import { Toaster } from 'react-hot-toast';

const maven = Maven_Pro({
   weight: '400',
   preload: false,
})

// const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
	return (
      <div className={maven.className}>
         {/* <QueryClientProvider client={queryClient}> */}
            <GoogleOAuthProvider clientId="931575770036-fosk1nk1lqarjjqqn3m096valo5c08bp.apps.googleusercontent.com">
               <Component {...pageProps} />
               <Toaster/>
               {/* <ReactQueryDevtools/> */}
            </GoogleOAuthProvider>
         {/* </QueryClientProvider> */}
      </div>
   )
}

// FONTS:- Nanum_Gothic, Josefin_Sans, Comfortaa, Varela_Round, Outfit, Maven_Pro, Manrope, Ubuntu