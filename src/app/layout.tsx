"use client"

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import Navbar from "./components/navbar.jsx";
import Providers from '../app/Providers.jsx'



export default function RootLayout({



  children,
}: Readonly<{
  children: React.ReactNode;
}>) {




  return (
    <html lang="en">

      <body
        className={`antialiased`}
      >
       <Providers>
        <Navbar/>
        {children}
       </Providers>
       
      </body>
    </html>
  );
}
