"use client"

import { ShoppingCart, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import './navbar.css'
import { Menu } from 'lucide-react';
import Image from "next/image";





export default function Navbar() {




  return (
    <nav className={` flex justify-around items-center text-gray-700  glass-navbar rounded-full `}>

      <div className="w-[50px]">
        <Image src={"/logo.png"} alt="logo" width={70} height={70}/>
      </div>


      <ul className={`space-x-3  hidden md:flex `}>
        <li>
          <a href="#" className={`nav-link`}>Categories</a>
        </li>

        <li className="nav-link">
          <a href="#">Bracelets</a>
        </li>

        <li className="nav-link">
          <a href="#">Kids rakhis</a>
        </li>

        <li className="nav-link">
          <a href="#">Customised dupatta</a>
        </li>

      </ul>




      <div className="flex space-x-[20px]">

        <User />
        <ShoppingCart />

        <div className="md:hidden">
          <Menu />

        </div>
      </div>


    </nav>
  );
}
