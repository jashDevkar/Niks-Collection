"use client"

import { Heart, Search, ShoppingCart, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import './navbar.css'
import { Menu } from 'lucide-react';
import Image from "next/image";
import { Button } from "@/components/ui/button";





export default function Navbar() {

  const [isSearching, setIsSearching] = useState(false);

  const links = [

    {
      name: "Categories",
      link: "#"
    },

    {
      name: "Rakhis",
      link: "#"
    },


    {
      name: "Baby rakhis",
      link: "#"
    },

    {
      name: "Broch",
      link: "#"
    }


  ]



  return (
    <nav className={`flex sticky top-0 justify-around items-center p-2`}>

      <div className="">
        <Image src="/logo.png" alt="logo" width={50} height={50} />
      </div>


      <ul className={`space-x-4  hidden md:flex  `}>

        {
          links.map((item, index) => (

            <li key={index}
              className="font-medium nav-link after:bg-pink-600"
            ><a href={item.link}>{item.name}</a></li>

          ))
        }

      </ul>




      <div className="flex gap-[15px] items-center">

        <div className="hover:bg-pink-600 hover:text-white hover:rounded-xl p-2 cursor-pointer hidden md:block">
          <Search className="w-5 h-5" onClick={() => setIsSearching(prev => !prev)} />
        </div>

        <div className="hover:bg-pink-600 hover:text-white hover:rounded-xl p-2 cursor-pointer">
          <Heart className="w-5 h-5" />
        </div>




        <div className="hover:bg-pink-600 hover:text-white hover:rounded-xl p-2 cursor-pointer">
          <User className="w-5 h-5" />
        </div>





        <div className="md:hidden">
          <Menu />

        </div>
      </div>


    </nav>
  );
}
