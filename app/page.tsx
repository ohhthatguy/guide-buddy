"use client";
import Button from "../component/Button/page";

import { MapPin, Users, Shield, Clock } from "lucide-react";
import { ReactNode, useEffect } from "react";

import Header from "../component/Header/Header";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  type landingpageDataType = {
    image: ReactNode;
    title: string;
    description: string;
  };

  const landingPageData: landingpageDataType[] = [
    {
      image: <MapPin className="w-8 h-8 text-blue-600" />,
      title: "  Real-Time Tracking",
      description:
        "Track your guide's location in real-time for a seamless meetup experience.",
    },

    {
      image: <Users className="w-8 h-8 text-blue-600" />,
      title: "Verified Guides",
      description:
        "All guides are thoroughly vetted and certified professionals.",
    },
    {
      image: <Clock className="w-8 h-8 text-blue-600" />,
      title: "Instant Booking",
      description:
        "Book a guide in minutes and start your adventure immediately.",
    },
    {
      image: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Safe & Secure",
      description:
        "Your safety is our priority with 24/7 support and insurance coverage.",
    },
  ];

  return (
    <>
      <Header />
      <section className="flex flex-col justify-center items-center  py-24 ">
        <h1 className=" text-center mb-4">
          Discover Your City with <br /> Local Expert Guides
        </h1>
        <p className=" text-xl text-gray-600 max-w-2xl mb-8 text-center ">
          Connect with profesional guides instantly.Explore, learn, and
          experience like never before.
        </p>
        <Button onClick={() => router.push("/home")}>Find a Guide now! </Button>
      </section>

      <section>
        <h2 className="text-center">Why guideme ?</h2>

        <div className="flex justify-around">
          {landingPageData?.map((e, index) => (
            <div key={index} className=" hover:scale-110 transition-all p-12">
              <div className="w-16 h-16 ele-bg rounded-full flex items-center justify-center mx-auto mb-4">
                {e.image}
              </div>
              <h2 className="text-center mb-4">{e.title}</h2>
              <div className="text-xl text-gray-600 max-w-2xl mb-8 text-center  ">
                {e.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col justify-center items-center h-80  shadow-[inset_0_2px_6px_rgba(0,0,0,1)] bg-linear-to-r from-blue-600 to-blue-700">
        <h3 className="mb-4 text-white">Ready to explore ?!</h3>

        <p className="text-xl text-white max-w-2xl mb-8 text-center ">
          Join thousands of explorers discovering the world with local guides.
        </p>

        <Button varient="secondary" size="md">
          Get Started
        </Button>
      </section>
    </>
  );
}
