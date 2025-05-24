"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionItemProps {
  title: string;
  content: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 dark:border-gray-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-4 text-lg md:text-xl font-semibold text-left text-black dark:text-white focus:outline-none"
      >
        <span className="text-zinc-900">{title}</span>
        <svg
          className={`w-5 h-5 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-gray-500 text-base md:text-lg">
              {content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Accordion: React.FC = () => {
  return (
    <div className="px-4">
      <h1 className="text-5xl md:text-7xl vast-shadow-regular font-extrabold text-center mb-16">
        FAQs
      </h1>
      <div className="max-w-4xl mx-auto space-y-6">
        <AccordionItem
          title="What types of accounts can I open with your bank?"
          content="We offer Savings account."
        />
        <AccordionItem
          title="How do I check my account balance?"
          content="You can check your account balance after you Sign in."
        />
        <AccordionItem
          title="How do I change my account details?"
          content="You can update your details after you Signin."
        />
        <AccordionItem
          title="How do I reset my online banking password?"
          content="SignIn → Click on '+' icon → Update Password."
        />
        <AccordionItem
          title="Is banking secure?"
          content="Yes, our mobile banking app uses advanced encryption and security protocols to protect your information."
        />
      </div>
    </div>
  );
};

export default Accordion;