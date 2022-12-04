const {socket} = require('socket.io');
const express = require('express');
const { lchownSync } = require('fs');
const app = express();
const http  = require('http').createServer(app);
let users = []

const PORT = process.env.PORT || 3000;

http.listen(PORT, () =>{
    console.log(`listening on port ${PORT}`);
})

app.use(express.static(__dirname +'/public'));

app.get('/',(req,res) =>{
    res.sendFile(__dirname + '/index.html');
})


const io = require('socket.io')(http);    

io.on('connection', (socket) =>{
    console.log('connected');
    
    socket.on('message',(msg) =>{
        
        socket.broadcast.emit('message',msg)
        console.log(msg)
        // users.push(msg.user)
        // console.log(users)
        
    })

    socket.on('disconnect', () =>{
        console.log("user left")
        
    })

    socket.on('UserName', (user) =>{
        console.log(`User ${user} has Connected`)
        users.push(user)
        console.log(users)

        socket.emit("userList", users)
    })

})


