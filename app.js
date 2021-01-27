require('dotenv').config();

//Formular das cores
// To change a color its 31 + (HEX Color Code) + 00F00F + checksum(sum of all bytes % 256) ei: 3100FF0000F00F2F
cores = {
    'off'    : '71240fa4',
    'white'  : '31ffffff00000f3d',
    'blue'   : '310000ff00f00f2f',
    'red'    : '31ff000000f00f2f',
    'green'  : '3100ff0000f00f2f',
    'aqua'   : '3100ffff00f00f3e',
    'pink'   : '31ff006f00f00fae',
    'orange' : '31ff6e0000000fad',
    'yellow' : '31ffff0000000f3e',
    'purple' : '31ff00ff00000f3e' //b'1\xff\x00\xff\x00\xf0\x0f.'
}
devices = {
    "estante":"5002912261B5",
    "teto1":"10521CCEDA47", 
    "teto2":"10521CCD5EB8"
}

const tmi = require('tmi.js');
const client = new tmi.Client({
	options: { debug: true, messagesLogLevel: "info" },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: process.env.BOT_USERNAME,
		password: process.env.OAUTH_TOKEN
	},
	channels: [ 'h4n3h' ]
});
client.connect().catch(console.error);
client.on('message', (channel, tags, message, self) => {
    if(self) return;
    
    msg = message.toLowerCase();

	if(msg) {
        if (msg == '!police') {
            setTimeout(sendData, 500, devices, cores['blue']);
            setTimeout(sendData, 1000, devices, cores['red']);
            setTimeout(sendData, 1500, devices, cores['blue']);
            setTimeout(sendData, 2000, devices, cores['red']);
            setTimeout(sendData, 2500, devices, cores['blue']);
            setTimeout(sendData, 3000, devices, cores['red']);
        }
        else if (msg == '!rgb') {
            setTimeout(sendData, 500, devices, cores['red']);
            setTimeout(sendData, 1000, devices, cores['green']);
            setTimeout(sendData, 1500, devices, cores['blue']);
            setTimeout(sendData, 2000, devices, cores['red']);
            setTimeout(sendData, 2500, devices, cores['green']);
            setTimeout(sendData, 3000, devices, cores['blue']);
        }
        else{
            if (msg[0] == '!') {
                var cor = msg.split('bot')[1];
                if(cores.hasOwnProperty(cor)){
                    sendData(devices, cores[cor]);     
                }
            }            
        }
	}
});

function sendData(devices, cor){
    var axios = require('axios');
    var data = {"dataCommandItems": []};
    for (var device in devices) {
        data["dataCommandItems"].push({"hexData": cor,"macAddress": devices[device]});
    }

    var config = {
        method: 'post',
        url: 'https://wifij01us.magichue.net/app/sendCommandBatch/ZG001',
        headers: { 
            'token': process.env.MAGICHOME_TOKEN, 
            'Content-Type': 'application/json'
        },
        data : JSON.stringify(data)
    };

    axios(config)
        .then(function (response) {
            //console.log(JSON.stringify(response.data));
            console.log('rodou');
        })
        .catch(function (error) {
            console.log('error');
    });
}
