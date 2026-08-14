"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { FollowerPointerCard } from "./following-pointer";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[300vh] pt-20 pb-[10px] overflow-hidden antialiased relative flex flex-col self-auto perspective-[1000px] transform-3d"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product, idx) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title + idx}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20 ">
          {secondRow.map((product, idx) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title + idx}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product, idx) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title + idx}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto pt-10 md:pt-20 pb-10 px-4 w-full left-0 top-0 flex flex-col items-center">
      <div className="relative flex justify-center items-center py-10 md:py-20 -mb-4 overflow-hidden pointer-events-none w-full">
        <span
          className="absolute text-[6rem] md:text-[9rem] lg:text-[13rem] font-bold text-gray-200/80 dark:text-zinc-800/80 select-none z-0 tracking-tighter whitespace-nowrap"
          style={{ fontFamily: "'Brush Script MT', 'Caveat', 'Dancing Script', var(--font-playfair), cursive" }}
        >
          Projects
        </span>
        <h2 className="relative text-3xl md:text-5xl lg:text-6xl font-black text-black dark:text-white tracking-widest uppercase z-10 text-center">
          ELITE PROJECTS.
        </h2>
      </div>
      <p className="max-w-2xl text-center text-zinc-600 dark:text-zinc-400 text-lg md:text-xl font-medium leading-relaxed mt-4">
        A hyper-focused showcase of high-fidelity digital solutions,
        where precision engineering meets innovative design.
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-80 w-100 relative shrink-0"
    >
      <FollowerPointerCard title={product.title} className="h-full w-full">
        <Link
          href={product.link}
          target="_blank"
          className="relative h-full w-full block group-hover/product:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden border border-white/10"
        >
          <Image
            src={product.thumbnail}
            height="600"
            width="600"
            className="object-cover object-top-left absolute h-full w-full inset-0 transition-transform duration-700 group-hover/product:scale-110"
            alt={product.title}
          />
        </Link>
        <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-60 bg-black pointer-events-none transition-opacity duration-500"></div>
        <h3 className="absolute bottom-6 left-6 opacity-0 group-hover/product:opacity-100 text-white text-2xl font-bold transition-all duration-500 translate-y-4 group-hover/product:translate-y-0">
          {product.title}
        </h3>
      </FollowerPointerCard>
    </motion.div>
  );
};
