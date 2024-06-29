import React from "react";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../../@/components/ui/card";

interface ServiceCardProps {
    image: string;
    title: string;
    description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ image, title, description }) => {
    return (
        <div className="">
            <Card className="p-10 shadow-2xl hover:shadow-blue-glow hover:shadow-2xl transition-shadow duration-300 bg-[#4A5C6A] bg-opacity-10 cursor-pointer border-none">
                <CardHeader>
                    <img src={image} alt="" />
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
};

export default ServiceCard;
