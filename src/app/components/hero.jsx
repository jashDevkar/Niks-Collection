"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react"; // custom arrows
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function NextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-pink-600 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-pink-700 z-10"
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
      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-pink-600 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-pink-700 z-10"
      onClick={onClick}
    >
      <ChevronLeft size={20} />
    </div>
  );
}

export default function Hero() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 700, // mobile
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-12 py-16 bg-gradient-to-br from-pink-100 via-pink-300 to-pink-100 pt-28">
      {/* Left content */}
      <div className="md:w-1/2 space-y-6">
        <h2 className="text-4xl md:text-5xl font-bold text-pink-700 leading-tight">
          Discover Timeless Jewelry
        </h2>
        <p className="text-lg text-gray-700">
          Elegant earrings, bracelets, Decor collections,and festive rakhis crafted with love by hands for your hands.
        </p>
        <Button className="bg-pink-600 hover:bg-pink-700 text-white shadow-lg rounded-full px-6 py-3">
          Shop Now
        </Button>
      </div>

      {/* Carousel */}
      <div className="md:w-1/2 w-full mt-10 md:mt-0 relative">
        <Slider {...settings}>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="p-3">
              <div className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 bg-white">
                <Image
                  src={`/${index + 1}.png`}
                  alt={`Jewelry ${index + 1}`}
                  width={600}
                  height={400}
                  className="w-full h-[350px] object-cover"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
