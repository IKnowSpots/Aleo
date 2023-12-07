import requests

host = "0.0.0.0"
transaction_id = "at1gh09sslzhk8x03wrduc7re4jsaqzfladj5zsv7vyngcgjytt5uqsy9qwpz"

endpoint = f"http://localhost:3030/testnet3/transaction/{transaction_id}"

result = requests.get(endpoint)
print(endpoint)
print(result.content)
