"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Navbaar from "./components/navbar";
import Hero from "./components/hero.jsx";

const products = [
  { id: 1, name: "Elegant Earrings", image: "/earrings.jpg", price: "₹1,499" },
  { id: 2, name: "Gold Bracelet", image: "/bracelet.jpg", price: "₹2,999" },
  { id: 3, name: "Festive Rakhi", image: "/rakhi.jpg", price: "₹799" },
  { id: 4, name: "Luxury Gift Box", image: "/giftbox.jpg", price: "₹3,499" },
];

const categories = [
  { id: 1, name: "Bracelets", image: "/bracelet.jpg" },
  { id: 2, name: "Baby Shower", image: "/babyshower.jpg" },
  { id: 3, name: "Dupatta", image: "/dupatta.jpg" },
  { id: 4, name: "Rakhis", image: "/rakhi.jpg" },
  { id: 5, name: "Baby Rakhis", image: "/babyrakhi.jpg" },
];

export default function Home() {
  return (
    <main className="bg-white text-gray-900 overflow-x-hidden">
      {/* Navbar */}
      <Navbaar />

      {/* Hero */}
      <Hero />

      <div >
        {/* Categories */}
        <section className="px-12">

          <div className="text-center my-28 space-y-1.5">
            <h3 className="text-4xl font-bold  text-pink-600 mb-4 ">
              Our Collections
            </h3>
            <div className="flex items-center justify-center">
              <p className="text-gray-700 font-semibold text-xl tracking-wide md:w-1/2 p-0">
              Discover our carefully curated collections of jewelry and accessories, each piece telling its own unique story.
            </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: false }}
              >
                <Card className="shadow-md hover:shadow-xl cursor-pointer border-pink-600">
                  <CardContent className="p-4 text-center">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <h4 className="mt-3 font-medium text-gray-700">{cat.name}</h4>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Products */}
        <section className="px-12 py-16">
          <h3 className="text-3xl font-semibold text-left text-pink-700 mb-10">
            Featured Products
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="shadow-md hover:shadow-xl transition rounded-2xl hover:cursor-pointer border-1 border-pink-700">
                  <CardContent className="p-4 flex flex-col items-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="rounded-lg object-cover"
                    />
                    <h4 className="mt-4 text-lg font-semibold">{product.name}</h4>
                    <p className="text-gray-600">{product.price}</p>
                    <Button className="mt-4 bg-pink-600 hover:bg-pink-700 text-white">
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-pink-100 py-8 text-center shadow-inner">
        <p className="text-gray-600">
          © {new Date().getFullYear()} Niks Collection. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
