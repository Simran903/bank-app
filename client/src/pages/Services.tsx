import React from "react";
import ServiceCard from "../components/ServiceCard/ServiceCard";

interface CardData {
    title: string;
    description: string;
    image: string;
}

const cardData: CardData[] = [
    {
        title: "Overview of your Account",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non mauris vel lectus malesuada condimentum.",
        image: "./services/overview.png"
    },
    {
        title: "Reports and Analytics",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non mauris vel lectus malesuada condimentum.",
        image: "./services/reports.png"
    },
    {
        title: "Transfer Money",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non mauris vel lectus malesuada condimentum.",
        image: "./services/transaction.png"
    },
    {
        title: "Customer Support",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non mauris vel lectus malesuada condimentum.",
        image: "./services/support.png"
    }
];

const Services: React.FC = () => {
    return (
        <div className="h-screen pt-16 flex flex-col items-center" id="services">
            <h1 className="text-[#CCD0CF] text-5xl font-bold">Our Services</h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 items-center mt-20 mx-20">
                {cardData.map((data, index) => (
                    <ServiceCard
                        key={index}
                        image={data.image}
                        title={data.title}
                        description={data.description}
                    />
                ))}
            </div>
        </div>
    );
};

export default Services;
