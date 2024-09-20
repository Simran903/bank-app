"use client";
import React from "react";
import { TextRevealCard } from "../components/ui/text-reveal";

// Define the props interface
interface HeadingProps {
  text: string;
  revealText: string;
}

export function Heading({ text, revealText }: HeadingProps) {
  return (
    <div className="flex items-center justify-center w-full">
      <TextRevealCard text={text} revealText={revealText} />
    </div>
  );
}