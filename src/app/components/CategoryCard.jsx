"use client"

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

function CategoryCard({ cat }) {


    const [loading,setLoading] = useState(true);


    return (
        <div className="flex flex-col h-full group rounded-xl border border-gray-200 overflow-hidden shadow-sm cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300 pb-4">

            <div className="h-64 overflow-hidden relative">
                <Image
                    src={cat.image}
                    alt={cat.name}
                    width={300}
                    onLoadingComplete={()=>setLoading(false)}
                    height={300}
                    className="h-full w-full object-cover group-hover:scale-110 duration-300 transition-all"
                />
            </div>

            <div className="flex flex-col flex-1 px-2 text-left space-y-2 mt-2">
                <div className="flex justify-between">
                    <h1 className="font-semibold text-xl">{cat.name}</h1>
                    <div>item count</div>
                </div>

          
                <p className="flex-1 text-gray-700 my-2">{cat.description}</p>


                <div className="flex justify-center mt-2">
                    <Button className='bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-all duration-300 cursor-pointer' >Explore now <ArrowRight/></Button>
                </div>
            </div>
        </div>
    )
}

export default CategoryCard
