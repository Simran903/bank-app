import React from "react";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../../@/components/ui/card";
import { motion, Variants } from "framer-motion";

interface ServiceCardProps {
    image: string;
    title: string;
    description: string;
}

const fadeInUpAnimation: Variants = {
    hidden: {
      opacity: 0,
      y: 500,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 5,
      },
    },
  };

const ServiceCard: React.FC<ServiceCardProps> = ({ image, title, description }) => {
    return (
        <motion.div
        variants={fadeInUpAnimation}
          initial="hidden"
          animate="show"
          whileHover={{ scale: 1.05, transition: { duration: 0.6 } }}
          
        >
            <Card className="p-10 shadow-2xl hover:shadow-blue-glow transition-shadow duration-300 bg-[#4A5C6A] bg-opacity-10 cursor-pointer border-none">
                <CardHeader>
                    <img src={image} alt="" />
                    <CardTitle className="py-2 text-white">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
            </Card>
        </motion.div>
    );
};

export default ServiceCard;
