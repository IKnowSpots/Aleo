"use client";
import { useState } from "react";
import copy from "clipboard-copy";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CopyToClipboardButton = ({ textToCopy }) => {

  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await copy(textToCopy);
      // toast.success("Copied to clipboard!", {
      //   position: "top-right",
      //   autoClose: false,
      //   hideProgressBar: true,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "dark",
      // });
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);

    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  return (
    <>
      <div className="flex  gap-2 text-[0.8rem] cursor-pointer">
        <img
          src="/copy.png"
          className={` ${isCopied ? "w-[20%] h-[20%] flex justify-center items-center" : "w-[45%]"}`}
          alt=""
          onClick={handleCopyClick}
        />
        {isCopied && <p className="px-2 py-1 rounded-2xl text-black font-bold bg-white">Copied!</p>}
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
    </>
  );
};

export default CopyToClipboardButton;
