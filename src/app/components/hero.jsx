"use client";

import { ChevronLeft, ChevronRight, MoveRight, MoveRightIcon } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";

function NextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute right-4 top-1/2 -translate-y-1/2 bg-pink-600 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-pink-700 z-10"
      onClick={onClick}
    >
      <ChevronRight size={20} />
    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute left-4 top-1/2 -translate-y-1/2 bg-pink-600 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-pink-700 z-10"
      onClick={onClick}
    >
      <ChevronLeft size={20} />
    </div>
  );
}

export default function Hero() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
  };

  return (
    <section className="relative h-screen w-screen overflow-hidden">
      {/* Slider */}
      <Slider {...settings} className="h-screen w-screen">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-screen w-screen">
            <img
              src={`/${index + 1}.png`}
              alt={`slide-${index}`}
              className="h-screen w-screen object-cover"
            />
          </div>
        ))}
      </Slider>

      {/* Overlay content */}
      <motion.div

        className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-center text-white px-6">
        <motion.div
        className="flex flex-col items-center"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, }}
          viewport={{ once: false }}

        >
          <h1

            className="text-4xl md:text-6xl font-bold mb-4">
            Discover new style
          </h1>
          <motion.p

            className="max-w-2xl mb-6 text-lg md:text-xl">
            Elegant earrings, bracelets, decor collections, and festive rakhis crafted with love by hands for your hands.
          </motion.p>
          <button className="w-fit px-6 py-3 flex items-center gap-2 bg-pink-600 hover:bg-pink-700 transition font-semibold text-lg rounded-full">
            Explore now <MoveRightIcon />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
