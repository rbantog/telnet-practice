// https://www.geeksforgeeks.org/how-to-connect-to-telnet-server-from-node-js/

// Some global variable for further use
let TelnetSocket, net, socket, tSocket;

// Require the net module for work with networking
net = require("net");

// Require and create a TelnetSocket Object
({ TelnetSocket } = require("telnet-stream"));

// Initialize the socket with the our ip and port
socket = net.createConnection(22, "test.rebex.net");

// Connect the socket with telnet
tSocket = new TelnetSocket(socket);

// If the connection are close "close handler"
tSocket.on("close", function () {
	return process.exit();
});

// If the connection are on "on handler"
tSocket.on("data", function (buffer) {
	return process.stdout.write(buffer.toString("utf8"));
});

// If the connection are occurred something "doing handler"
tSocket.on("do", function (option) {
	return tSocket.writeWont(option);
});


tSocket.on("will", function (option) {
	return tSocket.writeDont(option);
});

// If the connection are send the data "data handler"
process.stdin.on("data", function (buffer) {
	return tSocket.write(buffer.toString("utf8"));
});
