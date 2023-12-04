import { AleoWorker } from './AleoWorker';
import * as Aleo from '@demox-labs/aleo-sdk-web';
import { useState, useEffect, ChangeEvent, useMemo } from 'react';
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react';
import { LeoWalletAdapter } from '@demox-labs/aleo-wallet-adapter-leo';
import {
  Transaction,
  WalletAdapterNetwork,
  WalletNotConnectedError,
} from '@demox-labs/aleo-wallet-adapter-base';




/* export async function handleSubmit(publicKey,event) {
    // event.preventDefault();
    if (!publicKey) throw new WalletNotConnectedError();

    const aleoDeployment = new Deployment(
      publicKey,
      WalletAdapterNetwork.Testnet,
      program,
      Math.floor(parseFloat(fee) * 1_000_000),
    );

    const txId =
      (await (wallet?.adapter ).requestDeploy(
        aleoDeployment
      )) || '';
    // setTransactionId(txId);
    console.log("txId ",txId);
  }; */

async function fetchDataUntilAvailable(url, maxAttempts = 20, delay = 5000) {
    try {
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        // You can adjust this condition as needed, based on the expected data format
        if (data && !data.error) {
        return data;
        }
    }
    } catch (error) {
    console.error("Error fetching data:", error);
    }

    if (maxAttempts <= 1) {
    throw new Error("Couldn't fetch data - something went wrong");
    }

    await new Promise(resolve => setTimeout(resolve, delay));

    return fetchDataUntilAvailable(url, maxAttempts - 1, delay);
}


export function getValueOfField(recordString, fieldName) {
    try {
        // Look for the field in the string using a regular expression
        const regex = new RegExp(fieldName + "\\s*:\\s*([\\w\\.]+)");
        const match = regex.exec(recordString);

        if (match && match[1]) {
            return match[1].split('.')[0]; // Split at '.' and return the first part
        }
    } catch (error) {
        console.error('Error parsing record:', error);
    }
    return null;
}


export async function create_private_event(event_id,max_supply){
    // const aleoWorker = AleoWorker();
    console.log(`Create Event for ${event_id} with maxSupply ${max_supply}`);

    try {
        const event_id_field = event_id + "field"
        const max_supply_u32 = max_supply + "u32"
        let program_name = "iknowspots_1.aleo";
        let function_name = "create_private_event";
        let transaction_id;
        console.log("event_id_field ",event_id_field);
        console.log("max_supply_u32 ",max_supply_u32);
        console.log("program_name ",program_name);
        console.log("function_name ",function_name);

        await aleoWorker.execute(program_name, function_name, [event_id_field, max_supply_u32])
        .then((tx_id) => {
            console.log("This transaction was completed");
            transaction_id = tx_id;
            // tx_id now holds the transaction ID and you can use it here
            console.log("Transaction ID:", tx_id);
        })
        .catch((error) => {
            // Handle any errors here
            console.error("Error during execution:", error);
        });

        const transactionUrl = "http://localhost:3030/testnet3/transaction/" + transaction_id;
        console.log("transactionUrl => ",transactionUrl)
        const data = await fetchDataUntilAvailable(transactionUrl);
        const record =  data.execution.transitions[0].outputs[0].value;
        console.log("record ",record);
        const decryptedRecord = await aleoWorker.decrypt_record(record);
        console.log("decryptedRecord => ",decryptedRecord);
        // console.log("haha");
        return decryptedRecord;

    } catch (error) {
    console.error("Error in createEvent function ",error);
    }
    return null;
}

export async function create_public_event(event_id,max_supply){
    // const aleoWorker = AleoWorker();
    console.log(`Create Event for ${event_id} with maxSupply ${max_supply}`);

    try {
        const event_id_field = event_id + "field"
        const max_supply_u32 = max_supply + "u32"
        let program_name = "iknowspots_1.aleo";
        let function_name = "create_public_event";
        let transaction_id;
        console.log("event_id_field ",event_id_field);
        console.log("max_supply_u32 ",max_supply_u32);
        console.log("program_name ",program_name);
        console.log("function_name ",function_name);

        await aleoWorker.execute(program_name, function_name, [event_id_field, max_supply_u32])
        .then((tx_id) => {
            console.log("This transaction was completed");
            transaction_id = tx_id;
            // tx_id now holds the transaction ID and you can use it here
            console.log("Transaction ID:", tx_id);
        })
        .catch((error) => {
            // Handle any errors here
            console.error("Error during execution:", error);
        });

        const transactionUrl = "http://localhost:3030/testnet3/transaction/" + transaction_id;
        console.log("transactionUrl => ",transactionUrl)
        const data = await fetchDataUntilAvailable(transactionUrl);
        const record =  data.execution.transitions[0].outputs[0].value;
        console.log("record ",record);
        const decryptedRecord = await aleoWorker.decrypt_record(record);
        console.log("decryptedRecord => ",decryptedRecord);
        // console.log("haha");

    } catch (error) {
    console.error("Error in createEvent function ",error);
    }

}
/*
export async function call_hello_world(num1,num2){
    console.log("num1 => ",num," num2 => ",num2);
    const hello_world_program = `
    program helloworld_3x20drq.aleo;



    function main:
        input r0 as u32.public;
        input r1 as u32.private;
        add r0 r1 into r2;
        output r2 as u32.private;`
    const input1 = num1.toString() + "u32";
    const input2 = num2.toString() + "u32";
    let result;
    aleoWorker.executeOffline(hello_world_program, "main", [input1,input2])
        .then((response) => {
            console.log("This transaction was completed");
            result = response;
            // tx_id now holds the transaction ID and you can use it here
            console.log("Response :", response);
        })
        .catch((error) => {
            // Handle any errors here
            console.error("Error during execution:", error);
        });


    // const result = await aleoWorker.executeOffline(hello_world_program, "main", [input1,input2]);
    console.log("fetched result", result)
    console.log("fetched result[0] ", result[0])
    return result[0];
    return 0;

} */

export async function call_hello_world(num1, num2) {
    const aleoWorker = AleoWorker();
    try {
      const hello_world_program = `
        program helloworld_3x20drq.aleo;
        function main:
          input r0 as u32.public;
          input r1 as u32.private;
          add r0 r1 into r2;
          output r2 as u32.private;`
      const input1 = num1.toString() + "u32";
      const input2 = num2.toString() + "u32";

      const result = await  aleoWorker.executeOffline(hello_world_program, "main", [input1, input2]);
      console.log("fetched result hash", result);
      console.log("fetched result[0]", result[0]);

      return result[0];
    } catch (error) {
      console.error("Error in call_hello_world:", error);
      // You can throw the error again or handle it as needed
      throw error;
    }
  }
