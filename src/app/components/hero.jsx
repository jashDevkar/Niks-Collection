"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react"; // custom arrows
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./navbar.css"


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
   slidesToShow:2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="flex flex-col md:flex-row md:items-center justify-between md:px-12 w-full px-5
      bg-gradient-to-br from-pink-100 via-pink-300 to-pink-100 pt-28 pb-16">
      <div className="md:w-1/2 space-y-4 mb-4 md:mb-0">
        <h1 className="text-4xl md:text-5xl font-bold text-pink-700 ">Discover new style</h1>
        <p className="text-lg text-gray-700">
          Elegant earrings, bracelets, Decor collections,and festive rakhis crafted with love by hands for your hands.
        </p>
        <Button className="bg-pink-600 hover:bg-pink-700 text-white shadow-lg rounded-full px-6 py-3">
          Explore now
        </Button>
      </div>


      <Slider {...settings} className="md:w-1/2 w-full">

        {
          Array.from({length:4}).map((_,index)=>(
            <div className="p-2 rounded-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
              <img src={`/${index+1}.png`} className="h-[300px] w-full  object-cover rounded-2xl" />
            </div>
          ))
        }


      </Slider>
    </section>
  );
}
