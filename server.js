const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path')
const formateMessage = require('./utils/message');
app.use('/', express.static(path.join(__dirname, 'public')))
const PORT = process.env.PORT || 3000
let username
io.on('connection', (socket) => {
  //on entering message by user

  socket.on('user', (user) => {
    username = user
    socket.broadcast.emit('message',formateMessage('ChatBoat',`${user} has Joined session`)) 
    console.log('username',user);
      socket.on('message',(res)=>{
    io.emit('message',formateMessage(user,res) );
  

  })
  socket.emit('message',formateMessage('ChatBoat',` Welcome to The ChatBoat ${username}`)) 
  })

//   socket.broadcast.emit('message',formateMessage('ChatBoat','A new User has Joined')) 
//   socket.on('message',(res)=>{
//     io.emit('message',formateMessage('ChatBoat',res) );
//   })
  socket.on('disconnect', () => {
    console.log('user disconnected');
    io.emit('message',formateMessage('ChatBoat',`${username} has left chat`)) 
  });
});

server.listen(PORT, () => {
  console.log('listening on--->:3000');
});