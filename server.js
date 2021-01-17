// load express library
let express = require("express");
// create the app
let app = express();
// define the port where client files will be provided
let port = process.env.PORT || 3000;
// start to listen to that port
let server = app.listen(port);
// provide static access to the files
// in the "public" folder
app.use(express.static("public"));
// load socket library
let socket = require("socket.io");
// create a socket connection
let io = socket(server);
// define which function should be called
// when a new connection is opened from client
io.on("connection", newConnection);
// callback function: the paramenter (in this case socket)
// will contain all the information on the new connection


//NEW CONNECTION
function newConnection(socket) {
  // console.log("new connection: " + socket.client.id)
  socket.on("mousedx", mouseMessagedx);
  socket.on("mousesx", mouseMessagesx);

  function mouseMessagedx() {
    socket.broadcast.emit("mousedxBroadcast")
  }

  function mouseMessagesx() {
      socket.broadcast.emit("mousesxBroadcast")
  }
}

console.log("node server is running");
