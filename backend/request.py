import requests

# API endpoint URL (make sure to replace with your actual URL)
API_URL = "http://localhost:8000/api/groups/4/add-member/"  # Ensure the group ID is correct
4
# User's JWT token (replace with a valid token)
JWT_TOKEN = "bf8deeb1f3846337a3d2ab474b03216d69e207983f003ef1a8b5485bc9097413"

# Group password (replace with the correct password for the group)
group_password = "123456"

# Prepare the headers for the request
headers = {
    "Content-Type": "application/json",
    "Authorization": f"Token {JWT_TOKEN}"
}

# Prepare the data payload for the request
data = {
    "group_password": group_password
}

# Send the POST request to add a member to the group
response = requests.post(API_URL, headers=headers, json=data)  # Use json=data here

# Print the response from the server
print("Status Code:", response.status_code)

# Check if the response contains a body before trying to decode it
try:
    response_body = response.json()
except ValueError:
    response_body = response.text  # If response is not JSON, get the raw text

print("Response Body:", response_body)
