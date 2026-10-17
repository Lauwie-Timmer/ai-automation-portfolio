import requests


response = requests.post(
    "http://localhost:5678/webhook-test/b0bd5de5-7d31-46d9-ad98-9ff9fee8d0b7"
)

print(response.status_code)
print(response.json())
