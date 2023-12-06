import requests

host = "0.0.0.0"
transaction_id = "at1veyykgtdr2rv04aupy582y07y9l95y2266w4t72u80wervrffc9qsp4pun"

endpoint = f"http://localhost:3030/testnet3/transaction/{transaction_id}"

result = requests.get(endpoint)
print(endpoint)
print(result.content)
