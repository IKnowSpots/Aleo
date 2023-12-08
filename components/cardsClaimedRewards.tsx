import React, { useEffect, useState } from "react";

export default function ClaimedRewards({ image, name }: { image: any, name: any }) {

    const [loading, setLoading] = useState(false)

    return (
        <div>
            <div className="w-full mb-12">
                <div className="flex flex-col gap-4 py-4 justify-center items-center w-full">
                    <div className="flex justify-center items-center w-full">
                        <div className="flex flex-col gap-2 w-[90%] pl-5 pt-5 pr-4 claimed-bg rounded-lg">
                            <img src="/sample-img.png" className="w-full rounded-lg" alt="" />
                            <div className="flex justify-between px-2 pb-4 items-center font-semibold">
                                <p>{name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
