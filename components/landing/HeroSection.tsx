"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react";
import { fetchIfDeployed, deploy } from "@/utils";

const HeroSection = () => {
  const [isDeployed, setIsDeployed] = useState<Boolean>();
    const [loading, setLoading] = useState<Boolean>(false);

    // comment line 18-26 to make this page static

    // useEffect(() => {
    //     if (isDeployed == true) {
    //         pushPage();
    //     }
    // }, [isDeployed]);

    // function pushPage() {
    //     window.location.replace("/dashboard/active");
    // }
    useEffect(() => {
          checkDeployment();
      }, []);

    async function checkDeployment() {
        setLoading(true);
        const data = await fetchIfDeployed();
        console.log("deploy", data);
        setIsDeployed(data);
        setLoading(false);
    }

  return (
    <div className="w-full h-[625px] md:h-[650px] lg:h-[800px] xl:h-auto">
      <div className="top-[30%] lg:top-[40%] flex flex-col justify-center items-center text-center w-full absolute z-[5]">
        <div className="w-full hidden md:flex justify-end items-end top-[30%] absolute">
          <Image
            src="/icon2.svg"
            width="400"
            height="400"
            className="absolute w-[60%] sm:w-[30%]"
            alt="Card"
          />
        </div>
        <h1 className="text-[2.5rem] sm:text-8xl font-bold text-gradient ">
          Introducing <span className="block">iknowspots</span>
        </h1>
        <p className="m-5 text-lg sm:text-xl">
          Seamless granular events hosting with NFT tickets.
        </p>
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <Link className="" target="_blank" href="https://www.loom.com/share/5cee5fd7ee6d477e976f246fbda9ac21?sid=666d8812-f4a4-4d07-ab34-4310cdd08c4b">
            <button className="cta-button w-full px-4 sm:px-6 py-1 text-[0.8rem] sm:text-[1rem]">Demo Video</button>
          </Link>
          <Link className="" href={isDeployed ? "/dashboard/active" : "/dashboard"}>
            <button className="box-background w-full flex justify-center items-center gap-2 px-4 sm:px-6 py-1 text-[0.8rem] sm:text-[1rem]">
              Launch dApp
              <Image
                src={"/icons/arrow.svg"}
                width={17}
                height={20}
                alt="back-btn"
                className="back-btn rotate-180"
              />
            </button>
          </Link>
        </div>

        <div className="w-full flex justify-normal items-end my-5">
          <Image
            src="/icon.svg"
            width="400"
            height="400"
            className="relative w-[60%] sm:w-[30%] flex justify-center"
            alt="Card"
          />
        </div>
      </div>
      
      <div id="parent-div" className="relative hidden sm:flex w-full p-6 justify-center items-center">
        <Image
          src="/circles.svg"
          // src="/circles.png"
          width="1500"
          height="50"
          className="opacity-20"
          alt="Circle" />
        <Image
          src="/circles-mirror.svg"
          // src="/circles-mirror.png"
          width="1500"
          height="100"
          className="absolute top-0 -rotate-12 opacity-20"
          alt="Circle" />
      </div>
      <div>
        {/* <img src="/tpg.jpeg" alt="" className="absolute top-[95%] left-[10%] h-auto w-[30%] rotate-[25deg] skew-y-6 rounded-2xl"/> */}
      </div>
    </div>
  )
}
export default HeroSection