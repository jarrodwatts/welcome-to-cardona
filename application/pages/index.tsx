import type { NextPage } from "next";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="max-w-[1440px] bg-white/5 rounded-3xl p-18 relative overflow-hidden mt-24 mx-[2.5rem] min-h-[620px] p-20">
      {/* Gradient 1 */}
      <img
        src="/gradient1.webp"
        className="absolute top-0 left-[-18%] w-full h-full -z-10 opacity-75"
      />

      {/* Gradient 2 */}
      <img
        src="/gradient2.webp"
        className="absolute top-0 left-[13%] w-full h-full -z-10 opacity-75"
      />

      {/* Content */}

      <div className="mx-auto flex flex-col pl-4">
        <h1 className="text-[2.675rem] font-medium leading-none">
          Polygon @ ETH Denver
        </h1>

        <p className="font-medium text-[#adabb2] mt-6">
          Welcome to ETH Denver, anon.
        </p>

        <p className="font-medium text-[#adabb2] mt-6">
          Welcome to ETH Denver, anon.
        </p>
      </div>
    </div>
  );
};

export default Home;
