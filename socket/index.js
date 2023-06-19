const io = require('socket.io')(8080,{
    cors : true
});

const emailToSocketMap = new Map();
const socketToEmailMap = new Map();



let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) && 
        users.push({userId, socketId})
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

io.on("connection", (socket) => {
    socket.on('addUser' , (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers" , users);
        
    })

    socket.on("disconnect" , ()=>{
        removeUser(socket.id)
        io.emit("getUsers" , users);
    })

    socket.on("room:join", data=>{
        // console.log(`Socket Connected`, socket.id);
        const userid = data.userid;
        const room = data.room;
        emailToSocketMap.set(userid, socket.id);
        socketToEmailMap.set(socket.id, userid);
        io.to(room).emit("user:joined", {userid,id:socket.id});
        socket.join(room);
        io.to(socket.id).emit("room:join", data);
    }) 
    
    socket.on('user:call', ({to,offer}) => {
        io.to(to).emit('incomming:call',{from:socket.id, offer});
    });

    socket.on('call:accepted', ({to, ans}) => {
        io.to(to).emit('call:accepted',{from:socket.id, ans});
    });
    
    socket.on('peer:nego:needed', ({offer,to})=> {
        io.to(to).emit('peer:nego:needed',{from:socket.id, offer});

    })
    socket.on('peer:nego:done', ({to,ans})=> {
        io.to(to).emit('peer:nego:final',{from:socket.id, ans});

    })
})