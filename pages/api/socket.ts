import type { NextApiRequest, NextApiResponse } from 'next';
import { Server as IOServer, Socket } from 'socket.io';
import type { Server as HTTPServer } from 'http';
import { Socket as NetSocket } from 'net';

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}
const SocketHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (res.socket && res.socket.server && res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing...');
    const io = new IOServer<ClientToServerEvents, ServerToClientEvents, SocketData>(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket: Socket) => {
      socket.on('question', (msg: string) => {
        socket.emit('answer', msg);
      });
    });
  }
  res.end();
};
export default SocketHandler;
