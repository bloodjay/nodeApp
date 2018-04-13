const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMes,generateLocationMes} = require('./util/message');
const {isRealString} = require('./util/validation');
const {Users} = require('./util/users')
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();


app.use(express.static(publicPath));
io.on('connection',(socket) => {
    // console.log('user connecting');

    // socket.emit('newMessage',{
    //     from:'Admin',
    //     text:'Weclcome to the chat app'
    // })

    //socket.emit('newMessage',generateMes('Admin','Weclcome to chat app'))


    socket.on('join',(params,callback) => {
        if(!isRealString(params.name) || !isRealString(params.room))
        {
            return callback('name and room name are required')
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);


        io.to(params.room).emit('updateUserList',users.getUserList(params.room));
        socket.emit('newMessage',generateMes('Admin','Welcome to the chat room'))
        socket.broadcast.to(params.room).emit('newMessage',generateMes('Admin',params.name+' has join.'));
        callback();
    })

    socket.on('createMessage', (message, callback) => {
        console.log('createMessate',message);
        io.emit('newMessage',generateMes(message.from,message.text))
        callback();
        // socket.broadcast.emit('newMessage',{
        //     from:message.from,
        //     test:message.text,
        //     createAt: new Date()
        // })
    })

    socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMessage',generateLocationMes('Admin',coords.latitude,coords.longitude))
    });


    socket.on('disconnect',() => {
        console.log('Disconnect server');
        console.log(users);
        var user = users.removeUser(socket.id);
        console.log(socket.id);
        console.log(users);
        if(user){
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMes('Admin',user.name+' has left'));
        }
    })
});

server.listen(port,() => {
    console.log('Server is up on port: '+ port);
})
