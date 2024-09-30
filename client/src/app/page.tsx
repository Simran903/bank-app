import Accordion from "@/components/FAQs";
import { Features } from "@/components/Features";
import Footer from "@/components/Footer";
import HomePage from "@/components/HomePage";

export default function Home() {
  return (
    <div className="">
      <HomePage />
      <Features />
      <Accordion />
      <Footer />
    </div>
  );
}
