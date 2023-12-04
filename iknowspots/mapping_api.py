import requests

host = "0.0.0.0"
program_id = "iknowspots_1.aleo"
mapping_name = "isSanctionedCountry"
mapping_key = "1field"

endpoint = f"http://{host}:3030/testnet3/program/{program_id}/mapping/{mapping_name}/{mapping_key}"

result = requests.get(endpoint)
print(endpoint)
print(result.content)
