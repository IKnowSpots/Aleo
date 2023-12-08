"use"
import { WalletNotConnectedError } from "@demox-labs/aleo-wallet-adapter-base";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import React, { FC, useCallback, useEffect } from "react";
import "@demox-labs/aleo-wallet-adapter-reactui/styles.css"
import { WalletMultiButton } from "@demox-labs/aleo-wallet-adapter-reactui";

const WalletProvider: FC = () => {
    const { wallet, publicKey } = useWallet();

    useEffect(() => {
        console.log("pk", publicKey, wallet)

    }, [publicKey, wallet]);

    const onClick = useCallback(async () => {
        console.log("pk", publicKey)
        if (!publicKey) throw new WalletNotConnectedError();

        const message = "a message to sign";

        const bytes = new TextEncoder().encode(message);
        const signatureBytes = await (
            wallet?.adapter as LeoWalletAdapter
        ).signMessage(bytes);
        const signature = new TextDecoder().decode(signatureBytes);
        alert("Signed message: " + signature);
    }, [wallet, publicKey]);


    return (

        <button onClick={() => { console.log("something clicked"); onClick() }} disabled={!publicKey}>
        </button>
        // <WalletMultiButton></WalletMultiButton>
    );
};

export default WalletProvider;
