"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDES = ["/banner.png", "/banner4.png"];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[30vh] md:h-[100vh] lg:h-[100vh] overflow-hidden bg-amber-50">
      {SLIDES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt="banner"
          fill
          priority={i === 0}
          className={`object-cover object-center transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </section>
  );
}
