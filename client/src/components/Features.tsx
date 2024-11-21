import { HoverEffect } from "../components/ui/card-hover-effect";

export function Features() {
  return (
    <div className="h-screen">
      <h1 className="text-7xl vast-shadow-regular font-extrabold flex justify-center items-center pt-20 md:pt-60">
        Features
      </h1>
      <div className="max-w-5xl mx-auto px-8">
        <HoverEffect items={projects} />
      </div>
    </div>
  );
}

export const projects = [
  {
    title: "Account Overview Dashboard",
    description:
      "Get a comprehensive view of your account, including balance details, recent transactions, and more.",
  
  },
  {
    title: "Secure Fund Transfers",
    description:
    "Transfer money easily and securely to other accounts, both within and outside the bank.",

  },
  {
    title: "Transaction History",
    description:
    "View, search, and filter your entire transaction history at a glance.",
  },
  {
    title: "Link Multiple Accounts",
    description:
    "Link multiple bank accounts seamlessly for unified management and convenience.",
  },
  {
    title: "Update Linked Account Details",
    description:
    "Easily update your linked bank account details anytime to keep your information accurate and up-to-date.",
  },
  {
    title: "Real-Time Transaction Tracking",
    description:
    "Monitor your transactions in real-time with detailed insights for better financial control.",
  },
  {
    title: "Secure Password Management",
    description:
    "Update your password anytime to ensure your account stays protected and secure.",
  },
  {
    title: "Security",
    description:
    "Ensure your account is protected with the latest security features.",
  },
];
