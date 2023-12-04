import requests

host = "0.0.0.0"
transaction_id = "at1cc0djspa39gc8rfltqncaza7vjxejtlccx9wr62j2gjxa7260cgs5tyctu"

endpoint = f"http://localhost:3030/testnet3/transaction/{transaction_id}"

result = requests.get(endpoint)
print(endpoint)
print(result.content)