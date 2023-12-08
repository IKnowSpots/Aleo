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

async function execute(program, aleoFunction, inputs) {
  console.log("So, this printst")
  console.log("program name is ",program);
  console.log("aleoFunction is ",aleoFunction);
  console.log("inputs  is ",inputs);

  // const keyProvider = new AleoKeyProvider({
  //   keyUris:
  // });
  const keyProvider = new AleoKeyProvider();
  keyProvider.useCache(true);


  const local_connection = new AleoNetworkClient(ENDPOINT);
  local_connection.setAccount(account);
  console.log("local_connection =>", local_connection)


  let recordProvider;
  try{
    recordProvider = new  NetworkRecordProvider(account, local_connection);
    console.log("recordProvider has been processed",recordProvider)

  }catch(error){
    console.error("Some issue has happened with networkrecord provider",error)
  }


  console.log("keyProvider ",keyProvider);
  const programManager =  new ProgramManager(
    ENDPOINT,
    keyProvider,
    recordProvider,
  );
  console.log("programManager has been processed ",programManager)
  programManager.setAccount(account);
  console.log("final programManager after processing ",programManager)

  let executionResponse;
  try{
    console.log("Inside executionResponse");
    executionResponse = await programManager.execute(
      program,
      aleoFunction,
      5,
      false,
      inputs
    );
    const transaction = await  local_connection.getTransaction(executionResponse);
    console.log("transaction =>",transaction);
  }catch(error){
    console.error("error with executionResponse ", error);
  }

  console.log("executionResponse has been processed ",executionResponse)

  return executionResponse;
}

async function localProgramExecution(program, aleoFunction, inputs) {
  // await initThreadPool(2);
  const programManager = new ProgramManager(ENDPOINT);
  // Create a temporary account for the execution of the program
  programManager.setAccount(account);
  const executionResponse = await programManager.run(
    program,
    aleoFunction,
    inputs,
    false,
  );
  return executionResponse.getOutputs();
}

async function deployProgram(program) {
  const keyProvider = new AleoKeyProvider();
  keyProvider.useCache(true);

  // Create a record provider that will be used to find records and transaction data for Aleo programs
  const networkClient = new AleoNetworkClient(ENDPOINT);

  // // Use existing account with funds
  // const account = new Account({
  //   privateKey: PRIVATE_KEY,
  // });

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

async function getMappingValue(program_name,mapping_name, mapping_key){
  const keyProvider = new AleoKeyProvider();
  keyProvider.useCache(true);

  // const account = new Account({
  //   privateKey: PRIVATE_KEY,
  // });

  const local_connection = new AleoNetworkClient(ENDPOINT);
  local_connection.setAccount(account);
  // console.log("local_connection inside aleoworker=>", local_connection)
  let current_state = false;
  current_state = await local_connection.getProgramMappingValue(program_name,mapping_name,mapping_key);
  return current_state;
}


async function decrypt_record(record){
  // console.log("decrypting record",record)
  // const account = new Account({
  //   privateKey: private_key,
  // });
  let decryptedRecord = account.decryptRecord(record);
  // console.log("decrypted record",decryptedRecord);
  return decryptedRecord;
}

async function executeOffline(program, aleoFunction, inputs) {
  console.log("Reached start of the  executeOffline ");
  const programManager = new ProgramManager();

  // // Create a temporary account for the execution of the program
  // const account = new Account({
  //   privateKey: PRIVATE_KEY,
  // });
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

/* async function execute(program, aleoFunction, inputs) {
  const programManager = new ProgramManager(ENDPOINT);

  const account = new Account({
    privateKey: PRIVATE_KEY,
  });

  console.log("account => ",account);

  programManager.setAccount(account);

  const executionResponse = await programManager.execute(
    program,
    aleoFunction,
    30000,
    false,
    inputs
  );

  console.log("executionResponse => ",executionResponse);
  return executionResponse;
} */

const workerMethods = {  deployProgram ,decrypt_record,localProgramExecution,execute,getMappingValue};
expose(workerMethods);
