import Accordion from "@/components/FAQs";
import { Features } from "@/components/Features";
import HomePage from "@/components/HomePage";

export default function Home() {
  return (
    <div className="">
      <HomePage />
      <Features />
      <Accordion />
    </div>
  );
}
