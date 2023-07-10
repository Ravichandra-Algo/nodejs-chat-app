const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors())
const http = require("http").createServer(app);
const io = require("socket.io")(http,{
  cors:{
    origin:"*"
  }
});
app.use(express.json());

io.on("connection", (socket)=> {
  console.log("a user has connected!",socket);

  socket.on("chat", (payload)=> {
    console.log("payload", payload);
    io.emit("chat", payload)
  })
});

http.listen(5000, () => {
  console.log("connected");
});
