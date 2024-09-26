"use client";
import React from "react";
import { TextRevealCard } from "../components/ui/text-reveal";

// Define the props interface
interface HeadingProps {
  text: string;
}

export function Heading({ text }: HeadingProps) {
  return (
    <div className="flex items-center justify-center w-full">
      <TextRevealCard text={text} />
    </div>
  );
}