import { Server, Socket } from "socket.io";
import Room from "./classes/Room";

const io = new Server(3001,{
    cors:{
        origin:"*"
    }
});

const rooms:{[key:string]:Room}={};

io.on("connection",(socket:Socket)=>{
    console.log(socket.id,"connected.")
    socket.on("createRoom",(hostID:string,hostName:string,totalRounds)=>{
        console.log("S")
        const room=new Room(totalRounds,hostID);
        room.addParticipant(hostName,hostID);
        rooms[room.id]=room;
        console.log(room.id)
        socket.emit("roomCode",room.id);
    })
    socket.on("joinRoom",(code:string,userID:string,userName:string)=>{
    })
})