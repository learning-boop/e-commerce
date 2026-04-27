"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDES = ["/banner4.png"];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[30vh] md:h-[110vh] lg:h-[110vh] overflow-hidden bg-amber-50">
        <Image
          src='/banner4.png'
          alt="banner"
          fill
          className={`object-cover object-center transition-opacity duration-700`}
        />
    </section>
  );
}
