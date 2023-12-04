import "./App.css";
import iknowspots_1_program from "../iknowspots/build/main.aleo?raw";
import { AleoWorker } from "./workers/AleoWorker.js";
const aleoWorker = AleoWorker();

const ENDPOINT = "http://localhost:3030";
let PRIVATE_KEY = "APrivateKey1zkpHVhTAJiZPrDeVo6nDyvq2LDRhP2ZgECvr8zqtcefpgsc";




function App() {

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

	async function create_private_event(event_id,max_supply){

		console.log(`Create Event for ${event_id} with maxSupply ${max_supply}`);

		try {
			const event_id_u32 = event_id + "u32"
			const max_supply_u32 = max_supply + "u32"
			let program_name = "iknowspots_1.aleo";
			let function_name = "create_private_event";
			let tx_id;
			try{
				tx_id = await aleoWorker.execute(program_name, function_name, [event_id_u32,max_supply_u32]);
				// const transactionUrl = "http://localhost:3030/testnet3/transaction/" + tx_id;
			}catch(e){
				console.error("something bad happened ",e);
			}

			const transactionUrl = "http://localhost:3030/testnet3/transaction/" + tx_id;
			console.log("transactionUrl => ",transactionUrl)
			const data = await fetchDataUntilAvailable(transactionUrl);
			const record =  data.execution.transitions[0].outputs[0].value;
			console.log("record ",record);
			const decryptedRecord = await aleoWorker.decrypt_record(record);

			let address =  getValueOfField(decryptedRecord,"owner");
			// console.log("temp_address => ",address);
			// adds the record to the setAddressToEventCreationRecords, so if you print
			//   addressToEventCreationRecords, it will show the updated entries of records
			// console.log("Before updating hook addressToEventCreationRecords inside createEvent=> ",addressToEventCreationRecords);
			addRecord(address,decryptedRecord,setAddressToEventCreationRecords);
			const _status = parseInt(getValueOfField(decryptedRecord,"status").split('u32')[0]);
			console.log("_status => ",_status)
			setEventStatuses({ ...eventStatuses, [eventID]: {status: _status} });
			console.log("eventStatuses => ",eventStatuses);

		} catch (error) {
		console.error("Error in createEvent function ",error);
		}

	}



}

export default App;
