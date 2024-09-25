import React from "react";
import { MacbookScroll } from "../components/ui/macbook-scroll";
import services from '../app/public/services.png'

export function MacbookScrollDemo() {
  return (
    <div className="overflow-hidden bg-[#0a2351] w-full">
      <MacbookScroll
        title={
          <div>
            <span className="text-5xl font-extrabold">
              Simplifying Banking for the Modern World
            </span>
            <br />
            <span className="text-xl">
              ~Helping you achieve your goals, every step of the way~
              </span>
          </div>
        }
        src={services}
        showGradient={false}
      />
    </div>
  );
}
