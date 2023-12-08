import Koa from 'koa'
import KoaRouter from 'koa-router'
import cors from '@koa/cors'
import { Server } from 'socket.io'



const app = new Koa()
const router = new KoaRouter()


app.use(cors())
app.use(router.routes())

const io = new Server({
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"]
  }
});
//  存储所有连接
const clients = {};
setInterval(() => {
  for (const client in clients) {
    clients[client].ws.emit('updateAllClients', {
      data: Object.keys(clients),
    })
  }
}, 2000)


const isNotClientSelf = (clients, client, roomID, clientID) => !!(clients[client].roomID === roomID
  && clients[client].clientID !== clientID)
io.on("connection", function (ws) {
  ws.on("message", function (message) {
    let clientID
    let roomID
    let sdp
    let candidate
    let question
    let code
    switch (message.type) {
      case "connect":
        // 将连接的客户端存储起来
        clientID = message.data.myID;
        roomID = message.data.roomID
        console.log(`${clientID} has connected in ${roomID}`)
        clients[clientID] = {
          clientID,
          roomID,
          ws,
        };
        ws.send(
          JSON.stringify({
            type: "connect",
          })
        );
        break;
      case "offer":
        sdp = message.data.sdp;
        clientID = message.data.myID;
        roomID = message.data.roomID;
        for (const client in clients) {
          if (isNotClientSelf(clients, client, roomID, clientID)) {
            clients[client].ws.emit('call', {
              data: sdp,
            })
          }
        }
        break;
      case "answer":
        // 接收端将 sdp 发给发起端，clientId 为 发起端的 id
        sdp = message.data.sdp;
        clientID = message.data.myID;
        roomID = message.data.roomID;
        for (const client in clients) {
          if (isNotClientSelf(clients, client, roomID, clientID)) {
            clients[client].ws.emit('answer', {
              data: sdp
            })
          }
        }
        break;
      case "candidate":
        candidate = message.data.candidate;
        clientID = message.data.myID;
        roomID = message.data.roomID;
        for (const client in clients) {
          if (isNotClientSelf(clients, client, roomID, clientID)) {
            clients[client].ws.emit('candidate', {
              data: candidate
            })
          }
        }
        break;
      case "updateQues":
        question = message.data.content
        for (const client in clients) {
          clients[client].ws.emit('updateMyQues', {
            data: question
          })
        }
        break

      case "updateCode":
        code = message.data.content
        for (const client in clients) {
          clients[client].ws.emit('updateMyCode', {
            data: code
          })
        }
        break
    }

  });
})


io.listen(3333)

