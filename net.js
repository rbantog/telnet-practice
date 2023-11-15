//https://stackoverflow.com/questions/33522106/node-js-telnet-chat-server
//documentation https://nodejs.org/api/net.html#net
var events = require('events');
var net = require('net');

clients = [];

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
function generateId(length) {
    var output = "";
    for(var i = 0;i<length;i++) {
        output += randomInt(0,9);
    }
    return output;
}

function sendToAll(data,sender) {
    console.log(clients.length);
    var size = clients.length;
    for(i=0;i<size;i++) {
        if(sender.unique_id != clients[i].unique_id) {
            clients[i].write(data);
        }
    }
}

var server = net.createServer(function(client) {
    console.log("New client: " + client.remoteAddress);
    client.write("Welcome!\r\n");
    // client.write("Name?\r\n");
    client.unique_id = generateId(10);
    clients.push(client);

    client.on('data', function(data) {
        data = data.toString();
        console.log(data);
        sendToAll(data,client);
    });
});

server.listen(8888);