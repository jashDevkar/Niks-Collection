"use client"

import { ShoppingCart, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import './navbar.css'
import { Menu } from 'lucide-react';





export default function Navbar() {




  return (
    <nav className={` flex justify-around text-white  glass-navbar rounded-full `}>

      <div>
        <h1>
          Niks-Collection
        </h1>
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
