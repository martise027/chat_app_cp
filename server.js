//! Backend . Entry point.
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/message');
const {userJoin,getCurrentUser, userLeave, getRoomUsers} = require('./utils/users');


const app = express('');
const server = http.createServer(app);
const io = socketio(server);

//* Set static folder
app.use(express.static(path.join(__dirname,'public')));
const admin = '\u{1F6A8}'+'admin'+ '\u{1F6A8}';

//* Run when client connect
io.on('connection', socket => {
    if (!isChatAllowed()) {
        socket.emit('admin-Messages', formatMessage(admin, 'Chatting is currently disabled due to ABC contest.'));
        socket.disconnect(); 
        return;
    }

    socket.on('joinRoom',({username,room}) => {
        // console.log('username : '+username);
        const  user = userJoin(socket.id ,username,room);
        socket.join(user.room);
        
        //* as soon as user connect, log on server side then emit message -> front(main.js) 1
        socket.emit('admin-Messages',formatMessage(admin,'Welcome to our community')); //* for single client


        //* Broadcast when user connect
        socket.broadcast.to(user.room).emit('admin-Messages', formatMessage(admin,`${user.username} has joined the chat`)); //* for all client except connecting

        //* Send users and info
        io.to(user.room).emit('roomUsers',{
            room : user.room,
            users: getRoomUsers(user.room)
        })
    });

    //* Listen fot chatMessage
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message',formatMessage(user.username,msg));
    });

    //* Run when client disconeect
    socket.on('disconnect',() =>{
        const user = userLeave(socket.id);
        if(user){
            io.to(user.room).emit('admin-Messages', formatMessage(admin,`${user.username} has left the chat`)); //* all client

            //* Send users and info
            io.to(user.room).emit('roomUsers',{
            room : user.room,
            users: getRoomUsers(user.room)
            });

        }
        
    });
});

function isChatAllowed() {
    const date = new Date();
    const hours = date.getHours();
    const day = date.getDay(); 

    if (day === 6 && ((hours === 21 && minutes >= 0) || (hours === 22 && minutes <= 40))) {
        return false;
    }
    return true;
}

const PORT = 3000 || process.env.PORT;

server.listen(PORT,() => console.log(`server running on ${PORT}`))