import requests

host = "0.0.0.0"
transaction_id = "at1ha7vd2688s39kdkxqruqfgrds8fpfv5f3pqudhwzgmxez92ps5qqtgjdhy"

endpoint = f"http://localhost:3030/testnet3/transaction/{transaction_id}"

result = requests.get(endpoint)
print(endpoint)
print(result.content)
