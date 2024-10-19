import Accordion from "@/components/FAQs";
import { Features } from "@/components/Features";
import Footer from "@/components/Footer";
import HomePage from "@/components/HomePage";
import Navbar from "@/components/Navbar";

export default function Home() {

  return (
    <div>
      <div className="relative w-full flex items-center justify-center">
        <Navbar />
      </div>
      <section id="home">
        <HomePage />
      </section>
      <section id="features">
        <Features />
      </section>
      <section id="accordion">
        <Accordion />
      </section>
      <section id="footer">
        <Footer />
      </section>
    </div>
  );
}
