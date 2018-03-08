const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMes} = require('./util/message')
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));
io.on('connection',(socket) => {
    console.log('user connecting');

    socket.emit('newMessage',{
        from:'Admin',
        text:'Weclcome to the chat app'
    })

    socket.emit('newMessage',generateMes('Admin','Weclcome to chat app'))

    socket.broadcast.emit('newMessage',generateMes('Admin','new user joined'))

    socket.on('createMessage', (message, callback) => {
        console.log('createMessate',message);
        io.emit('newMessage',generateMes(message.from,message.text))
        callback('this is from the server');
        // socket.broadcast.emit('newMessage',{
        //     from:message.from,
        //     test:message.text,
        //     createAt: new Date()
        // })
    })


    socket.on('disconnect',() => {
        console.log('Disconnect server');
    })
});

server.listen(port,() => {
    console.log('Server is up on port: '+ port);
})
