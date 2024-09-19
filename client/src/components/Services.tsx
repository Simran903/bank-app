"use client";
import Image from "next/image";
import React from "react";
import { WobbleCard } from "./ui/wobble-card";
import { Heading } from "./Heading";

export function Services() {
  return (
    <div className="bg-black h-screen">
      <Heading text="What we Offer" revealText="Our Services" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full px-16 lg:p-0">
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-2 h-full bg-[#14A76C] min-h-[400px] lg:min-h-[300px]"
          className=""
        >
          <div className="max-w-xs">
            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Gippity AI powers the entire universe
            </h2>
            <p className="mt-4 text-left  text-base/6 text-neutral-200">
              With over 100,000 mothly active bot users, Gippity AI is the most
              popular AI platform for developers.
            </p>
          </div>
          <Image
            src="https://plus.unsplash.com/premium_photo-1661666635660-e82a315fb13d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFua2luZ3xlbnwwfHwwfHx8MA%3D%3D"
            width={500}
            height={500}
            alt="linear demo image"
            className="absolute -right-4 lg:-right-[20%] grayscale filter -bottom-10 object-contain rounded-2xl"
          />
        </WobbleCard>
        <WobbleCard containerClassName="col-span-1 min-h-[300px]">
          <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            No shirt, no shoes, no weapons.
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            If someone yells “stop!”, goes limp, or taps out, the fight is over.
          </p>
        </WobbleCard>
        <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-[#FF652F] min-h-[400px] lg:min-h-[600px] xl:min-h-[300px]">
          <div className="max-w-sm">
            <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Signup for blazing-fast cutting-edge state of the art Gippity AI
              wrapper today!
            </h2>
            <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
              With over 100,000 mothly active bot users, Gippity AI is the most
              popular AI platform for developers.
            </p>
          </div>
          <Image
            src="https://plus.unsplash.com/premium_photo-1661301075857-63868ae88c00?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            width={500}
            height={500}
            alt="linear demo image"
            className="absolute -right-10 md:-right-[40%] lg:-right-[15%] -bottom-10 object-contain rounded-2xl"
          />
        </WobbleCard>
      </div>
    </div>
  );
}
