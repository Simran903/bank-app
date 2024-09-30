"use client";
import React, { useState } from "react";

interface AccordionItemProps {
  title: string;
  content: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-700 mb-5">
      <button
        className="flex justify-between w-full py-4 text-2xl font-semibold text-left text-black focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div className="py-2 text-gray-800 transition-all duration-500 ease-out text-lg">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

const Accordion: React.FC = () => {
  return (
    <div className="h-screen">
      <h1 className="text-7xl vast-shadow-regular font-extrabold flex justify-center items-center pt-36">
        FAQs
      </h1>
      <div className="w-full mt-24 max-w-6xl mx-auto">
        <AccordionItem
          title="Is it accessible?"
          content="Yes, the accordion is fully accessible with keyboard navigation and screen readers."
        />
        <AccordionItem
          title="Is it styled?"
          content="Yes, the accordion is styled using Tailwind CSS."
        />
        <AccordionItem
          title="Is it animated?"
          content="Yes, the opening and closing of the accordion have smooth animations."
        />
        <AccordionItem
          title="Is it animated?"
          content="Yes, the opening and closing of the accordion have smooth animations."
        />
        <AccordionItem
          title="Is it animated?"
          content="Yes, the opening and closing of the accordion have smooth animations."
        />
      </div>
    </div>
  );
};

export default Accordion;
