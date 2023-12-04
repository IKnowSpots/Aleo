import {
  Account,
  ProgramManager,
  PrivateKey,
  initThreadPool,
  AleoKeyProvider,
  AleoNetworkClient,
  NetworkRecordProvider,
} from "@aleohq/sdk";
import { expose, proxy } from "comlink";

const ENDPOINT = "http://localhost:3030";
let PRIVATE_KEY = "APrivateKey1zkpHVhTAJiZPrDeVo6nDyvq2LDRhP2ZgECvr8zqtcefpgsc";
const ALEO_URL = 'https://api.explorer.aleo.org/v1/testnet3';
// await initThreadPool(8);


const account = new Account({privateKey: PRIVATE_KEY});

// async function execute(program, aleoFunction, inputs) {
//   console.log("Even this is not getting printed out")
//   console.log("program name is ",program);
//   console.log("aleoFunction is ",aleoFunction);
//   console.log("inputs  is ",inputs);

//   const keyProvider = new AleoKeyProvider();
//   keyProvider.useCache(true);


//   const account = new Account({
//     privateKey: PRIVATE_KEY,
//   });


//   const local_connection = new AleoNetworkClient(ENDPOINT);
//   local_connection.setAccount(account);
//   console.log("local_connection =>", local_connection)


//   let recordProvider;
//   try{
//     recordProvider = await new  NetworkRecordProvider(account, local_connection);
//     console.log("recordProvider has been processed",recordProvider)

//   }catch(error){
//     console.error("Some issue has happened with networkrecordprovider",error)
//   }


//   console.log("keyProvider ",keyProvider);
//   const programManager =  new ProgramManager(
//     ENDPOINT,
//     keyProvider,
//     recordProvider,
//   );
//   console.log("programManager has been processed ",programManager)
//   programManager.setAccount(account);
//   console.log("final programManager after processing ",programManager)

//   let executionResponse;
//   try{
//     console.log("Inside executionResponse");
//     executionResponse = await programManager.execute(
//       program,
//       aleoFunction,
//       10,
//       false,
//       inputs
//     );
//     const transaction =  local_connection.getTransaction(executionResponse);
//     console.log("transaction =>",transaction);
//   }catch(error){
//     console.error("error with executionResponse ", error);
//   }

//   console.log("executionResponse has been processed ",executionResponse)

//   return executionResponse;
// }

async function localProgramExecution(program, aleoFunction, inputs) {
  // await initThreadPool(2);
  console.log("point 2.1");
  const programManager = new ProgramManager(ALEO_URL);
  console.log("point 2.2");
  // Create a temporary account for the execution of the program
  programManager.setAccount(account);
  console.log("point 3");
  const executionResponse = await programManager.run(
    program,
    aleoFunction,
    inputs,
    false,
  );
  console.log("point 4");
  return executionResponse.getOutputs();
}

async function deployProgram(program) {
  const keyProvider = new AleoKeyProvider();
  keyProvider.useCache(true);

  // Create a record provider that will be used to find records and transaction data for Aleo programs
  const networkClient = new AleoNetworkClient(ENDPOINT);

  // Use existing account with funds
  const account = new Account({
    privateKey: PRIVATE_KEY,
  });

  const recordProvider = new NetworkRecordProvider(account, networkClient);

  // Initialize a program manager to talk to the Aleo network with the configured key and record providers
  const programManager = new ProgramManager(
    ENDPOINT,
    keyProvider,
    recordProvider,
  );

  programManager.setAccount(account);

  // Define a fee to pay to deploy the program
  const fee = 10.0;

  // Deploy the program to the Aleo network
  const tx_id = await programManager.deploy(program, fee);

  // Optional: Pass in fee record manually to avoid long scan times
  // const feeRecord = "{  owner: aleo1xxx...xxx.private,  microcredits: 2000000u64.private,  _nonce: 123...789group.public}";
  // const tx_id = await programManager.deploy(program, fee, undefined, feeRecord);

  return tx_id;
}


async function decrypt_record(record,private_key=PRIVATE_KEY){
  // console.log("decrypting record",record)
  const account = new Account({
    privateKey: private_key,
  });
  let decryptedRecord = account.decryptRecord(record);
  // console.log("decrypted record",decryptedRecord);
  return decryptedRecord;
}

async function executeOffline(program, aleoFunction, inputs) {
  console.log("Reached start of the  executeOffline ");
  const programManager = new ProgramManager();

  // Create a temporary account for the execution of the program
  const account = new Account({
    privateKey: PRIVATE_KEY,
  });
  programManager.setAccount(account);
  console.log("AccountSet  executeOffline ");
  const executionResponse = await programManager.run(
    program,
    aleoFunction,
    inputs,
    false,
  );
  console.log("SOmething from executOffline",executionResponse);
  return executionResponse.getOutputs();
}

const workerMethods = {  deployProgram ,decrypt_record,localProgramExecution};
expose(workerMethods);
