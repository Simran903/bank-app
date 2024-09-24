import React from "react";
import { MacbookScroll } from "../components/ui/macbook-scroll";
import building from '../app/public/building.jpg'

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
        src={building}
        showGradient={false}
      />
    </div>
  );
}
