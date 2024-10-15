import Accordion from "@/components/FAQs";
import { Features } from "@/components/Features";
import Footer from "@/components/Footer";
import HomePage from "@/components/HomePage";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="">
      <div className="relative w-full flex items-center justify-center">
          <Navbar />
        </div>
      <HomePage />
      <Features />
      <Accordion />
      <Footer />
    </div>
  );
}
