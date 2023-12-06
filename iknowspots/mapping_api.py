import requests

host = "0.0.0.0"
program_id = "iknowspots_2.aleo"
mapping_name = "event_id_hash_to_event_struct"
mapping_key = "39field"

endpoint = f"http://{host}:3030/testnet3/program/{program_id}/mapping/{mapping_name}/{mapping_key}"

result = requests.get(endpoint)
print(endpoint)
print(result.content)
