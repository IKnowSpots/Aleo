/* eslint-disable @next/next/no-img-element */
"use client"
import Image from "next/image";
import { useState } from "react";
import { pauseEvent } from "@/utils"
import { currency } from "@/config"
import LoadingModal from "./LoadingModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CardsActive = ({ image, name, price, date, tokenId, remaining, supply, setActiveEvents }: { image: any; name: string; price: any; date: any; tokenId: any; remaining: any; supply: any,setActiveEvents: any }) => {

  const [loading, setLoading] = useState(false)

  async function pauseEventCall(tokenId: any) {
    setLoading(true)
    console.log(tokenId)
    const isPaused = await pauseEvent(tokenId)
    setActiveEvents((events:any)=>events.filter((event:any)=>event.tokenId!==tokenId));
    if (isPaused == true) {
            toast.success("Event Paused!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
    setLoading(false)
  }

    return (
        <>
        // visible={loading}/>
        <div className="text-white w-[23%] px-4 box-background pt-4 pb-5 rounded-xl">
            <div className="flex flex-col gap-6">
                <img
                    src={image}
                    className="h-[250px] rounded-xl"
                    // width="195"
                    // height="200"
                    alt="Event&apos;s Image"
                />
                <div className="flex gap-2 text-[0.85rem] flex-col">
                    <div className="flex justify-between items-center">
                        <p>{name}</p>
                        <p>{price} {currency}</p>
                    </div>
                    <div className="h-[2px] rounded-full bg-white"></div>
                    <div className="flex justify-between items-center">
                        <p>Bought: { supply - remaining }</p>
                        <p>{date}</p>
                    </div>
                    {/* <p>{remaining}/{supply}</p> */}
                    {/* <p>1.20 Weth</p> */}
                    <div className="flex justify-center items-center">
                        <button className="view-btn px-4 py-0.5 outline rounded-lg" onClick={() => pauseEventCall(tokenId)}>
                            Pause
                        </button>
                    </div>

                </div>
                {/* <hr />
                <div className="flex justify-between my-6">
                <p>End&apos;s In 01.34.45</p>
                <button className="px-4 py-1 outline rounded-lg">
                        Run
                    </button>
                </div> */}
                <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            </div>
            {/* <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            /> */}
        </div>
        </>
    );
};
export default CardsActive;
