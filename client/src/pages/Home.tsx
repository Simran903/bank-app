import { motion, Variants } from "framer-motion";
import { Button } from "../../@/components/ui/button";

const fadeInUpAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 2,
    },
  },
};
const Home = () => {
  return (
    <div
      className=""
      style={{
        backgroundImage: `url('./bg.png')`,
        height: "90vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col justify-center items-center text-[#9BA8AB] leading-loose">
        <motion.h1
          variants={fadeInUpAnimation}
          initial="hidden"
          animate="show"
          className="mt-24 text-5xl flex flex-col justify-center items-center font-bold"
        >
          Your Money, Your Way, Every Day
        </motion.h1>
        <motion.div
          className="border-b-2 border-[#253745]"
          variants={fadeInUpAnimation}
          initial="hidden"
          animate="show"
        >
          <motion.h2
            className="text-xl mt-4 font-semibold"
            variants={fadeInUpAnimation}
            initial="hidden"
            animate="show"
          >
            Empowering your financial decisions 24/7
          </motion.h2>
        </motion.div>
        <motion.div
          variants={fadeInUpAnimation}
          initial="hidden"
          animate="show"
        >
          <Button
            className="mt-8 px-5 py-2 relative overflow-hidden group"
            variant="outline"
            style={{
              position: "relative",
              zIndex: 1,
            }}
          >
            <span className="relative z-10">Open an account</span>
            <span
              className="absolute inset-0 bg-[#4A5C6A] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"
              style={{ zIndex: -1 }}
            ></span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
