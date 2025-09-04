"use client";
import React from "react";

export default function Spinner({ size = "w-6 h-6", color = "border-pink-600" }) {
    return (
        <div
            className={`rounded-full border-4 ${color} border-t-transparent animate-spin ${size}`}
        ></div>
    );
}
