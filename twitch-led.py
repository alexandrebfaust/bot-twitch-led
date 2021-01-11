### Twitch H4N3H - Bot Led Controller
import http.client
import json

### ENV ###
token = 'INSERT_HERE' #SmartLife Token
devices = []

### COLLORS ###
blue = "310000ff00f00f2f"
red = "31ff000000f00f2f"
green = "3100ff0000f00f2f"

### FIND DEVICES ###
conn = http.client.HTTPSConnection("wifij01us.magichue.net")
headers = {
  'token': token,
  'Content-Type': 'application/json'
}

color = blue

conn.request("GET", "/app/getMyBindDevicesAndState/ZG001", '', headers)
res = conn.getresponse()
data = res.read().decode("utf-8")
jl = json.loads(data)

for i in range(len(jl["data"])):
    deviceMacAddress = (json.loads(json.dumps(jl["data"][i])))['macAddress']
    devices.append(deviceMacAddress)
    print('ADD:'+deviceMacAddress)

### Change all devices color ###
for i in range(len(devices)):
    payload = "{\"dataCommandItems\":[{\"hexData\":\""+color+"\",\"macAddress\":\""+devices[i]+"\"}]}"
    conn.request("POST", "/app/sendCommandBatch/ZG001", payload, headers)
    res = conn.getresponse()
    data = res.read().decode("utf-8")
    print(data)

