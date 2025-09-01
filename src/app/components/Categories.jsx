import React from 'react'
import { motion } from "framer-motion";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

import CategoryCard from './CategoryCard.jsx'

function Categories() {

  const categories = [
    { id: 1, name: "Bracelets", image: "/bracelet.png", description: "Handcrafted bracelets in gold, silver, and rose gold. Perfect for everyday wear or special occasions." },
    { id: 2, name: "Baby Shower", image: "/babyshower.png" },
    { id: 3, name: "Dupatta", image: "/dupatta.jpg" },
    { id: 4, name: "Rakhis", image: "/rakhi.png" ,description:"Beautiful rakhis crafted with care for Raksha Bandhan. Traditional designs with modern appeal." },
    { id: 5, name: "Baby Rakhis", image: "/babyrakhi.png" },
  ];

  return (
    <section className="px-12">

      <div className="text-center mt-20 mb-10 space-y-1.5">
        <h3 className="text-5xl font-bold  text-pink-600 mb-4 ">
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

            <CategoryCard cat={cat} />

          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Categories