var express = require("express");
var path = require("path");
var app = express();

var server = app.listen(8000, function() {
 console.log("listening on port 8000");
})

var io = require("socket.io").listen(server)

var feed = [];

io.sockets.on("connection", function(socket){
	// console.log("WE ARE USING SOCKETS");
	// console.log(socket.id)
	io.emit("welcome", {userId: socket.id});

	socket.emit("feed", {messageFeed: feed})

	socket.on("message", function(data){
		feed.push({user: socket.id, message: data.message});
		io.emit("newMessage", {user: socket.id, message: data.message});
	})
})