"use client";


import Navbaar from "./components/navbar";
import Hero from "./components/hero.jsx";
import Categories from "./components/Categories.jsx";
import { Bounce, ToastContainer } from 'react-toastify';

import Product from '../app/components/Product.jsx'



export default function Home() {
  return (
    <main className="bg-white text-gray-900 ">
       
       {/* Hero */}
      <Hero />

      <div >
        {/* Categories */}
        <Categories/>

        {/* Products */}
        
      </div>



      <Product/>


      {/* Footer */}
      <footer className="py-8 text-center shadow-inner">
        <p className="text-gray-600">
          © {new Date().getFullYear()} Niks Collection. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
