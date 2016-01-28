$(document).ready(function(){
	var socket = io.connect("http://127.0.0.1:8000", {force_connection: true});
	socket.on("welcome", function(response){
 		$('#container').append("<p><span class='user'>"+response.userId.slice(1)+"</span> has entered the room</p>");
	})

	socket.on("feed", function(response){
		for(var i = 0; i < response.messageFeed.length; i++) {
 			$("#container").append("<p><span class='user'>" + response.messageFeed[i].user.slice(1)+ "</span>: " + response.messageFeed[i].message + "</p>")
 		}
	})

	$("#chat-form").submit(function(){
		var info = $("#textbox").val();
		socket.emit("message", {message: info})
		$("#textbox").val("");
		return false;
	})

	socket.on("newMessage", function(response){
		$("#container").append("<p><span class='user'>" + response.user.slice(1)+ "</span>: " + response.message + "</p>");
	})
})