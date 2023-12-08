import requests

host = "0.0.0.0"
transaction_id = "at1rwx02ukcs67gyx2m8pndcfw3vp2tv97kcuug5ash50cj60t66gpsxpy4l8"

endpoint = f"http://localhost:3030/testnet3/transaction/{transaction_id}"

result = requests.get(endpoint)
print(endpoint)
print(result.content)
