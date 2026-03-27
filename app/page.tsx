"use client";
import Button from "../component/Button/page";
import Image from "next/image";

import { UserSearch, Compass, Building, Shield } from "lucide-react";
import { ReactNode, useEffect } from "react";

import Header from "../component/Header/Header";
import Footer from "../component/Footer/page";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  type landingpageDataType = {
    icon: ReactNode;
    title: string;
    description: string;
    topic: string;
  };

  type howItWorksDataType = {
    title: string;
    description: string;
  };

  const landingPageData: landingpageDataType[] = [
    {
      topic: "Guide",
      icon: (
        <UserSearch className="w-16 h-16  rounded-full bg-blue-100 p-2 text-blue-600" />
      ),
      title: "Find a Guide",
      description:
        "Book a guide in minutes and start your adventure immediately.",
    },

    {
      icon: (
        <Building className="w-16 h-16  rounded-full bg-blue-100 p-2 text-blue-600" />
      ),
      topic: "Tour",
      title: "City Tours",
      description:
        "Immersive long walking tours through various districts, markets and local shortcuts.",
    },

    {
      topic: "Security",

      icon: (
        <Shield className="w-16 h-16  rounded-full bg-blue-100 p-2 text-blue-600" />
      ),
      title: "Safe & Secure",
      description:
        "Your safety is our priority with 24/7 support and insurance coverage.",
    },
  ];

  const howItWorksData: howItWorksDataType[] = [
    {
      title: "Set Your Destination",
      description:
        "Tell us where you're going and we'll curate a list of perfect local match.",
    },
    {
      title: "Book Your Buddy",
      description:
        "Chat with guides, review their experties and book securely.",
    },
    {
      title: "Explore Like a Local",
      description:
        "Meet your guide and experience the city from an insider's perspective with 24/7 support.",
    },
  ];

  return (
    <>
      <Header />
      {/* h-[44rem] */}
      <div className="bg-[url('/homepage.jpg')]  bg-center w-full h-[31rem] relative flex flex-col justify-end  p-2">
        <div className="absolute inset-0 bg-gray-900 opacity-50 backdrop-blur-[1px]"></div>

        <div className="z-10 grid gap-4 text-white sm:w-1/2">
          <div className="text-[clamp(2.5rem,3vw+0.1rem,4rem)] font-bold leading-10 italic">
            Your Journey, <br />
            <span className="text-blue-600">Our Experties</span>
          </div>

          <div className="text-sm  ">
            Skip the tourist trap and generic tours. Connect with certified
            local experties who show you the hidden soul of every city through
            authentic, curated and experiences.
          </div>

          <div className="flex gap-4  ">
            <button
              onClick={() => router.push("/login")}
              className="p-2 hover:cursor-pointer w-1/2 rounded-3xl font-bold  bg-blue-700"
            >
              Get Started
            </button>
            <button
              onClick={() => router.push("#howItWorks")}
              className="hover:cursor-pointer p-2 w-1/2 rounded-3xl font-bold border bg-gray-50/5"
            >
              How it works
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8  mb-4">
        <div className="mx-4  text-[clamp(1.7rem,2vw+0.1rem,5rem)] font-bold relative after:content-[''] after:absolute after:bottom-0 after:left-1 after:w-16 after:h-1 after:bg-blue-500 ">
          Choose Your Adventure
        </div>

        <div className=" grid gap-4 px-4 py-8 sm:grid-cols-3">
          {landingPageData.map((e: landingpageDataType, index: number) => (
            <div
              key={index}
              className={`grid  comp-bg p-4 rounded-2xl place-items-center ${e.topic === "Security" && "[@media(min-width:380px)]:col-span-2  [@media(min-width:640px)]:col-span-1"}`}
            >
              {/* <UserSearch className="w-8 h-8" /> */}
              {e.icon}
              <div className=" mt-4 text-[clamp(1rem,2vw+0.1rem,3rem)] font-bold text-center">
                {e.title}
              </div>
              <div className="text-center text-slate-500 text-sm">
                {e.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div id="howItWorks" className="my-4 mx-4 ">
        <div className="text-[clamp(1.7rem,2vw+0.1rem,5rem)] font-bold relative after:content-[''] after:absolute after:bottom-0 after:left-1 after:w-16 after:h-1 after:bg-blue-500  ">
          How it works ?
        </div>

        <div className="flex flex-col comp-bg px-4 my-8 sm:flex-row sm:justify-center  sm:items-center">
          <div className="">
            {howItWorksData.map((e: howItWorksDataType, index: number) => (
              <div
                key={index}
                // className={`flex px-4  gap-4 comp-bg items-center`}
                className="grid grid-cols-[auto_1fr]  gap-4 mt-8  "
              >
                <div className="     ">
                  <div className=" w-10 h-10 grid place-items-center rounded-full bg-blue-100 ">
                    {index + 1}
                  </div>
                </div>

                {/* <div className=" border flex-1 pr-4 "> */}
                <div className="  flex-1 pr-4 ">
                  <div
                    className={` relative text-[clamp(1rem,2vw+0.1rem,3rem)] justify-start font-bold `}
                  >
                    {e.title}
                  </div>
                  <div className=" text-slate-500 text-sm">{e.description}</div>
                </div>
              </div>
            ))}
          </div>

          <div className=" flex justify-center w-full sm:w-lg py-4 items-center">
            <div className="relative  w-full max-w-sm aspect-square shadow-2xl">
              <Image
                src="/howto.jpg"
                alt="How to use"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid p-4 sm:p-8 gap-4 mx-4 bg-blue-700 sm:grid-cols-[2fr_1fr] rounded-2xl">
        <div className=" grid ">
          <div className="text-[clamp(1.5rem,3vw+1rem,2.5rem)] font-bold leading-tight text-white">
            Your Local Buddy, <br /> Now In Your Pocket
          </div>
          <div className="text-[clamp(0.7rem,2vw+0.1rem,1rem)] text-white">
            {" "}
            Use the GuideBuddy app for real-time navigation, privacy with your
            guides, and many exclusive deals comming soon Use the GuideBuddy app
            for real-time navigation, privacy with your guides, and many
            exclusive deals comming soon{" "}
          </div>
          <div className="flex items-start gap-4 sm:w-1/2">
            <button
              onClick={() => router.push("/login")}
              className="p-3 hover:cursor-pointer w-1/2 rounded-3xl font-bold ele-bg"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/signup")}
              className=" p-3 hover:cursor-pointer w-1/2 rounded-3xl font-bold ele-bg"
            >
              SignUp
            </button>
          </div>
        </div>

        <div className=" grid place-items-center">
          <div className="relative  w-full max-w-sm aspect-square shadow-2xl">
            <Image
              src={"/downloadapp.jpg"}
              alt="placeholder image"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
